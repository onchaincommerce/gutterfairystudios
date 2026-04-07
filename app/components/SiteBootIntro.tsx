"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  bootIntroConfig,
  bootIntroReplayQueryKey,
  bootIntroSessionKey,
} from "../lib/bootIntroConfig";

declare global {
  interface Window {
    gutterFairyReplayIntro?: () => void;
  }
}

function normalizeHost(hostname: string) {
  return hostname.replace(/^www\./, "").toLowerCase();
}

function removeReplayQueryParam() {
  const url = new URL(window.location.href);
  url.searchParams.delete(bootIntroReplayQueryKey);
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

function resolveShouldPlayIntro() {
  const params = new URLSearchParams(window.location.search);
  const forcedReplay = params.get(bootIntroReplayQueryKey) === "1";
  const hasEntered = window.sessionStorage.getItem(bootIntroSessionKey) === "true";

  if (forcedReplay) {
    window.sessionStorage.removeItem(bootIntroSessionKey);
    removeReplayQueryParam();
  }

  if (hasEntered && !forcedReplay) {
    return false;
  }

  const referrer = document.referrer;
  let isInternalReferrer = false;

  if (referrer) {
    try {
      const referrerHost = normalizeHost(new URL(referrer).hostname);
      const currentHost = normalizeHost(window.location.hostname);
      isInternalReferrer = referrerHost === currentHost;
    } catch {
      isInternalReferrer = false;
    }
  }

  // Mark the current tab as "inside" the site immediately so refreshes and
  // internal navigation in the same session do not replay the intro.
  window.sessionStorage.setItem(bootIntroSessionKey, "true");

  if (forcedReplay) {
    return true;
  }

  // Play for direct entry (no referrer) and external entry, skip for same-site entry.
  return !referrer || !isInternalReferrer;
}

export default function SiteBootIntro() {
  const [shouldRender, setShouldRender] = useState(false);
  const [visibleLineCount, setVisibleLineCount] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  const totalLines = bootIntroConfig.lines.length;
  const progress = useMemo(() => {
    if (!shouldRender) {
      return 0;
    }

    return Math.max(8, (visibleLineCount / totalLines) * 100);
  }, [shouldRender, totalLines, visibleLineCount]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Manual replay hook for testing:
    // 1. Run `window.gutterFairyReplayIntro()` in DevTools, or
    // 2. Visit any page with `?intro=1`.
    window.gutterFairyReplayIntro = () => {
      window.sessionStorage.removeItem(bootIntroSessionKey);
      const url = new URL(window.location.href);
      url.searchParams.set(bootIntroReplayQueryKey, "1");
      window.location.assign(`${url.pathname}${url.search}${url.hash}`);
    };

    const shouldPlay = resolveShouldPlayIntro();
    if (!shouldPlay) {
      return;
    }

    const kickoffId = window.setTimeout(() => {
      setShouldRender(true);
    }, 0);

    return () => {
      window.clearTimeout(kickoffId);
    };
  }, []);

  useEffect(() => {
    if (!shouldRender) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timeouts: number[] = [];
    const { lineRevealDelayMs, lineRevealIntervalMs, holdAfterCompleteMs, fadeOutMs } = bootIntroConfig;

    bootIntroConfig.lines.forEach((_, index) => {
      const timeoutId = window.setTimeout(() => {
        setVisibleLineCount(index + 1);
      }, lineRevealDelayMs + index * lineRevealIntervalMs);

      timeouts.push(timeoutId);
    });

    const revealCompleteAt = lineRevealDelayMs + totalLines * lineRevealIntervalMs;
    timeouts.push(
      window.setTimeout(() => {
        setIsLeaving(true);
      }, revealCompleteAt + holdAfterCompleteMs),
    );

    timeouts.push(
      window.setTimeout(() => {
        setShouldRender(false);
      }, revealCompleteAt + holdAfterCompleteMs + fadeOutMs),
    );

    return () => {
      document.body.style.overflow = previousOverflow;
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [shouldRender, totalLines]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`boot-intro ${isLeaving ? "boot-intro--leaving" : ""}`.trim()}
      aria-live="polite"
      aria-label="Gutter Fairy startup sequence"
    >
      <div className="boot-intro__frame">
        <div className="boot-intro__header">
          <div className="boot-intro__brand">
            <div className="boot-intro__brand-icon" aria-hidden="true">
              <Image
                src="/fairy.png"
                alt=""
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>
            <div>
              <p className="boot-intro__system">{bootIntroConfig.systemName}</p>
              <p className="boot-intro__version">VERSION {bootIntroConfig.version}</p>
            </div>
          </div>
          <p className="boot-intro__stamp">Patchwork Recovery</p>
        </div>

        <div className="boot-intro__terminal">
          {bootIntroConfig.lines.slice(0, visibleLineCount).map((line, index) => (
            <div
              key={`${line.label}-${index}`}
              className={`boot-intro__line ${index === totalLines - 1 ? "boot-intro__line--final" : ""}`.trim()}
            >
              <span className="boot-intro__label">{line.label}</span>
              <span className="boot-intro__value">{line.value}</span>
            </div>
          ))}

          {visibleLineCount < totalLines ? (
            <div className="boot-intro__line boot-intro__line--cursor" aria-hidden="true">
              <span className="boot-intro__cursor" />
            </div>
          ) : null}
        </div>

        <div className="boot-intro__footer">
          <div className="boot-intro__progress-shell" aria-hidden="true">
            <div className="boot-intro__progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <p className="boot-intro__footer-copy">Booting weird girl wardrobe...</p>
        </div>
      </div>
    </div>
  );
}
