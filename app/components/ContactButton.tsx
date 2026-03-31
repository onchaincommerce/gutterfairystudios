"use client";

import { useEffect, useState } from "react";

type ContactButtonProps = {
  label?: string;
  className?: string;
};

export default function ContactButton({
  label = "Contact",
  className = "",
}: ContactButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {label}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[10001]">
          <div
            className="fixed inset-0 bg-[rgba(31,26,29,0.38)] backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-0 z-[10002] flex items-center justify-center p-4 sm:p-6">
            <div
              className="window-panel relative w-full max-w-md"
              role="dialog"
              aria-modal="true"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="window-bar bg-gradient-to-r from-[rgba(246,215,231,0.95)] to-[rgba(255,255,255,0.9)]">
                <div className="flex items-center gap-2">
                  <span className="window-dot bg-[var(--color-blush)]" />
                  <span className="window-dot bg-[var(--color-lilac)]" />
                  <span className="window-dot bg-[var(--color-blue)]" />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[rgba(31,26,29,0.62)]">
                  contact.exe
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(31,26,29,0.16)] bg-[rgba(255,255,255,0.78)] text-sm text-[var(--color-ink)]"
                  aria-label="Close"
                >
                  x
                </button>
              </div>

              <div className="window-body">
                <p className="section-kicker">Contact Gutter Fairy</p>
                <h2 className="offset-heading mt-3 text-[1.8rem] font-semibold leading-tight text-[var(--color-ink)]">
                  DM for custom work, workshop questions, or weird little ideas.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[rgba(31,26,29,0.76)]">
                  Instagram is the cleanest contact point right now, so this button opens the direct brand channel instead of sending you into a fake contact form.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://www.instagram.com/gutterfairystudios/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glossy-button w-full justify-center"
                  >
                    Open Instagram
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="utility-button w-full justify-center"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
