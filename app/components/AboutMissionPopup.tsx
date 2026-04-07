"use client";

import { useEffect, useState } from "react";
import WindowDots from "./WindowDots";

const missionCopy =
  "Gutter Fairy exists to make self-expression accessible through reclaimed clothing, hands-on creativity, and community learning.";

type AboutMissionPopupProps = {
  targetId: string;
};

export default function AboutMissionPopup({ targetId }: AboutMissionPopupProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [typedLength, setTypedLength] = useState(0);

  const closeWindow = () => {
    setIsExpanded(false);
    setIsMinimized(false);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeWindow();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isExpanded]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const interval = window.setInterval(() => {
      setTypedLength((current) => {
        if (current >= missionCopy.length) {
          window.clearInterval(interval);
          return current;
        }

        const next = current + 1;
        if (next >= missionCopy.length) {
          window.clearInterval(interval);
        }
        return next;
      });
    }, 24);

    return () => window.clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const isComplete = typedLength >= missionCopy.length;
  const typedMission = missionCopy.slice(0, typedLength);

  const handleLearnMore = () => {
    closeWindow();
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={`mission-popup-shell ${isMinimized ? "mission-popup-shell--minimized" : ""}`.trim()}>
      {!isMinimized ? (
        <div className="window-panel__backdrop mission-popup__backdrop" aria-hidden="true" />
      ) : null}

      <section
        className={`window-panel mission-popup ${isMinimized ? "window-panel--minimized" : ""} ${isExpanded ? "window-panel--zoomed mission-popup--zoomed" : ""}`.trim()}
        role="dialog"
        aria-modal={!isMinimized}
        aria-labelledby="about-mission-heading"
      >
        <div className="window-bar window-bar--pink">
          <WindowDots
            closeLabel="mission file"
            isMinimized={isMinimized}
            isZoomed={isExpanded}
            onClose={closeWindow}
            onToggleMinimize={() => {
              setIsMinimized((current) => {
                const nextState = !current;
                if (nextState) {
                  setIsExpanded(false);
                }
                return nextState;
              });
            }}
            onToggleZoom={() => {
              setIsMinimized(false);
              setIsExpanded((current) => !current);
            }}
            zoomLabel="mission file"
          />
          <p className="window-label">Mission File</p>
          <span className="window-bar__status" aria-hidden="true" />
        </div>

        {!isMinimized ? (
          <div className="window-body mission-popup__body">
            <h2 id="about-mission-heading" className="section-title mt-2">
              Why Gutter Fairy
            </h2>

            <div className="mission-popup__terminal">
              <p className="mission-popup__copy">
                {typedMission}
                {!isComplete ? <span className="mission-popup__cursor" aria-hidden="true" /> : null}
              </p>
            </div>

            {isComplete ? (
              <div className="button-row mt-4">
                <button type="button" className="win-button" onClick={handleLearnMore}>
                  Learn More
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>
    </div>
  );
}
