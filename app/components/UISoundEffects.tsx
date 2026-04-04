"use client";

import { useEffect } from "react";
import { playUISound, primeUISounds, type UISoundKind } from "../lib/uiAudio";

const INTERACTIVE_SELECTOR = [
  "button",
  "a[href]",
  "summary",
  "input",
  "textarea",
  "select",
  "[role='button']",
].join(", ");

const SOUND_KINDS = new Set<UISoundKind>([
  "click",
  "open",
  "minimize",
  "expand",
  "close",
]);

function isDisabled(element: HTMLElement) {
  return element.matches(":disabled") || element.getAttribute("aria-disabled") === "true";
}

function getInteractiveElement(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return null;
  }

  return target.closest<HTMLElement>(INTERACTIVE_SELECTOR);
}

function getSoundKind(element: HTMLElement) {
  const soundKind = (element.dataset.uiSound as UISoundKind | undefined) ?? "click";

  return SOUND_KINDS.has(soundKind) ? soundKind : null;
}

export default function UISoundEffects() {
  useEffect(() => {
    const playForTarget = (target: EventTarget | null) => {
      const interactiveElement = getInteractiveElement(target);

      if (!interactiveElement || isDisabled(interactiveElement)) {
        return;
      }

      const soundKind = getSoundKind(interactiveElement);

      if (!soundKind) {
        return;
      }

      primeUISounds();
      playUISound(soundKind);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) {
        return;
      }

      playForTarget(event.target);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || (event.key !== "Enter" && event.key !== " ")) {
        return;
      }

      playForTarget(event.target);
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  return null;
}
