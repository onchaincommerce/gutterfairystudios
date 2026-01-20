"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

type OrderPatchButtonProps = {
  buttonLabel?: string;
  className?: string;
};

export default function OrderPatchButton({
  buttonLabel = "Order a patch",
  className = "",
}: OrderPatchButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (!isOpen || !buttonRect || !modalRef.current) {
      return;
    }

    const modalWidth = modalRef.current.offsetWidth;
    const modalHeight = modalRef.current.offsetHeight;
    const spacing = window.innerWidth < 640 ? 32 : 20;
    const viewportPadding = 16;

    let top = buttonRect.bottom + spacing;
    let left = buttonRect.left + buttonRect.width / 2;

    if (top + modalHeight > window.innerHeight - viewportPadding) {
      top = Math.max(
        viewportPadding,
        window.innerHeight - modalHeight - viewportPadding
      );
    }

    if (top < viewportPadding) {
      top = viewportPadding;
    }

    const minLeft = modalWidth / 2 + viewportPadding;
    const maxLeft = window.innerWidth - modalWidth / 2 - viewportPadding;
    if (left < minLeft) {
      left = minLeft;
    } else if (left > maxLeft) {
      left = maxLeft;
    }

    setModalPosition({ top, left });
  }, [isOpen, buttonRect]);

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
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          setStatus("idle");
          if (buttonRef.current) {
            setButtonRect(buttonRef.current.getBoundingClientRect());
          }
          setIsOpen(true);
        }}
        className={`inline-block font-body text-sm font-semibold tracking-wide px-8 py-4 bg-[#ff3366] text-[#f0e6d3] hover:bg-[#ff3366]/80 transition-all duration-300 uppercase ${className}`}
      >
        {buttonLabel}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[10001] overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[10002]"
            onClick={() => setIsOpen(false)}
          />
          <div
            ref={modalRef}
            className="fixed z-[10003] w-full max-w-lg bg-[#121212] border border-white/10 p-6 sm:p-8"
            style={{
              top: `${modalPosition.top}px`,
              left: `${modalPosition.left}px`,
              transform: "translateX(-50%)",
            }}
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-[#f0e6d3]/70 hover:text-[#ff3366] hover:bg-[#ff3366]/10 rounded transition-all duration-200 font-body text-xl font-bold"
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="font-body text-2xl sm:text-3xl font-bold text-[#f0e6d3] mb-6 uppercase">
              Order a patch
            </h2>

            {status === "success" ? (
              <div className="space-y-4">
                <p className="font-body text-base text-[#f0e6d3]">
                  Got it - I'll reach out soon.
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-block font-body text-sm font-semibold tracking-wide px-6 py-3 bg-[#ff3366] text-[#f0e6d3] hover:bg-[#ff3366]/80 transition-all duration-300 uppercase"
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
                className="space-y-4"
              >
                <label className="block text-sm font-semibold text-[#f0e6d3] font-body">
                  Patch Title
                  <input
                    type="text"
                    name="patch_title"
                    required
                    className="mt-2 w-full bg-black/40 border border-white/10 px-4 py-3 text-[#f0e6d3] focus:outline-none focus:border-[#ff3366]"
                  />
                </label>

                <label className="block text-sm font-semibold text-[#f0e6d3] font-body">
                  Patch Size
                  <input
                    type="text"
                    name="patch_size"
                    required
                    className="mt-2 w-full bg-black/40 border border-white/10 px-4 py-3 text-[#f0e6d3] focus:outline-none focus:border-[#ff3366]"
                  />
                </label>

                <label className="block text-sm font-semibold text-[#f0e6d3] font-body">
                  Patch Thread Color(s)
                  <input
                    type="text"
                    name="patch_thread_colors"
                    required
                    className="mt-2 w-full bg-black/40 border border-white/10 px-4 py-3 text-[#f0e6d3] focus:outline-none focus:border-[#ff3366]"
                  />
                </label>

                {status === "error" && (
                  <p className="font-body text-sm text-[#ff3366]">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-block font-body text-sm font-semibold tracking-wide px-8 py-4 bg-[#ff3366] text-[#f0e6d3] hover:bg-[#ff3366]/80 transition-all duration-300 uppercase"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending..." : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
