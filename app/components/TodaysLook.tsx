"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { DAYS, type DayData } from "@/app/data/days";
import { Sparkles, Shirt } from "lucide-react";

interface TodaysLookProps {
  selectedDay: DayData;
  todayIndex: number;
  isTransitioning: boolean;
  onDayChange: (day: DayData) => void;
}

const PLANET_SYMBOLS: Record<string, string> = {
  Sun: "☉",
  Moon: "☽",
  Mars: "♂",
  Mercury: "☿",
  Jupiter: "♃",
  Venus: "♀",
  Saturn: "♄",
};

export default function TodaysLook({
  selectedDay,
  todayIndex,
  isTransitioning,
  onDayChange,
}: TodaysLookProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = -((y - centerY) / centerY) * 10;
    const tiltY = ((x - centerX) / centerX) * 10;
    setTilt({ x: tiltX, y: tiltY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <section id="todays-look" className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white">
            Today&apos;s Look
          </h2>
          <p className="mt-3 text-sm text-white/50 max-w-md mx-auto">
            Planetary inspiration translated into premium men&apos;s heavyweight T-shirt styling.
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex justify-center mb-14 sm:mb-16">
          <div className="flex gap-2 overflow-x-auto pb-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/8 backdrop-blur-md max-w-full">
            {DAYS.map((day) => {
              const isActive = day.index === selectedDay.index;
              const isToday = day.index === todayIndex;
              return (
                <button
                  key={day.day}
                  onClick={() => onDayChange(day)}
                  className={`relative flex flex-col items-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 flex-shrink-0 cursor-pointer border ${
                    isActive
                      ? "bg-[#1B202E] border-white/20 text-white shadow-lg shadow-black/60 font-semibold ring-1 ring-white/10 scale-[1.02]"
                      : "border-transparent bg-transparent text-stone-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span className={`text-[10px] sm:text-xs tracking-[0.16em] uppercase font-mono ${isActive ? "text-white" : "text-stone-300"}`}>
                    {day.dayShort}
                  </span>
                  <span
                    className={`w-3 h-3 rounded-full border transition-transform duration-300 ${
                      isActive ? "scale-110 border-white/40 shadow-sm" : "border-white/20"
                    }`}
                    style={{
                      backgroundColor: day.colorHex,
                    }}
                  />
                  {isToday && (
                    <span
                      className={`text-[8px] tracking-wider uppercase px-2 py-0.5 rounded-full font-medium ${
                        isActive
                          ? "bg-accent-gold/20 text-accent-gold border border-accent-gold/30"
                          : "bg-white/[0.06] text-stone-300 border border-white/10"
                      }`}
                    >
                      Today
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Content Box */}
        <div
          className={`glass-panel rounded-3xl p-6 sm:p-10 lg:p-14 transition-all duration-300 ease-out ${
            isTransitioning
              ? "opacity-0 translate-y-3"
              : "opacity-100 translate-y-0"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Model & T-Shirt Image with 3D Planet Engine */}
            <div
              className="relative preserve-3d"
              style={{ perspective: 1200 }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                ref={cardRef}
                className="relative overflow-hidden rounded-2xl aspect-[3/4] max-w-md mx-auto shadow-2xl transition-all duration-300 ease-out group cursor-pointer border"
                style={{
                  transform: isHovered
                    ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.025, 1.025, 1.025)`
                    : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
                  transition: isHovered
                    ? "transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease"
                    : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease",
                  borderColor: isHovered
                    ? `${selectedDay.colorHex}66`
                    : "rgba(255, 255, 255, 0.1)",
                  boxShadow: isHovered
                    ? `0 30px 60px -15px rgba(0, 0, 0, 0.85), 0 0 40px -10px ${selectedDay.colorHex}44`
                    : "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
                }}
              >
                <Image
                  src={selectedDay.outfitImage}
                  alt={`${selectedDay.day} men's look — ${selectedDay.outfitSuggestion}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />

                {/* 3D Holographic Glare Sheen following cursor */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: glare.opacity,
                    background: `radial-gradient(circle 260px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 70%)`,
                  }}
                />

                {/* On-Hover 3D Celestial Alignment HUD Overlay */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-all duration-400 ease-out flex flex-col justify-between p-6 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {/* Top-left alignment badge */}
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 self-start shadow-lg transform transition-transform duration-300">
                    <span
                      className="w-2 h-2 rounded-full animate-ping"
                      style={{ backgroundColor: selectedDay.colorHex }}
                    />
                    <span className="text-[11px] font-medium tracking-widest uppercase text-white/95">
                      {selectedDay.planet} Alignment
                    </span>
                    <span
                      className="font-serif text-sm font-bold ml-0.5"
                      style={{ color: selectedDay.colorHex }}
                    >
                      {PLANET_SYMBOLS[selectedDay.planet] || "✦"}
                    </span>
                  </div>

                  {/* Center subtle celestial rings watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                    <div
                      className="w-56 h-56 rounded-full border border-dashed animate-orbit-spin"
                      style={{ borderColor: selectedDay.colorHex }}
                    />
                    <div
                      className="absolute w-72 h-72 rounded-full border border-dotted animate-orbit-spin-reverse opacity-40"
                      style={{ borderColor: selectedDay.colorHex }}
                    />
                  </div>
                </div>

                {/* Bottom badges */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                  <span className="text-xs uppercase tracking-widest text-white/95 font-medium px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 shadow-md">
                    {selectedDay.color}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-white/80 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 shadow-md flex items-center gap-1.5">
                    <span style={{ color: selectedDay.colorHex }}>
                      {PLANET_SYMBOLS[selectedDay.planet] || "✦"}
                    </span>
                    {selectedDay.planet}
                  </span>
                </div>
              </div>

              {/* 3D Floating Interactive Planet Sphere with Gyroscopic Orbital Rings */}
              <div
                className="absolute -top-6 -right-4 sm:-top-8 sm:-right-6 w-24 h-24 sm:w-28 sm:h-28 z-20 pointer-events-none transition-all duration-300 ease-out"
                style={{
                  transform: isHovered
                    ? `translate3d(0, -10px, 65px) scale(1.22)`
                    : "translate3d(0, 0, 0) scale(1)",
                  filter: isHovered
                    ? `drop-shadow(0 15px 35px ${selectedDay.colorHex}88)`
                    : "drop-shadow(0 10px 20px rgba(0,0,0,0.8))",
                }}
              >
                {/* 3D Gyroscopic Orbital Ring 1 */}
                <div
                  className={`absolute -inset-4 rounded-full border pointer-events-none transition-opacity duration-300 ${
                    isHovered
                      ? "opacity-90 animate-orbit-spin"
                      : "opacity-40 animate-orbit-spin"
                  }`}
                  style={{
                    borderWidth: isHovered ? "2px" : "1.5px",
                    borderColor: selectedDay.colorHex,
                    boxShadow: isHovered
                      ? `0 0 20px ${selectedDay.colorHex}`
                      : "none",
                  }}
                />

                {/* 3D Gyroscopic Orbital Ring 2 (counter-rotating with stardust bead) */}
                <div
                  className={`absolute -inset-2 rounded-full border pointer-events-none transition-opacity duration-300 ${
                    isHovered
                      ? "opacity-75 animate-orbit-spin-reverse"
                      : "opacity-25 animate-orbit-spin-reverse"
                  }`}
                  style={{
                    borderWidth: "1.5px",
                    borderStyle: isHovered ? "solid" : "dashed",
                    borderColor: selectedDay.colorSecondaryHex || "#FFF",
                    boxShadow: isHovered
                      ? `0 0 15px ${selectedDay.colorSecondaryHex}`
                      : "none",
                  }}
                >
                  {/* Orbiting Stardust Bead */}
                  <span
                    className="absolute -top-1 left-1/2 w-2 h-2 rounded-full shadow-lg"
                    style={{
                      backgroundColor: selectedDay.colorHex,
                      boxShadow: `0 0 8px ${selectedDay.colorHex}`,
                    }}
                  />
                </div>

                {/* 3D Planet Sphere Body */}
                <div
                  className="relative w-full h-full rounded-full overflow-hidden shadow-2xl transition-all duration-300 ring-2 ring-white/25"
                  style={{
                    boxShadow: isHovered
                      ? `inset -12px -12px 24px rgba(0, 0, 0, 0.95), inset 6px 6px 14px rgba(255, 255, 255, 0.5), 0 0 35px ${selectedDay.colorHex}`
                      : `inset -8px -8px 16px rgba(0, 0, 0, 0.9), inset 3px 3px 8px rgba(255, 255, 255, 0.3), 0 0 15px rgba(0,0,0,0.5)`,
                  }}
                >
                  {/* Planet Texture */}
                  <Image
                    src={selectedDay.planetImage}
                    alt={selectedDay.planet}
                    fill
                    sizes="120px"
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isHovered ? "scale-110" : "scale-100"
                    }`}
                  />

                  {/* 3D Spherical Specular Light & Terminator Shadow Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.18) 22%, rgba(0,0,0,0) 48%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.98) 100%)",
                    }}
                  />

                  {/* Atmospheric Color Corona Tint */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-full transition-opacity duration-300"
                    style={{
                      opacity: isHovered ? 0.35 : 0.15,
                      background: `radial-gradient(circle at 35% 30%, ${selectedDay.colorHex} 0%, transparent 70%)`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Editorial Information Side */}
            <div className="flex flex-col gap-6">
              {/* Day & Celestial Ruler */}
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-accent-gold font-medium mb-2 flex items-center gap-2">
                  <Sparkles size={12} />
                  {selectedDay.day} &middot; Ruled by {selectedDay.planet}
                </p>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                  {selectedDay.color}
                </h3>
              </div>

              {/* Tagline */}
              <p
                className="font-serif text-xl sm:text-2xl italic leading-relaxed"
                style={{
                  color: selectedDay.taglineColor || selectedDay.colorHex,
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                }}
              >
                &ldquo;{selectedDay.tagline}&rdquo;
              </p>

              {/* Description */}
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                {selectedDay.description}
              </p>

              {/* T-Shirt Styling Guide */}
              <div className="border-t border-white/10 pt-6">
                <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-2.5 font-medium flex items-center gap-2">
                  <Shirt size={12} className="text-accent-gold" />
                  Styling &amp; Silhouette
                </p>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/8 text-white/90 text-sm leading-relaxed">
                  {selectedDay.outfitSuggestion}
                </div>
              </div>

              {/* Colour Palette Swatches */}
              <div className="border-t border-white/10 pt-6">
                <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-3.5 font-medium">
                  Astronomical Colour Resonance
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  {[
                    { name: selectedDay.color, hex: selectedDay.colorHex },
                    {
                      name: selectedDay.colorSecondary,
                      hex: selectedDay.colorSecondaryHex,
                    },
                    {
                      name: selectedDay.colorTertiary,
                      hex: selectedDay.colorTertiaryHex,
                    },
                  ].map((swatch) => (
                    <div
                      key={swatch.name}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5"
                    >
                      <span
                        className="w-4 h-4 rounded-full ring-2 ring-white/15"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span className="text-xs tracking-wide text-white/70">
                        {swatch.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
