"use client";

import { useState, useEffect } from "react";
import { Sparkles, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        // User has scrolled past hero section
        setIsPastHero(heroBottom <= 80);
      } else {
        setIsPastHero(window.scrollY > window.innerHeight - 80);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Today's Look", href: "#todays-look" },
    { label: "Weekly Palette", href: "#weekly-palette" },
    { label: "The Color Story", href: "#color-story" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isPastHero
          ? "pt-3 sm:pt-4 px-4 sm:px-6 pointer-events-auto opacity-100 translate-y-0"
          : "pt-6 px-6 pointer-events-auto bg-transparent border-transparent"
      }`}
    >
      <div
        className={`mx-auto max-w-6xl transition-all duration-500 ease-in-out ${
          isPastHero
            ? "bg-black/15 backdrop-blur-md border border-white/10 shadow-lg shadow-black/25 rounded-2xl px-5 sm:px-7 py-2.5 sm:py-3 flex items-center justify-between ring-1 ring-white/5"
            : "bg-transparent border-transparent px-2 py-2 flex items-center justify-between"
        }`}
      >
        {/* Brand / Logo */}
        <a
          href="#"
          aria-label="OOTD by Azfar — Home"
          title="OOTD by Azfar"
          className="group flex items-center gap-2.5 font-serif text-xl sm:text-2xl tracking-[0.22em] font-medium text-white transition-opacity hover:opacity-80 shrink-0"
        >
          <span>OOTD</span>
        </a>

        {/* Middle Navigation Links - Visible on Hero, hidden when sticky (Starlink style) */}
        <nav
          className={`hidden md:flex items-center gap-8 overflow-hidden transition-all duration-500 ease-in-out ${
            isPastHero
              ? "max-w-0 opacity-0 pointer-events-none scale-95"
              : "max-w-xl opacity-100 scale-100"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs tracking-[0.14em] uppercase font-medium text-white/80 hover:text-white transition-colors duration-200 whitespace-nowrap drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#todays-look"
            className={`inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-300 ${
              isPastHero
                ? "bg-white text-[#0A0D14] hover:bg-white/90 shadow-md shadow-white/10"
                : "bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20"
            }`}
          >
            <Sparkles size={13} className="text-accent-gold" />
            Today&apos;s Tee
          </a>

          {/* Mobile hamburger only on Hero */}
          {!isPastHero && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer (Only when on Hero) */}
      {!isPastHero && (
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? "max-h-56 opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="mx-auto max-w-6xl p-4 bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-xs tracking-[0.14em] uppercase text-white/80 hover:text-white py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

