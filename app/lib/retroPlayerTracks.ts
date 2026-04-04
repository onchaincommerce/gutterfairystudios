"use client";

export type RetroTrackAsset = {
  id: string;
  title: string;
  subtitle: string;
  duration: number;
  url: string;
};

type WaveKind = "pulse" | "square" | "triangle" | "sine";

type NoteEvent = {
  beat: number;
  length: number;
  midi: number;
  gain: number;
  wave: WaveKind;
};

type TrackBlueprint = {
  id: string;
  title: string;
  subtitle: string;
  bpm: number;
  totalBeats: number;
  events: NoteEvent[];
};

const SAMPLE_RATE = 22050;

function midiToFrequency(midi: number) {
  return 440 * (2 ** ((midi - 69) / 12));
}

function pushNote(
  events: NoteEvent[],
  beat: number,
  length: number,
  midi: number,
  gain: number,
  wave: WaveKind,
) {
  events.push({ beat, length, midi, gain, wave });
}

function pushChord(
  events: NoteEvent[],
  beat: number,
  length: number,
  midiNotes: number[],
  gain: number,
  wave: WaveKind,
) {
  midiNotes.forEach((midi) => pushNote(events, beat, length, midi, gain, wave));
}

function pushPad(
  events: NoteEvent[],
  beat: number,
  length: number,
  midiNotes: number[],
  gain: number,
) {
  pushChord(events, beat, length, midiNotes, gain, "sine");
  pushChord(
    events,
    beat + 0.08,
    Math.max(length - 0.08, 0.1),
    midiNotes.map((midi) => midi + 12),
    gain * 0.34,
    "triangle",
  );
}

type PatternBar = Array<number | null>;

type SectionBlueprint = {
  pads?: number[][];
  lead?: PatternBar[];
  counter?: PatternBar[];
  bass?: PatternBar[];
  sparkle?: PatternBar[];
  padGain?: number;
  leadGain?: number;
  leadWave?: WaveKind;
  counterGain?: number;
  counterWave?: WaveKind;
  bassGain?: number;
  bassWave?: WaveKind;
  sparkleGain?: number;
  sparkleWave?: WaveKind;
  leadStep?: number;
  counterStep?: number;
  bassStep?: number;
  sparkleStep?: number;
  leadLength?: number;
  leadAccentLength?: number;
  counterLength?: number;
  bassLength?: number;
  sparkleLength?: number;
};

function addPattern(
  events: NoteEvent[],
  offset: number,
  bars: PatternBar[] | undefined,
  {
    step,
    length,
    accentLength = length,
    gain,
    wave,
    accentEvery = 4,
    accentGain = 1.08,
  }: {
    step: number;
    length: number;
    accentLength?: number;
    gain: number;
    wave: WaveKind;
    accentEvery?: number;
    accentGain?: number;
  },
) {
  if (!bars) {
    return;
  }

  bars.forEach((bar, barIndex) => {
    const barOffset = offset + (barIndex * 4);

    bar.forEach((midi, noteIndex) => {
      if (midi === null) {
        return;
      }

      const accented = accentEvery > 0 && noteIndex % accentEvery === 0;

      pushNote(
        events,
        barOffset + (noteIndex * step),
        accented ? accentLength : length,
        midi,
        gain * (accented ? accentGain : 1),
        wave,
      );
    });
  });
}

function addDreamSection(
  events: NoteEvent[],
  offset: number,
  section: SectionBlueprint,
) {
  section.pads?.forEach((bar, barIndex) => {
    pushPad(events, offset + (barIndex * 4), 4, bar, section.padGain ?? 0.02);
  });

  addPattern(events, offset, section.lead, {
    step: section.leadStep ?? 0.5,
    length: section.leadLength ?? 0.5,
    accentLength: section.leadAccentLength ?? 0.88,
    gain: section.leadGain ?? 0.044,
    wave: section.leadWave ?? "triangle",
  });

  addPattern(events, offset, section.counter, {
    step: section.counterStep ?? 0.5,
    length: section.counterLength ?? 0.6,
    accentLength: section.counterLength ?? 0.6,
    gain: section.counterGain ?? 0.026,
    wave: section.counterWave ?? "sine",
    accentEvery: 0,
    accentGain: 1,
  });

  addPattern(events, offset, section.bass, {
    step: section.bassStep ?? 1,
    length: section.bassLength ?? 1.3,
    accentLength: section.bassLength ?? 1.3,
    gain: section.bassGain ?? 0.04,
    wave: section.bassWave ?? "sine",
    accentEvery: 0,
    accentGain: 1,
  });

  addPattern(events, offset, section.sparkle, {
    step: section.sparkleStep ?? 0.5,
    length: section.sparkleLength ?? 0.34,
    accentLength: section.sparkleLength ?? 0.34,
    gain: section.sparkleGain ?? 0.018,
    wave: section.sparkleWave ?? "pulse",
    accentEvery: 0,
    accentGain: 1,
  });
}

