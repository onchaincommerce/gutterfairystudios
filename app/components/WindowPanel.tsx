"use client";

import { useEffect, useState, type ReactNode } from "react";
import WindowDots from "./WindowDots";

const chromeTones = {
  pink: "window-bar window-bar--pink",
  lilac: "window-bar window-bar--lilac",
  blue: "window-bar window-bar--blue",
  cream: "window-bar window-bar--cream",
};

type WindowPanelProps = {
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  chromeLabel: string;
  tone?: keyof typeof chromeTones;
};

export default function WindowPanel({
  children,
  className = "",
  bodyClassName = "",
  chromeLabel,
  tone = "cream",
}: WindowPanelProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!isZoomed) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsZoomed(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isZoomed]);

  return (
    <>
      {isZoomed ? (
        <button
          type="button"
          className="window-panel__backdrop"
          onClick={() => setIsZoomed(false)}
          aria-label={`Restore ${chromeLabel}`}
        />
      ) : null}

      <section
        className={`window-panel min-w-0 ${isMinimized ? "window-panel--minimized" : ""} ${isZoomed ? "window-panel--zoomed" : ""} ${className}`.trim()}
      >
        <div className={chromeTones[tone]}>
          <WindowDots
            isMinimized={isMinimized}
            isZoomed={isZoomed}
            onToggleMinimize={() => {
              setIsMinimized((current) => {
                const nextState = !current;
                if (nextState) {
                  setIsZoomed(false);
                }
                return nextState;
              });
            }}
            onToggleZoom={() => {
              setIsMinimized(false);
              setIsZoomed((current) => !current);
            }}
            zoomLabel={chromeLabel}
          />
          <p className="window-label">
            {chromeLabel}
          </p>
          <span className="window-bar__status" aria-hidden="true" />
        </div>
        {!isMinimized ? (
          <div className={`window-body ${bodyClassName}`.trim()}>{children}</div>
        ) : null}
      </section>
    </>
  );
}
