export const bootIntroConfig = {
  systemName: "GUTTER FAIRY OS",
  version: "Chaos Studio",
  established: "Established: 2025",
  stamp: "Textile Recovery",
  startDelayMs: 280,
  typingCharIntervalMs: 22,
  linePauseMs: 170,
  holdAfterCompleteMs: 850,
  fadeOutMs: 520,
  lines: [
    { label: "SYSTEM NAME", value: "GUTTER FAIRY OS" },
    { label: "VERSION", value: "Chaos Studio" },
    { label: "USER", value: "Fairy" },
    { label: "STYLE ENGINE", value: "Thrift + Rework + Sustainability" },
    {
      label: "MODULES LOADED",
      value: "Embroidery, Applique, Reworked Denim, and Secondhand Magic",
    },
    { label: "AESTHETIC DRIVER", value: "Vintage, 90's, Y2K, and Fairycore" },
    {
      label: "LOCATION",
      value: "39.53° N latitude and 119.81° W longitude",
    },
  ],
} as const;

export const bootIntroSessionKey = "gutterFairyEntered";
export const bootIntroReplayQueryKey = "intro";
