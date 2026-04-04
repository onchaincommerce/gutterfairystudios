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
              Menu
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
                  className="nav-button"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
