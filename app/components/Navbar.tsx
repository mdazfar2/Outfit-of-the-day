"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        // User has completely scrolled past the hero section and entered the next section
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
            ? "bg-[#121622]/65 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60 rounded-2xl px-6 py-3.5 flex items-center justify-between ring-1 ring-white/5"
            : "bg-transparent border-transparent px-2 py-2 flex items-center justify-between"
        }`}
      >
        {/* Brand / Logo */}
        <a
          href="#"
          className="group flex items-center gap-2.5 font-serif text-xl sm:text-2xl tracking-[0.22em] font-medium text-white transition-opacity hover:opacity-80"
        >
          <span>OOTD</span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-xs tracking-[0.14em] uppercase transition-colors duration-300 font-medium ${
                isPastHero
                  ? "text-white/70 hover:text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Button (Starlink Style) */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="#todays-look"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs tracking-[0.12em] uppercase font-semibold transition-all duration-300 ${
              isPastHero
                ? "bg-white text-[#0A0D14] hover:bg-white/90 shadow-md shadow-white/10"
                : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20"
            }`}
          >
            <Sparkles size={13} className="text-accent-gold" />
            Today&apos;s Tee
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-64 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-6xl p-5 bg-[#121622]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-xs tracking-[0.12em] uppercase text-white/80 hover:text-white py-1 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#todays-look"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs tracking-[0.12em] uppercase font-semibold bg-white text-[#0A0D14] mt-2"
          >
            <Sparkles size={13} className="text-accent-gold" />
            Today&apos;s Tee
          </a>
        </div>
      </div>
    </header>
  );
}
