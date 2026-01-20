"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/designs", label: "Designs" },
  { href: "https://www.depop.com/gutterfairystudios/", label: "Thrift", external: true },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll to hide/show nav on mobile, close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Close mobile menu if open and user scrolls
      if (isOpen && currentScrollY !== lastScrollY) {
        setIsOpen(false);
      }
      
      // Track scroll position for minimizing nav
      setIsScrolled(currentScrollY > 50);
      
      // Hide/show nav on mobile based on scroll direction
      if (window.innerWidth < 768) {
        if (currentScrollY < 10) {
          // Always show at top
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down - hide
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show
          setIsVisible(true);
        }
      } else {
        // Desktop: always visible
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen, lastScrollY]);

  const handleNavClick = (external?: boolean) => {
    if (!external) {
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] border-b border-[#f0e6d3]/15 transition-transform duration-300 ${
      isScrolled ? "bg-[#121212] shadow-lg" : "bg-[#121212]/95 backdrop-blur-sm"
    } ${
      isVisible ? "translate-y-0" : "-translate-y-full"
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group px-2 py-2 rounded transition-all duration-200 hover:bg-[#ff3366]/10">
            <Image
              src="/fairy.png"
              alt="Gutter Fairy"
              width={36}
              height={36}
              className="group-hover:drop-shadow-[0_0_8px_rgba(255,51,102,0.6)] transition-all"
              draggable={false}
            />
            <span className="font-body text-lg font-bold text-[#f0e6d3] hidden sm:block uppercase tracking-wide group-hover:text-[#ff3366] transition-colors">
              GUTTER FAIRY
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                !link.external &&
                (pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(`${link.href}/`)));
              const baseClass = "font-body text-sm font-semibold tracking-wide transition-all duration-200 uppercase px-3 py-2 rounded relative";
              const colorClass = link.label === "Thrift"
                ? "text-[#f0e6d3] hover:text-[#ff3366] hover:bg-[#ff3366]/10"
                : isActive
                ? "text-[#ff3366]"
                : "text-[#f0e6d3] hover:text-[#ff3366] hover:bg-[#ff3366]/10";

              if (link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleNavClick(link.external)}
                    className={`${baseClass} ${colorClass}`}
                  >
                    {link.label}
                    <span className="ml-1 text-xs text-[#ff3366]">↗</span>
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.external)}
                  aria-current={isActive ? "page" : undefined}
                  className={`${baseClass} ${colorClass}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 group z-10"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-[#f0e6d3] transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#f0e6d3] transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#f0e6d3] transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu - Better contrast */}
      <div
        className={`md:hidden fixed top-16 right-0 w-64 bg-[#121212] border-l border-[#f0e6d3]/15 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ maxHeight: "calc(100vh - 4rem)" }}
      >
        <div className="flex flex-col p-6 gap-6 bg-[#121212]/98 backdrop-blur-md">
          {navLinks.map((link, index) => {
            const isActive =
              !link.external &&
              (pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`)));
            const baseClass = "font-body text-lg font-semibold transition-all duration-200 uppercase tracking-wide px-4 py-3 rounded relative";
            const colorClass = link.label === "Thrift"
              ? "text-[#f0e6d3] hover:text-[#ff3366] hover:bg-[#ff3366]/10"
              : isActive
              ? "text-[#ff3366]"
              : "text-[#f0e6d3] hover:text-[#ff3366] hover:bg-[#ff3366]/10";
            const sharedStyle = {
              animation: isOpen ? `fadeInUp 0.3s ease forwards` : "none",
              animationDelay: `${index * 0.05}s`,
              opacity: isOpen ? 1 : 0,
              textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
            };

            if (link.external) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleNavClick(link.external)}
                  className={`${baseClass} ${colorClass}`}
                  style={sharedStyle}
                >
                  {link.label}
                  <span className="ml-2 text-sm text-[#ff3366]">↗</span>
                </a>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.external)}
                aria-current={isActive ? "page" : undefined}
                className={`${baseClass} ${colorClass}`}
                style={sharedStyle}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile overlay - darker for better contrast */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-black/70 backdrop-blur-sm z-[99]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}
