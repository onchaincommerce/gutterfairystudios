"use client";

import { useEffect, useState } from "react";
import WindowDots from "./WindowDots";
import { instagramLink } from "../data/siteContent";

type ContactButtonProps = {
  label?: string;
  className?: string;
};

export default function ContactButton({
  label = "Contact",
  className = "",
}: ContactButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

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

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={className} data-ui-sound="open">
        {label}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[70]">
          <button
            type="button"
            className="window-panel__backdrop"
            aria-label="Close contact window"
            onClick={closeWindow}
          />
          <div className="fixed inset-0 z-[71] flex items-center justify-center p-4">
            <section
              className={`window-panel ${isMinimized ? "window-panel--minimized" : ""} ${isExpanded ? "window-panel--zoomed" : "max-w-xl"} w-full`.trim()}
              role="dialog"
              aria-modal="true"
            >
              <div className="window-bar window-bar--blue">
                <WindowDots
                  isMinimized={isMinimized}
                  isZoomed={isExpanded}
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
                  zoomLabel="contact window"
                />
                <p className="window-label">Contact Gutter Fairy</p>
                <button type="button" onClick={closeWindow} className="win-button utility-button-inline">
                  Close
                </button>
              </div>

              {!isMinimized ? (
                <div className="window-body">
                  <p className="eyebrow">Studio contact</p>
                  <h2 className="section-title mt-2">DM for custom work, workshop questions, or weird little ideas.</h2>
                  <p className="page-copy mt-3">
                    Instagram is the cleanest contact point right now, so this opens the direct brand channel instead of a fake contact form.
                  </p>

                  <div className="button-row mt-4">
                    <a
                      href={instagramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="win-button"
                    >
                      Open Instagram
                    </a>
                    <button type="button" onClick={closeWindow} className="win-button">
                      Dismiss
                    </button>
                  </div>
                </div>
              ) : null}
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}