function createVelvetDusk(): TrackBlueprint {
  const events: NoteEvent[] = [];
  let offset = 0;

  addDreamSection(events, offset, {
    pads: [
      [57, 60, 64, 67],
      [53, 57, 60, 64],
    ],
    lead: [
      [72, null, null, null, 74, null, 72, null],
      [69, null, 72, null, 74, null, 72, null],
    ],
    bass: [
      [45, null, null, 52],
      [41, null, null, 48],
    ],
    padGain: 0.021,
    leadGain: 0.036,
    bassGain: 0.034,
    leadAccentLength: 1.1,
  });
  offset += 8;

  addDreamSection(events, offset, {
    pads: [
      [57, 60, 64, 67],
      [53, 57, 60, 64],
      [48, 52, 55, 59],
      [55, 59, 62, 64],
    ],
    lead: [
      [72, null, 74, null, 76, null, 74, 72],
      [72, null, 74, 76, null, 74, null, 72],
      [67, null, 71, null, 72, null, 71, 67],
      [69, null, 71, null, 74, null, 71, 69],
    ],
    bass: [
      [45, null, 52, null],
      [41, null, 48, null],
      [36, null, 43, null],
      [43, null, 50, null],
    ],
    padGain: 0.022,
    leadGain: 0.045,
    bassGain: 0.04,
  });
  offset += 16;

  addDreamSection(events, offset, {
    pads: [
      [57, 60, 64, 67],
      [55, 59, 62, 67],
      [53, 57, 60, 64],
      [50, 53, 57, 60],
    ],
    lead: [
      [74, null, 76, null, 77, null, 76, 74],
      [72, null, 74, null, 76, null, 74, 72],
      [69, null, 72, null, 74, null, 72, 69],
      [67, null, 69, null, 72, null, 69, 67],
    ],
    counter: [
      [60, null, null, 64, null, null, 62, null],
      [59, null, null, 62, null, null, 60, null],
      [57, null, null, 60, null, null, 59, null],
      [55, null, null, 59, null, null, 57, null],
    ],
    bass: [
      [45, null, 52, 57],
      [43, null, 50, 55],
      [41, null, 48, 53],
      [38, null, 45, 50],
    ],
    padGain: 0.024,
    leadGain: 0.041,
    counterGain: 0.024,
    bassGain: 0.038,
    leadWave: "sine",
  });
  offset += 16;

  addDreamSection(events, offset, {
    pads: [
      [60, 64, 67, 71],
      [57, 60, 64, 67],
      [53, 57, 60, 64],
      [55, 59, 62, 67],
    ],
    lead: [
      [76, null, 79, null, 81, null, 79, 76],
      [74, null, 77, null, 79, null, 77, 74],
      [72, null, 76, null, 77, null, 76, 72],
      [74, null, 77, null, 79, null, 77, 74],
    ],
    counter: [
      [64, null, 67, null, 69, null, 67, null],
      [60, null, 64, null, 67, null, 64, null],
      [57, null, 60, null, 64, null, 60, null],
      [59, null, 62, null, 65, null, 62, null],
    ],
    bass: [
      [48, null, 55, null],
      [45, null, 52, null],
      [41, null, 48, null],
      [43, null, 50, null],
    ],
    padGain: 0.025,
    leadGain: 0.043,
    counterGain: 0.026,
    bassGain: 0.039,
    leadWave: "triangle",
  });
  offset += 16;

  addDreamSection(events, offset, {
    pads: [
      [48, 52, 55, 59],
      [50, 53, 57, 60],
      [53, 57, 60, 64],
      [45, 48, 52, 57],
    ],
    lead: [
      [67, null, null, null, 71, null, 72, null],
      [69, null, null, null, 72, null, 74, null],
      [72, null, null, null, 76, null, 77, null],
      [64, null, null, null, 67, null, 69, null],
    ],
    counter: [
      [55, null, 57, null, 59, null, 57, null],
      [57, null, 59, null, 60, null, 59, null],
      [60, null, 62, null, 64, null, 62, null],
      [52, null, 55, null, 57, null, 55, null],
    ],
    bass: [
      [36, null, null, 43],
      [38, null, null, 45],
      [41, null, null, 48],
      [33, null, null, 40],
    ],
    padGain: 0.021,
    leadGain: 0.032,
    counterGain: 0.019,
    bassGain: 0.034,
    leadWave: "sine",
    counterWave: "triangle",
  });
  offset += 16;

  addDreamSection(events, offset, {
    pads: [
      [60, 64, 67, 71],
      [57, 60, 64, 67],
      [53, 57, 60, 64],
      [55, 59, 62, 67],
      [50, 53, 57, 60],
      [48, 52, 55, 59],
    ],
    lead: [
      [76, null, 79, null, 81, null, 79, 76],
      [74, null, 77, null, 79, null, 77, 74],
      [72, null, 76, null, 77, null, 76, 72],
      [74, null, 77, null, 79, null, 77, 74],
      [72, null, 74, null, 76, null, 74, 72],
      [69, null, 72, null, 74, null, 72, 69],
    ],
    counter: [
      [64, null, 67, null, 69, null, 67, null],
      [60, null, 64, null, 67, null, 64, null],
      [57, null, 60, null, 64, null, 60, null],
      [59, null, 62, null, 65, null, 62, null],
      [55, null, 59, null, 60, null, 59, null],
      [52, null, 55, null, 57, null, 55, null],
    ],
    bass: [
      [48, null, 55, null],
      [45, null, 52, null],
      [41, null, 48, null],
      [43, null, 50, null],
      [38, null, 45, null],
      [36, null, 43, null],
    ],
    padGain: 0.024,
    leadGain: 0.04,
    counterGain: 0.024,
    bassGain: 0.037,
  });

  return {
    id: "velvet-dusk",
    title: "Velvet Dusk",
    subtitle: "soft-focus thread mix",
    bpm: 72,
    totalBeats: 96,
    events,
  };
}

