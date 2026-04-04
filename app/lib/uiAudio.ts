"use client";

export type UISoundKind = "click" | "open" | "minimize" | "expand" | "close";

type AudioContextWithWebkit = typeof window & {
  webkitAudioContext?: typeof AudioContext;
};

let audioContext: AudioContext | null = null;
let outputCompressor: DynamicsCompressorNode | null = null;
let outputGain: GainNode | null = null;

function getAudioContext() {
  if (typeof window === "undefined") {
    return null;
  }

  const audioWindow = window as AudioContextWithWebkit;
  const AudioContextCtor = window.AudioContext ?? audioWindow.webkitAudioContext;

  if (!AudioContextCtor) {
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioContextCtor();
  }

  return audioContext;
}

function getOutputNode(context: AudioContext) {
  if (!outputCompressor || !outputGain) {
    outputCompressor = context.createDynamicsCompressor();
    outputGain = context.createGain();

    outputCompressor.threshold.value = -26;
    outputCompressor.knee.value = 18;
    outputCompressor.ratio.value = 8;
    outputCompressor.attack.value = 0.002;
    outputCompressor.release.value = 0.12;
    outputGain.gain.value = 0.9;

    outputCompressor.connect(outputGain);
    outputGain.connect(context.destination);
  }

  return outputCompressor;
}

function playTone(
  context: AudioContext,
  {
    delay = 0,
    duration,
    frequencyStart,
    frequencyEnd = frequencyStart,
    gainStart,
    gainEnd = 0.0001,
    type = "square",
  }: {
    delay?: number;
    duration: number;
    frequencyStart: number;
    frequencyEnd?: number;
    gainStart: number;
    gainEnd?: number;
    type?: OscillatorType;
  },
) {
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  const startTime = context.currentTime + delay;
  const endTime = startTime + duration;
  const outputNode = getOutputNode(context);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequencyStart, startTime);
  oscillator.frequency.exponentialRampToValueAtTime(
    Math.max(frequencyEnd, 1),
    endTime,
  );

  gainNode.gain.setValueAtTime(0.0001, startTime);
  gainNode.gain.exponentialRampToValueAtTime(
    Math.max(gainStart, 0.0001),
    startTime + 0.01,
  );
  gainNode.gain.exponentialRampToValueAtTime(
    Math.max(gainEnd, 0.0001),
    endTime,
  );

  oscillator.connect(gainNode);
  gainNode.connect(outputNode);

  oscillator.start(startTime);
  oscillator.stop(endTime + 0.01);
}

function playSequence(
  context: AudioContext,
  notes: Array<{
    delay?: number;
    duration: number;
    frequencyStart: number;
    frequencyEnd?: number;
    gainStart: number;
    gainEnd?: number;
    type?: OscillatorType;
  }>,
) {
  notes.forEach((note) => playTone(context, note));
}

function scheduleSound(context: AudioContext, kind: UISoundKind) {
  switch (kind) {
    case "open":
      playSequence(context, [
        {
          duration: 0.075,
          frequencyStart: 523,
          frequencyEnd: 587,
          gainStart: 0.055,
          type: "triangle",
        },
        {
          delay: 0.05,
          duration: 0.08,
          frequencyStart: 659,
          frequencyEnd: 698,
          gainStart: 0.05,
          type: "triangle",
        },
        {
          delay: 0.105,
          duration: 0.11,
          frequencyStart: 784,
          frequencyEnd: 880,
          gainStart: 0.048,
          type: "sine",
        },
        {
          delay: 0.165,
          duration: 0.09,
          frequencyStart: 1046,
          frequencyEnd: 988,
          gainStart: 0.028,
          type: "sine",
        },
      ]);
      return;
    case "minimize":
      playSequence(context, [
        {
          duration: 0.06,
          frequencyStart: 784,
          frequencyEnd: 740,
          gainStart: 0.052,
          type: "triangle",
        },
        {
          delay: 0.045,
          duration: 0.075,
          frequencyStart: 659,
          frequencyEnd: 587,
          gainStart: 0.048,
          type: "triangle",
        },
        {
          delay: 0.095,
          duration: 0.11,
          frequencyStart: 523,
          frequencyEnd: 392,
          gainStart: 0.042,
          type: "sine",
        },
      ]);
      return;
    case "expand":
      playSequence(context, [
        {
          duration: 0.065,
          frequencyStart: 392,
          frequencyEnd: 440,
          gainStart: 0.048,
          type: "triangle",
        },
        {
          delay: 0.045,
          duration: 0.078,
          frequencyStart: 523,
          frequencyEnd: 587,
          gainStart: 0.05,
          type: "triangle",
        },
        {
          delay: 0.095,
          duration: 0.11,
          frequencyStart: 659,
          frequencyEnd: 784,
          gainStart: 0.044,
          type: "sine",
        },
      ]);
      return;
    case "close":
      playSequence(context, [
        {
          duration: 0.07,
          frequencyStart: 698,
          frequencyEnd: 622,
          gainStart: 0.052,
          type: "triangle",
        },
        {
          delay: 0.048,
          duration: 0.08,
          frequencyStart: 587,
          frequencyEnd: 494,
          gainStart: 0.046,
          type: "triangle",
        },
        {
          delay: 0.1,
          duration: 0.11,
          frequencyStart: 440,
          frequencyEnd: 330,
          gainStart: 0.042,
          type: "sine",
        },
      ]);
      return;
    case "click":
    default:
      playSequence(context, [
        {
          duration: 0.038,
          frequencyStart: 988,
          frequencyEnd: 880,
          gainStart: 0.045,
          type: "triangle",
        },
        {
          delay: 0.018,
          duration: 0.045,
          frequencyStart: 1318,
          frequencyEnd: 1174,
          gainStart: 0.028,
          type: "sine",
        },
      ]);
  }
}

export function playUISound(kind: UISoundKind) {
  const context = getAudioContext();

  if (!context) {
    return;
  }

  const startPlayback = () => scheduleSound(context, kind);

  if (context.state === "suspended") {
    void context.resume().then(startPlayback).catch(() => undefined);
    return;
  }

  startPlayback();
}

export function primeUISounds() {
  const context = getAudioContext();

  if (!context || context.state !== "suspended") {
    return;
  }

  void context.resume().catch(() => undefined);
}
