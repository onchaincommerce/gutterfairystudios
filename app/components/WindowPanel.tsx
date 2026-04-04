import type { ReactNode } from "react";

const chromeTones = {
  pink: "from-[rgba(246,215,231,0.95)] to-[rgba(255,255,255,0.88)]",
  lilac: "from-[rgba(217,208,255,0.95)] to-[rgba(255,255,255,0.9)]",
  blue: "from-[rgba(207,231,245,0.95)] to-[rgba(255,255,255,0.9)]",
  cream: "from-[rgba(255,249,244,0.96)] to-[rgba(255,255,255,0.9)]",
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
  return (
    <section className={`window-panel min-w-0 ${className}`.trim()}>
      <div className={`window-bar bg-gradient-to-r ${chromeTones[tone]}`}>
        <div className="flex shrink-0 items-center gap-2">
          <span className="window-dot bg-[var(--color-blush)]" />
          <span className="window-dot bg-[var(--color-lilac)]" />
          <span className="window-dot bg-[var(--color-blue)]" />
        </div>
        <p className="min-w-0 flex-1 truncate text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[rgba(31,26,29,0.62)] sm:text-left sm:text-[11px] sm:tracking-[0.22em]">
          {chromeLabel}
        </p>
        <span className="hidden h-3 w-12 shrink-0 rounded-full border border-[rgba(31,26,29,0.12)] bg-[rgba(255,255,255,0.64)] sm:block" />
      </div>
      <div className={`window-body ${bodyClassName}`.trim()}>{children}</div>
    </section>
  );
}