function createDustyBloom(): TrackBlueprint {
  const events: NoteEvent[] = [];
  let offset = 0;

  addDreamSection(events, offset, {
    pads: [
      [52, 55, 59, 62],
      [48, 52, 55, 59],
      [55, 59, 62, 64],
      [50, 54, 57, 60],
    ],
    sparkle: [
      [79, null, 79, null, 81, null, 79, null],
      [76, null, 76, null, 79, null, 76, null],
      [81, null, 81, null, 83, null, 81, null],
      [77, null, 77, null, 79, null, 77, null],
    ],
    bass: [
      [40, null, null, 47],
      [36, null, null, 43],
      [43, null, null, 50],
      [38, null, null, 45],
    ],
    padGain: 0.019,
    sparkleGain: 0.015,
    bassGain: 0.031,
    bassWave: "triangle",
  });
  offset += 16;

  addDreamSection(events, offset, {
    pads: [
      [52, 55, 59, 62],
      [48, 52, 55, 59],
      [55, 59, 62, 64],
      [50, 54, 57, 60],
    ],
    lead: [
      [67, null, 71, null, 74, null, 71, 67],
      [67, null, 69, null, 71, null, 72, 71],
      [74, null, 76, null, 79, null, 76, 74],
      [69, null, 72, null, 74, null, 72, 69],
    ],
    sparkle: [
      [79, null, 79, null, 81, null, 79, null],
      [76, null, 76, null, 79, null, 76, null],
      [81, null, 81, null, 83, null, 81, null],
      [77, null, 77, null, 79, null, 77, null],
    ],
    bass: [
      [40, null, 47, null],
      [36, null, 43, null],
      [43, null, 50, null],
      [38, null, 45, null],
    ],
    padGain: 0.021,
    leadGain: 0.04,
    sparkleGain: 0.016,
    bassGain: 0.035,
    leadWave: "sine",
    sparkleWave: "pulse",
    bassWave: "triangle",
  });
  offset += 16;

  addDreamSection(events, offset, {
    pads: [
      [57, 60, 64, 67],
      [55, 59, 62, 64],
      [52, 55, 59, 62],
      [48, 52, 55, 59],
    ],
    lead: [
      [74, null, 76, null, 79, null, 81, 79],
      [72, null, 74, null, 76, null, 77, 76],
      [71, null, 74, null, 76, null, 74, 71],
      [67, null, 71, null, 74, null, 72, 69],
    ],
    counter: [
      [62, null, 64, null, 67, null, 64, null],
      [60, null, 62, null, 64, null, 62, null],
      [59, null, 62, null, 64, null, 62, null],
      [55, null, 59, null, 62, null, 59, null],
    ],
    sparkle: [
      [81, null, 79, null, 81, null, 83, null],
      [79, null, 77, null, 79, null, 81, null],
      [76, null, 74, null, 76, null, 79, null],
      [72, null, 71, null, 72, null, 76, null],
    ],
    bass: [
      [45, null, 52, null],
      [43, null, 50, null],
      [40, null, 47, null],
      [36, null, 43, null],
    ],
    padGain: 0.023,
    leadGain: 0.041,
    counterGain: 0.022,
    sparkleGain: 0.017,
    bassGain: 0.035,
    leadWave: "triangle",
    counterWave: "sine",
    sparkleWave: "pulse",
    bassWave: "triangle",
  });
  offset += 16;

  addDreamSection(events, offset, {
    pads: [
      [50, 54, 57, 60],
      [47, 50, 54, 57],
      [52, 55, 59, 62],
      [43, 47, 50, 54],
    ],
    lead: [
      [69, null, null, 72, null, null, 74, null],
      [67, null, null, 71, null, null, 72, null],
      [71, null, null, 74, null, null, 76, null],
      [64, null, null, 67, null, null, 69, null],
    ],
    counter: [
      [57, null, 59, null, 60, null, 59, null],
      [54, null, 57, null, 59, null, 57, null],
      [59, null, 60, null, 62, null, 60, null],
      [50, null, 54, null, 57, null, 54, null],
    ],
    bass: [
      [38, null, null, 45],
      [35, null, null, 42],
      [40, null, null, 47],
      [31, null, null, 38],
    ],
    padGain: 0.02,
    leadGain: 0.032,
    counterGain: 0.019,
    bassGain: 0.03,
    leadWave: "sine",
    counterWave: "triangle",
    bassWave: "sine",
  });
  offset += 16;

  addDreamSection(events, offset, {
    pads: [
      [57, 60, 64, 67],
      [55, 59, 62, 64],
      [52, 55, 59, 62],
      [48, 52, 55, 59],
    ],
    lead: [
      [76, null, 79, null, 81, null, 79, 76],
      [74, null, 77, null, 79, null, 77, 74],
      [72, null, 76, null, 79, null, 76, 72],
      [69, null, 72, null, 74, null, 72, 69],
    ],
    counter: [
      [64, null, 67, null, 69, null, 67, null],
      [62, null, 64, null, 67, null, 64, null],
      [59, null, 62, null, 64, null, 62, null],
      [55, null, 59, null, 62, null, 59, null],
    ],
    sparkle: [
      [83, null, 81, null, 83, null, 84, null],
      [81, null, 79, null, 81, null, 83, null],
      [79, null, 77, null, 79, null, 81, null],
      [76, null, 74, null, 76, null, 79, null],
    ],
    bass: [
      [45, null, 52, null],
      [43, null, 50, null],
      [40, null, 47, null],
      [36, null, 43, null],
    ],
    padGain: 0.023,
    leadGain: 0.042,
    counterGain: 0.022,
    sparkleGain: 0.018,
    bassGain: 0.035,
    leadWave: "triangle",
    sparkleWave: "pulse",
    bassWave: "triangle",
  });
  offset += 16;

  addDreamSection(events, offset, {
    pads: [
      [57, 60, 64, 67],
      [52, 55, 59, 62],
      [48, 52, 55, 59],
      [50, 54, 57, 60],
    ],
    lead: [
      [74, null, 76, null, 79, null, 76, 74],
      [71, null, 74, null, 76, null, 74, 71],
      [67, null, 71, null, 74, null, 71, 67],
      [69, null, 72, null, 74, null, 72, 69],
    ],
    counter: [
      [62, null, 64, null, 67, null, 64, null],
      [59, null, 62, null, 64, null, 62, null],
      [55, null, 59, null, 62, null, 59, null],
      [57, null, 60, null, 62, null, 60, null],
    ],
    sparkle: [
      [81, null, 79, null, 81, null, 79, null],
      [77, null, 76, null, 77, null, 76, null],
      [74, null, 72, null, 74, null, 72, null],
      [76, null, 74, null, 76, null, 74, null],
    ],
    bass: [
      [45, null, null, 52],
      [40, null, null, 47],
      [36, null, null, 43],
      [38, null, null, 45],
    ],
    padGain: 0.021,
    leadGain: 0.038,
    counterGain: 0.02,
    sparkleGain: 0.015,
    bassGain: 0.032,
    leadWave: "sine",
    sparkleWave: "pulse",
  });

  return {
    id: "dusty-bloom",
    title: "Dusty Bloom",
    subtitle: "late thrift daydream",
    bpm: 86,
    totalBeats: 96,
    events,
  };
}

