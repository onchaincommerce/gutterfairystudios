export const bootIntroConfig = {
  systemName: "GUTTER FAIRY OS",
  version: "GF_01",
  lineRevealDelayMs: 360,
  lineRevealIntervalMs: 420,
  holdAfterCompleteMs: 850,
  fadeOutMs: 520,
  lines: [
    { label: "SYSTEM NAME", value: "GUTTER FAIRY OS" },
    { label: "VERSION", value: "GF_01" },
    { label: "USER", value: "Fairy Operator" },
    { label: "MODE", value: "Patchwork Recovery" },
    { label: "STYLE ENGINE", value: "Thrift + Rework + Chaos" },
    { label: "MODULES LOADED", value: "Embroidery, Applique, Reworked Denim, DIY Magic" },
    { label: "AESTHETIC DRIVER", value: "Soft Grunge / Trash Pixie / Handmade Future" },
    { label: "LOCATION", value: "Reno, NV" },
    { label: "STATUS", value: "Booting weird girl wardrobe..." },
    { label: "FINAL LINE", value: "Welcome to Gutter Fairy" },
  ],
} as const;

export const bootIntroSessionKey = "gutterFairyEntered";
export const bootIntroReplayQueryKey = "intro";
