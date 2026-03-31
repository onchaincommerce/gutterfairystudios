"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

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
  buttonLabel = "Order a patch",
  className = "",
  triggerClassName = "",
  wrapperClassName = "",
  initialPatchTitle = "",
  children,
}: OrderPatchButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement | null>(null);

  const openModal = () => {
    setStatus("idle");
    setIsOpen(true);
  };

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

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

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
          <button
            type="button"
            onClick={openModal}
            className={triggerClassName}
          >
            {children}
          </button>
        ) : null}

        {buttonLabel ? (
          <button
            type="button"
            onClick={openModal}
            className={`cta-primary ${className}`.trim()}
          >
            {buttonLabel}
          </button>
        ) : null}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[10001] overflow-y-auto">
          <div
            className="fixed inset-0 z-[10002] bg-[rgba(31,26,29,0.38)] backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-0 z-[10003] flex items-center justify-center p-4 sm:p-6">
            <div
              className="paper-panel relative w-full max-w-lg px-6 py-7 sm:px-8 sm:py-8"
              role="dialog"
              aria-modal="true"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[rgba(31,26,29,0.12)] bg-[rgba(255,255,255,0.8)] text-xl font-bold text-[rgba(31,26,29,0.72)] transition-all duration-200 hover:-translate-y-px hover:text-[var(--color-ink)]"
                aria-label="Close"
              >
                ×
              </button>

              <p className="section-kicker">custom patch request</p>
              <h2 className="font-display offset-heading mt-3 text-[2rem] leading-tight text-[var(--color-ink)] sm:text-[2.4rem]">
                Order a patch
              </h2>
              <p className="mt-3 text-sm leading-6 text-[rgba(31,26,29,0.7)]">
                Send the idea, the size, and the thread colors. I will take it from there.
              </p>

              {status === "success" ? (
                <div className="mt-6 space-y-4">
                  <p className="text-base leading-7 text-[rgba(31,26,29,0.82)]">
                    Patch request received. I&apos;ll reach out soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="cta-primary"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  action="https://formspree.io/f/mpqqlzrv"
                  method="POST"
                  className="mt-6 space-y-4"
                >
                  <label className="block text-sm font-semibold text-[var(--color-ink)]">
                    Patch Title
                    <input
                      type="text"
                      name="patch_title"
                      required
                      defaultValue={initialPatchTitle}
                      className="input-field mt-2"
                    />
                  </label>

                  <label className="block text-sm font-semibold text-[var(--color-ink)]">
                    Patch Size
                    <input
                      type="text"
                      name="patch_size"
                      required
                      className="input-field mt-2"
                    />
                  </label>

                  <label className="block text-sm font-semibold text-[var(--color-ink)]">
                    Patch Thread Color(s)
                    <input
                      type="text"
                      name="patch_thread_colors"
                      required
                      className="input-field mt-2"
                    />
                  </label>

                  {status === "error" && (
                    <p className="text-sm text-[rgba(31,26,29,0.78)]">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="cta-primary"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Sending..." : "Submit"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