function createAfterglowLoop(): TrackBlueprint {
  const events: NoteEvent[] = [];
  let offset = 0;

  addDreamSection(events, offset, {
    pads: [
      [50, 53, 57, 60],
      [57, 60, 64, 67],
      [53, 57, 60, 64],
      [48, 52, 55, 59],
    ],
    counter: [
      [74, null, null, null, 76, null, null, null],
      [77, null, null, null, 79, null, null, null],
      [72, null, null, null, 74, null, null, null],
      [69, null, null, null, 72, null, null, null],
    ],
    bass: [
      [38, null, null, 45],
      [45, null, null, 52],
      [41, null, null, 48],
      [36, null, null, 43],
    ],
    padGain: 0.02,
    counterGain: 0.017,
    bassGain: 0.031,
    counterWave: "triangle",
    bassWave: "sine",
  });
  offset += 16;

  addDreamSection(events, offset, {
    pads: [
      [50, 53, 57, 60],
      [57, 60, 64, 67],
      [53, 57, 60, 64],
      [48, 52, 55, 59],
    ],
    lead: [
      [69, null, 72, null, 74, null, 72, 69],
      [72, null, 74, null, 76, null, 74, 72],
      [69, null, 72, null, 74, null, 72, 69],
      [67, null, 71, null, 72, null, 69, 67],
    ],
    counter: [
      [62, null, null, null, 64, null, null, null],
      [64, null, null, null, 67, null, null, null],
      [60, null, null, null, 62, null, null, null],
      [57, null, null, null, 60, null, null, null],
    ],
    bass: [
      [38, null, 45, null],
      [45, null, 52, null],
      [41, null, 48, null],
      [36, null, 43, null],
    ],
    padGain: 0.021,
    leadGain: 0.038,
    counterGain: 0.018,
    bassGain: 0.032,
    leadWave: "triangle",
    counterWave: "sine",
  });
  offset += 16;

  addDreamSection(events, offset, {
    pads: [
      [53, 57, 60, 64],
      [60, 64, 67, 71],
      [57, 60, 64, 67],
      [52, 55, 59, 62],
    ],
    lead: [
      [72, null, 76, null, 79, null, 76, 72],
      [76, null, 79, null, 81, null, 79, 76],
      [74, null, 77, null, 79, null, 77, 74],
      [71, null, 74, null, 76, null, 74, 71],
    ],
    counter: [
      [64, null, 67, null, 69, null, 67, null],
      [67, null, 71, null, 72, null, 71, null],
      [62, null, 64, null, 67, null, 64, null],
      [59, null, 62, null, 64, null, 62, null],
    ],
    bass: [
      [41, null, 48, null],
      [48, null, 55, null],
      [45, null, 52, null],
      [40, null, 47, null],
    ],
    sparkle: [
      [81, null, null, null, 84, null, null, null],
      [84, null, null, null, 86, null, null, null],
      [79, null, null, null, 81, null, null, null],
      [76, null, null, null, 79, null, null, null],
    ],
    padGain: 0.022,
    leadGain: 0.036,
    counterGain: 0.02,
    bassGain: 0.033,
    sparkleGain: 0.012,
    leadWave: "sine",
    sparkleWave: "triangle",
  });
  offset += 16;

  addDreamSection(events, offset, {
    pads: [
      [48, 52, 55, 59],
      [45, 48, 52, 57],
      [50, 53, 57, 60],
      [43, 47, 50, 53],
    ],
    lead: [
      [67, null, null, null, 71, null, 72, null],
      [64, null, null, null, 67, null, 69, null],
      [69, null, null, null, 72, null, 74, null],
      [62, null, null, null, 65, null, 67, null],
    ],
    counter: [
      [55, null, 57, null, 59, null, 57, null],
      [52, null, 55, null, 57, null, 55, null],
      [57, null, 60, null, 62, null, 60, null],
      [50, null, 53, null, 55, null, 53, null],
    ],
    bass: [
      [36, null, null, 43],
      [33, null, null, 40],
      [38, null, null, 45],
      [31, null, null, 38],
    ],
    padGain: 0.019,
    leadGain: 0.03,
    counterGain: 0.017,
    bassGain: 0.029,
    leadWave: "triangle",
    counterWave: "sine",
    bassWave: "sine",
  });
  offset += 16;

  addDreamSection(events, offset, {
    pads: [
      [53, 57, 60, 64],
      [60, 64, 67, 71],
      [57, 60, 64, 67],
      [52, 55, 59, 62],
      [50, 53, 57, 60],
      [48, 52, 55, 59],
    ],
    lead: [
      [72, null, 76, null, 79, null, 76, 72],
      [76, null, 79, null, 81, null, 79, 76],
      [74, null, 77, null, 79, null, 77, 74],
      [71, null, 74, null, 76, null, 74, 71],
      [69, null, 72, null, 74, null, 72, 69],
      [67, null, 71, null, 72, null, 69, 67],
    ],
    counter: [
      [64, null, 67, null, 69, null, 67, null],
      [67, null, 71, null, 72, null, 71, null],
      [62, null, 64, null, 67, null, 64, null],
      [59, null, 62, null, 64, null, 62, null],
      [57, null, 60, null, 62, null, 60, null],
      [55, null, 57, null, 59, null, 57, null],
    ],
    bass: [
      [41, null, 48, null],
      [48, null, 55, null],
      [45, null, 52, null],
      [40, null, 47, null],
      [38, null, 45, null],
      [36, null, 43, null],
    ],
    sparkle: [
      [81, null, null, null, 84, null, null, null],
      [84, null, null, null, 86, null, null, null],
      [79, null, null, null, 81, null, null, null],
      [76, null, null, null, 79, null, null, null],
      [74, null, null, null, 76, null, null, null],
      [72, null, null, null, 74, null, null, null],
    ],
    padGain: 0.021,
    leadGain: 0.034,
    counterGain: 0.019,
    bassGain: 0.031,
    sparkleGain: 0.011,
    leadWave: "pulse",
    counterWave: "triangle",
    bassWave: "sine",
    sparkleWave: "sine",
  });
  offset += 24;

  return {
    id: "afterglow-loop",
    title: "Afterglow Loop",
    subtitle: "blue hour studio wash",
    bpm: 68,
    totalBeats: 96,
    events,
  };
}

