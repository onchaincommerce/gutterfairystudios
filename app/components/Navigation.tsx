"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Designs", href: "/designs" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="pt-4 sm:pt-5">
      <div className="site-shell">
        <div className="overflow-hidden rounded-[30px] border-2 border-[var(--color-ink)] bg-gradient-to-r from-[rgba(255,255,255,0.9)] via-[rgba(246,215,231,0.74)] to-[rgba(217,208,255,0.8)] shadow-[0_14px_28px_rgba(31,26,29,0.1)]">
          <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
            <div className="flex items-center justify-between gap-4">
              <a
                href="https://www.gutterfairy.com/"
                className={`flex items-center gap-3 self-start whitespace-nowrap rounded-full px-2 py-1 transition-transform duration-150 hover:-translate-y-0.5 ${
                  pathname === "/" ? "text-[var(--color-ink)]" : "text-[rgba(31,26,29,0.88)]"
                }`}
              >
                <span className="font-mono text-[1rem] font-bold uppercase tracking-[0.16em] sm:text-[1.1rem]">
                  Gutter Fairy
                </span>
              </a>

              <button
                type="button"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-controls="mobile-primary-nav"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(31,26,29,0.18)] bg-[rgba(255,255,255,0.72)] text-[var(--color-ink)] shadow-[0_8px_18px_rgba(31,26,29,0.08)] transition-transform duration-150 hover:-translate-y-0.5 sm:hidden"
              >
                <span className="flex h-4 w-4 flex-col items-center justify-between">
                  <span
                    className={`block h-[2px] w-4 rounded-full bg-current transition-transform duration-200 ${
                      isMobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`block h-[2px] w-4 rounded-full bg-current transition-opacity duration-200 ${
                      isMobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`block h-[2px] w-4 rounded-full bg-current transition-transform duration-200 ${
                      isMobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>

            <nav className="hidden flex-wrap items-center gap-x-5 gap-y-3 sm:flex sm:justify-end sm:gap-x-7" aria-label="Primary">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-mono text-[0.92rem] font-bold uppercase tracking-[0.14em] transition-colors duration-150 ${
                      isActive
                        ? "text-[rgba(31,26,29,0.96)]"
                        : "text-[rgba(31,26,29,0.7)] hover:text-[rgba(31,26,29,0.92)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <a
                href="https://www.depop.com/gutterfairystudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.92rem] font-bold uppercase tracking-[0.14em] text-[rgba(31,26,29,0.7)] transition-colors duration-150 hover:text-[rgba(31,26,29,0.92)]"
              >
                Thrift
                <span className="ml-1 text-[rgba(255,95,132,0.9)]">↗</span>
              </a>

              <a
                href="https://www.instagram.com/gutterfairystudios/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(31,26,29,0.16)] bg-[rgba(255,255,255,0.62)] text-[rgba(31,26,29,0.72)] transition-transform duration-150 hover:-translate-y-0.5 hover:text-[rgba(31,26,29,0.92)]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px]"
                  fill="currentColor"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.94 1.35a1.17 1.17 0 1 1 0 2.34 1.17 1.17 0 0 1 0-2.34ZM12 6.85A5.15 5.15 0 1 1 6.85 12 5.16 5.16 0 0 1 12 6.85Zm0 1.8A3.35 3.35 0 1 0 15.35 12 3.35 3.35 0 0 0 12 8.65Z" />
                </svg>
              </a>
            </nav>

            {isMobileMenuOpen ? (
              <nav
                id="mobile-primary-nav"
                className="flex flex-col gap-2 rounded-[24px] border border-[rgba(31,26,29,0.14)] bg-[rgba(255,255,255,0.74)] p-3 shadow-[0_16px_26px_rgba(31,26,29,0.08)] sm:hidden"
                aria-label="Mobile primary"
              >
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`rounded-[16px] px-4 py-3 font-mono text-[0.9rem] font-bold uppercase tracking-[0.14em] transition-colors duration-150 ${
                        isActive
                          ? "bg-[rgba(217,208,255,0.46)] text-[rgba(31,26,29,0.96)]"
                          : "bg-[rgba(255,255,255,0.68)] text-[rgba(31,26,29,0.72)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                <a
                  href="https://www.depop.com/gutterfairystudio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-[16px] bg-[rgba(255,255,255,0.68)] px-4 py-3 font-mono text-[0.9rem] font-bold uppercase tracking-[0.14em] text-[rgba(31,26,29,0.72)]"
                >
                  Thrift
                  <span className="ml-1 text-[rgba(255,95,132,0.9)]">↗</span>
                </a>

                <a
                  href="https://www.instagram.com/gutterfairystudios/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-[16px] bg-[rgba(255,255,255,0.68)] px-4 py-3 font-mono text-[0.9rem] font-bold uppercase tracking-[0.14em] text-[rgba(31,26,29,0.72)]"
                >
                  Instagram
                </a>
              </nav>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
