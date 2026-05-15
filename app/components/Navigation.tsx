"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { depopLink, instagramLink } from "../data/siteContent";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Designs", href: "/designs" },
  { label: "About", href: "/about" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="desktop-header">
      <div className="site-shell">
        <div className="desktop-toolbar desktop-toolbar--nav">
          <div className="desktop-toolbar__row">
            <Link href="/" className="desktop-brand" onClick={() => setIsOpen(false)}>
              <span>
                <span className="desktop-brand__name">Gutter Fairy</span>
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="desktop-mobile-toggle win-button"
              aria-expanded={isOpen}
              aria-controls="desktop-primary-nav"
            >
              Start
            </button>

            <div
              id="desktop-primary-nav"
              className={`desktop-nav ${!isOpen ? "desktop-nav--collapsed" : ""}`.trim()}
            >
              <nav className="nav-list" aria-label="Primary">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`nav-button ${isActive ? "nav-button--active" : ""}`.trim()}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="nav-utility">
                <a
                  href={depopLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-button"
                >
                  Depop
                </a>
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-button nav-button--icon"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="nav-button__icon"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.25 2.5A4.75 4.75 0 0 0 2.5 7.25v9.5a4.75 4.75 0 0 0 4.75 4.75h9.5a4.75 4.75 0 0 0 4.75-4.75v-9.5a4.75 4.75 0 0 0-4.75-4.75h-9.5Zm9 2a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7.25A4.75 4.75 0 1 0 12 16.75 4.75 4.75 0 0 0 12 7.25Zm-2.75 4.75a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0Z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
