"use client";

import { useEffect, useRef, useState } from "react";
import Navigation from "../../components/Navigation";
import FairyCursor from "../../components/FairyCursor";
import BlastEffect from "../../components/BlastEffect";
import Footer from "../../components/Footer";

type Mode = "auto" | "white";

export default function BackgroundRemoverPage() {
  const [status] = useState("Ready");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputUrl, setInputUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("auto");
  const [tolerance, setTolerance] = useState(32);
  const [feather, setFeather] = useState(18);
  const inputUrlRef = useRef<string | null>(null);
  const sourceImageRef = useRef<HTMLImageElement | null>(null);
  const processingRef = useRef(false);

  const isLikelyWhiteBackground = (data: Uint8ClampedArray, width: number, height: number) => {
    const step = Math.max(1, Math.floor(Math.min(width, height) / 100));
    let samples = 0;
    let whiteish = 0;

    const testPixel = (idx: number) => {
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const brightness = (r + g + b) / 3;
      if (brightness > 235 && max - min < 20) {
        whiteish += 1;
      }
      samples += 1;
    };

    for (let x = 0; x < width; x += step) {
      testPixel((0 * width + x) * 4);
      testPixel(((height - 1) * width + x) * 4);
    }
    for (let y = 0; y < height; y += step) {
      testPixel((y * width + 0) * 4);
      testPixel((y * width + (width - 1)) * 4);
    }

    return samples > 0 ? whiteish / samples > 0.6 : false;
  };

  const buildBackgroundPalette = (
    data: Uint8ClampedArray,
    width: number,
    height: number
  ) => {
    const step = Math.max(1, Math.floor(Math.min(width, height) / 120));
    const buckets = new Map<number, { count: number; r: number; g: number; b: number }>();

    const addPixel = (idx: number) => {
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
      const existing = buckets.get(key);
      if (existing) {
        existing.count += 1;
        existing.r += r;
        existing.g += g;
        existing.b += b;
      } else {
        buckets.set(key, { count: 1, r, g, b });
      }
    };

    for (let x = 0; x < width; x += step) {
      addPixel((0 * width + x) * 4);
      addPixel(((height - 1) * width + x) * 4);
    }
    for (let y = 0; y < height; y += step) {
      addPixel((y * width + 0) * 4);
      addPixel((y * width + (width - 1)) * 4);
    }

    const sorted = Array.from(buckets.values()).sort((a, b) => b.count - a.count).slice(0, 3);
    return sorted.map((entry) => ({
      r: Math.round(entry.r / entry.count),
      g: Math.round(entry.g / entry.count),
      b: Math.round(entry.b / entry.count),
    }));
  };

  const applyPaletteCutout = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    palette: Array<{ r: number; g: number; b: number }>,
    toleranceValue: number,
    featherValue: number
  ) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const featherRange = Math.max(1, featherValue);

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      let minDistance = Infinity;
      for (const color of palette) {
        const dr = r - color.r;
        const dg = g - color.g;
        const db = b - color.b;
        const dist = Math.sqrt(dr * dr + dg * dg + db * db);
        if (dist < minDistance) {
          minDistance = dist;
        }
      }

      let alpha = 255;
      if (minDistance <= toleranceValue) {
        alpha = 0;
      } else if (minDistance <= toleranceValue + featherRange) {
        const t = (minDistance - toleranceValue) / featherRange;
        alpha = Math.round(255 * t);
      }
      data[i + 3] = Math.min(data[i + 3], alpha);
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const applyWhiteCutout = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    toleranceValue: number,
    featherValue: number
  ) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const featherRange = Math.max(1, featherValue);
    const brightMin = Math.min(255, Math.max(210, 255 - toleranceValue));
    const brightMax = Math.min(255, Math.max(brightMin + 10, 255 - toleranceValue * 0.4));
    const rangeLimit = Math.max(12, Math.min(40, 20 + toleranceValue * 0.4));

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const brightness = (r + g + b) / 3;
      const range = max - min;
      let alpha = 255;
      if (brightness >= brightMax && range < rangeLimit) {
        alpha = 0;
      } else if (brightness >= brightMin && range < rangeLimit + 10) {
        const t = (brightness - brightMin) / Math.max(1, brightMax - brightMin);
        alpha = Math.round(255 * (1 - t));
        alpha = Math.max(0, Math.min(255, alpha));
        if (featherRange > 1) {
          alpha = Math.round(alpha * Math.min(1, (brightness - brightMin) / featherRange));
        }
      }
      data[i + 3] = Math.min(data[i + 3], alpha);
    }
    ctx.putImageData(imageData, 0, 0);
  };

  useEffect(() => {
    return () => {
      if (inputUrlRef.current) {
        URL.revokeObjectURL(inputUrlRef.current);
      }
    };
  }, []);

  const processImage = async (img: HTMLImageElement) => {
    if (processingRef.current) {
      return;
    }

    setError(null);
    setProcessing(true);
    setOutputUrl(null);
    processingRef.current = true;

    try {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Canvas unavailable.");
      }

      ctx.drawImage(img, 0, 0);
      const baseImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const shouldUseWhite =
        mode === "white" ||
        (mode === "auto" &&
          isLikelyWhiteBackground(baseImageData.data, canvas.width, canvas.height));

      if (shouldUseWhite) {
        applyWhiteCutout(ctx, canvas.width, canvas.height, tolerance, feather);
      } else {
        const palette = buildBackgroundPalette(baseImageData.data, canvas.width, canvas.height);
        applyPaletteCutout(ctx, canvas.width, canvas.height, palette, tolerance, feather);
      }

      setOutputUrl(canvas.toDataURL("image/png"));
    } catch (err) {
      setError("Failed to process image. Try a different photo.");
    } finally {
      processingRef.current = false;
      setProcessing(false);
    }
  };

  const handleFile = async (file: File) => {
    if (inputUrlRef.current) {
      URL.revokeObjectURL(inputUrlRef.current);
    }
    const blobUrl = URL.createObjectURL(file);
    inputUrlRef.current = blobUrl;
    setInputUrl(blobUrl);

    const img = new Image();
    img.src = blobUrl;
    await img.decode();
    sourceImageRef.current = img;
    processImage(img);
  };

  useEffect(() => {
    if (sourceImageRef.current) {
      processImage(sourceImageRef.current);
    }
  }, [mode, tolerance, feather]);

  return (
    <>
      <FairyCursor />
      <BlastEffect />
      <Navigation />

      <main>
        <section className="min-h-screen relative py-24 px-6">
          <div className="relative z-10 max-w-5xl mx-auto bg-black/45 backdrop-blur-sm border border-white/10 p-6 sm:p-10">
            <div className="mb-8">
              <span className="font-body text-sm font-semibold tracking-wider text-[#ff3366] uppercase">
                Background Remover (Client-Side Test)
              </span>
              <div className="w-20 h-1 bg-[#ff3366] mt-3" />
            </div>

            <p className="font-body text-sm text-[#f0e6d3]/90 max-w-3xl mb-6">
              Runs entirely in your browser. Uses color-based background removal (no AI).
              No uploads, no login.
            </p>

            <div className="mb-6 flex flex-wrap items-center gap-4">
              <label className="inline-block font-body text-xs font-semibold tracking-wide px-4 py-2 bg-[#ff3366] text-[#f0e6d3] hover:bg-[#ff3366]/80 transition-all duration-300 uppercase cursor-pointer">
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      handleFile(file);
                    }
                  }}
                />
              </label>
              <span className="font-body text-xs text-[#f0e6d3]/70">
                {processing ? "Processing..." : status}
              </span>
              {error && (
                <span className="font-body text-xs text-[#ff3366]">
                  {error}
                </span>
              )}
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="font-body text-xs uppercase tracking-wide text-[#f0e6d3]/60">
                Mode
              </span>
              {(["auto", "white"] as Mode[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMode(option)}
                  className={`font-body text-xs font-semibold tracking-wide px-3 py-2 uppercase border transition-all duration-300 ${
                    mode === option
                      ? "border-[#ff3366] text-[#f0e6d3] bg-[#ff3366]/20"
                      : "border-white/10 text-[#f0e6d3]/70 hover:border-[#ff3366]/60"
                  }`}
                >
                  {option === "white" ? "White BG" : "Auto"}
                </button>
              ))}
              <span className="font-body text-xs text-[#f0e6d3]/60">
                Auto detects the background color from edges.
              </span>
            </div>

            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="font-body text-xs uppercase tracking-wide text-[#f0e6d3]/60">
                  Tolerance ({tolerance})
                </span>
                <input
                  type="range"
                  min={10}
                  max={80}
                  value={tolerance}
                  onChange={(event) => setTolerance(Number(event.target.value))}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-body text-xs uppercase tracking-wide text-[#f0e6d3]/60">
                  Feather ({feather})
                </span>
                <input
                  type="range"
                  min={0}
                  max={40}
                  value={feather}
                  onChange={(event) => setFeather(Number(event.target.value))}
                />
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="border border-white/10 bg-black/30 p-4">
                <p className="font-body text-xs uppercase tracking-wide text-[#f0e6d3]/70 mb-3">
                  Original
                </p>
                <div className="aspect-[4/3] w-full bg-black/40 flex items-center justify-center">
                  {inputUrl ? (
                    <img src={inputUrl} alt="" className="max-h-full max-w-full" />
                  ) : (
                    <span className="font-body text-xs text-[#f0e6d3]/50">
                      Upload an image to preview.
                    </span>
                  )}
                </div>
              </div>

              <div className="border border-white/10 bg-black/30 p-4">
                <p className="font-body text-xs uppercase tracking-wide text-[#f0e6d3]/70 mb-3">
                  Cutout (PNG)
                </p>
                <div className="aspect-[4/3] w-full bg-[repeating-linear-gradient(45deg,#2b2b2b, #2b2b2b_10px, #1f1f1f_10px, #1f1f1f_20px)] flex items-center justify-center">
                  {outputUrl ? (
                    <img src={outputUrl} alt="" className="max-h-full max-w-full" />
                  ) : (
                    <span className="font-body text-xs text-[#f0e6d3]/50">
                      Cutout will appear here.
                    </span>
                  )}
                </div>
                {outputUrl && (
                  <a
                    href={outputUrl}
                    download="gutterfairy-cutout.png"
                    className="mt-4 inline-block font-body text-xs font-semibold tracking-wide px-4 py-2 bg-[#ff3366] text-[#f0e6d3] hover:bg-[#ff3366]/80 transition-all duration-300 uppercase"
                  >
                    Download PNG
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