function getWaveSample(wave: WaveKind, frequency: number, elapsed: number) {
  const phase = 2 * Math.PI * frequency * elapsed;

  switch (wave) {
    case "pulse":
      return (phase % (Math.PI * 2)) < (Math.PI * 0.5) ? 1 : -1;
    case "triangle":
      return (2 / Math.PI) * Math.asin(Math.sin(phase));
    case "sine":
      return Math.sin(phase);
    case "square":
    default:
      return Math.sign(Math.sin(phase)) || 1;
  }
}

function encodeWav(samples: Float32Array, sampleRate: number) {
  const buffer = new ArrayBuffer(44 + (samples.length * 2));
  const view = new DataView(buffer);

  const writeString = (offset: number, value: string) => {
    for (let index = 0; index < value.length; index += 1) {
      view.setUint8(offset + index, value.charCodeAt(index));
    }
  };

  writeString(0, "RIFF");
  view.setUint32(4, 36 + (samples.length * 2), true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, samples.length * 2, true);

  let offset = 44;

  samples.forEach((sample) => {
    const clamped = Math.max(-1, Math.min(1, sample));
    view.setInt16(offset, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true);
    offset += 2;
  });

  return new Blob([buffer], { type: "audio/wav" });
}

function renderTrack(blueprint: TrackBlueprint): RetroTrackAsset {
  const secondsPerBeat = 60 / blueprint.bpm;
  const duration = blueprint.totalBeats * secondsPerBeat;
  const totalSamples = Math.ceil((duration + 0.65) * SAMPLE_RATE);
  const mix = new Float32Array(totalSamples);

  blueprint.events.forEach((event) => {
    const frequency = midiToFrequency(event.midi);
    const startTime = event.beat * secondsPerBeat;
    const noteDuration = event.length * secondsPerBeat;
    const startSample = Math.floor(startTime * SAMPLE_RATE);
    const endSample = Math.min(totalSamples, Math.floor((startTime + noteDuration) * SAMPLE_RATE));
    const attackWindow = event.wave === "sine" || event.wave === "triangle" ? 0.04 : 0.018;
    const releaseWindow = Math.max(0.08, Math.min(0.24, noteDuration * 0.45));
    const overtoneMix =
      event.wave === "sine" ? 0.03 :
      event.wave === "triangle" ? 0.06 :
      event.wave === "pulse" ? 0.1 :
      0.08;
    const detuneMix =
      event.wave === "sine" ? 0.18 :
      event.wave === "triangle" ? 0.12 :
      0.06;

    for (let sampleIndex = startSample; sampleIndex < endSample; sampleIndex += 1) {
      const elapsed = (sampleIndex - startSample) / SAMPLE_RATE;
      const remaining = noteDuration - elapsed;
      const attack = Math.min(1, elapsed / attackWindow);
      const release = Math.min(1, Math.max(0, remaining) / releaseWindow);
      const envelope = attack * release;
      const overtone = getWaveSample(event.wave, frequency * 2, elapsed) * overtoneMix;
      const detunedLayer = getWaveSample(event.wave, frequency * 0.997, elapsed) * detuneMix;

      mix[sampleIndex] +=
        (getWaveSample(event.wave, frequency, elapsed) + overtone + detunedLayer) *
        event.gain *
        envelope;
    }
  });

  const delaySamples = Math.floor(SAMPLE_RATE * 0.24);
  const delayedSource = mix.slice();

  for (let repeat = 1; repeat <= 3; repeat += 1) {
    const repeatOffset = delaySamples * repeat;
    const repeatGain = 0.2 / repeat;

    for (let index = 0; index + repeatOffset < mix.length; index += 1) {
      mix[index + repeatOffset] += delayedSource[index] * repeatGain;
    }
  }

  let previousSample = mix[0] ?? 0;

  for (let index = 1; index < mix.length; index += 1) {
    previousSample += (mix[index] - previousSample) * 0.18;
    mix[index] = previousSample;
  }

  previousSample = mix[0] ?? 0;

  for (let index = 1; index < mix.length; index += 1) {
    previousSample += (mix[index] - previousSample) * 0.24;
    mix[index] = previousSample;
  }

  const fadeOutSamples = Math.min(Math.floor(SAMPLE_RATE * 0.7), mix.length);

  for (let index = 0; index < fadeOutSamples; index += 1) {
    const fadeProgress = 1 - (index / fadeOutSamples);
    const sampleIndex = mix.length - fadeOutSamples + index;
    mix[sampleIndex] *= fadeProgress;
  }

  let peak = 0;

  for (let index = 0; index < mix.length; index += 1) {
    peak = Math.max(peak, Math.abs(mix[index]));
  }

  const normalizedPeak = peak > 0 ? 0.86 / peak : 1;

  for (let index = 0; index < mix.length; index += 1) {
    mix[index] *= normalizedPeak;
  }

  const blob = encodeWav(mix, SAMPLE_RATE);
  const url = URL.createObjectURL(blob);

  return {
    id: blueprint.id,
    title: blueprint.title,
    subtitle: blueprint.subtitle,
    duration,
    url,
  };
}

export function buildRetroTrackLibrary() {
  return [
    createVelvetDusk(),
    createDustyBloom(),
    createAfterglowLoop(),
  ].map(renderTrack);
}
