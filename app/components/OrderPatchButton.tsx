"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import WindowDots from "./WindowDots";

type Status = "idle" | "submitting" | "success" | "error";

type OrderPatchButtonProps = {
  buttonLabel?: string;
  className?: string;
  triggerClassName?: string;
  wrapperClassName?: string;
  initialPatchTitle?: string;
  children?: ReactNode;
};

export default function OrderPatchButton({
  buttonLabel = "Order Patch",
  className = "",
  triggerClassName = "",
  wrapperClassName = "",
  initialPatchTitle = "",
  children,
}: OrderPatchButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement | null>(null);

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

  const openModal = () => {
    setStatus("idle");
    setIsMinimized(false);
    setIsOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") {
      return;
    }

    setStatus("submitting");

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("https://formspree.io/f/mpqqlzrv", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <div className={wrapperClassName}>
        {children ? (
          <button type="button" onClick={openModal} className={triggerClassName}>
            {children}
          </button>
        ) : null}

        {buttonLabel ? (
          <button type="button" onClick={openModal} className={`win-button ${className}`.trim()}>
            {buttonLabel}
          </button>
        ) : null}
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-[70]">
          <button
            type="button"
            className="window-panel__backdrop"
            aria-label="Close order form"
            onClick={closeWindow}
          />
          <div className="fixed inset-0 z-[71] flex items-center justify-center p-4">
            <section
              className={`window-panel ${isMinimized ? "window-panel--minimized" : ""} ${isExpanded ? "window-panel--zoomed" : "max-w-2xl"} w-full`.trim()}
              role="dialog"
              aria-modal="true"
            >
              <div className="window-bar window-bar--pink">
                <WindowDots
                  closeLabel="patch order form"
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
                  zoomLabel={status === "success" ? "order complete window" : "order patch window"}
                />
                <p className="window-label">{status === "success" ? "Order Complete" : "Patch Order Form"}</p>
              </div>

              {!isMinimized ? (
                <div className="window-body">
                  {status === "success" ? (
                    <>
                      <h2 className="section-title">Order complete</h2>
                      <div className="classic-list mt-5">
                        <div className="classic-list__item">
                          <p className="classic-list__title">Request received</p>
                          <p className="classic-list__body">
                            Your patch request is in the inbox. I&apos;ll reach out soon for delivery information.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="eyebrow">Custom patch request</p>
                      <h2 className="section-title mt-2">Order a patch</h2>
                      <p className="page-copy mt-3">
                        Send the design idea, the size, and the thread colors. I&apos;ll follow up from there.
                      </p>

                      <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        action="https://formspree.io/f/mpqqlzrv"
                        method="POST"
                        className="classic-list mt-5"
                      >
                        <label className="field-label">
                          Patch title
                          <input
                            type="text"
                            name="patch_title"
                            required
                            defaultValue={initialPatchTitle}
                            className="input-field"
                          />
                        </label>

                        <label className="field-label">
                          Patch size
                          <input
                            type="text"
                            name="patch_size"
                            required
                            className="input-field"
                          />
                        </label>

                        <label className="field-label">
                          Patch thread color(s)
                          <input
                            type="text"
                            name="patch_thread_colors"
                            required
                            className="input-field"
                          />
                        </label>

                        {status === "error" ? (
                          <div className="classic-list__item">
                            <p className="classic-list__body">Something went wrong. Please try again.</p>
                          </div>
                        ) : null}

                        <div className="button-row">
                          <button type="submit" className="win-button" disabled={status === "submitting"}>
                            {status === "submitting" ? "Sending..." : "Submit request"}
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              ) : null}
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}
