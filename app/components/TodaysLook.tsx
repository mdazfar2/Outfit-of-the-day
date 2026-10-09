"use client";

import Image from "next/image";
import { DAYS, type DayData } from "@/app/data/days";
import { Sparkles, Shirt } from "lucide-react";

interface TodaysLookProps {
  selectedDay: DayData;
  todayIndex: number;
  isTransitioning: boolean;
  onDayChange: (day: DayData) => void;
}

export default function TodaysLook({
  selectedDay,
  todayIndex,
  isTransitioning,
  onDayChange,
}: TodaysLookProps) {
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
                  className={`relative flex flex-col items-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 flex-shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-white text-[#0A0D14] shadow-lg shadow-white/10 scale-[1.02] font-semibold"
                      : "bg-transparent text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="text-[10px] sm:text-xs tracking-[0.16em] uppercase">
                    {day.dayShort}
                  </span>
                  <span
                    className="w-3 h-3 rounded-full transition-transform duration-300"
                    style={{
                      backgroundColor: day.colorHex,
                      boxShadow: isActive ? "0 0 8px rgba(0,0,0,0.3)" : "none",
                    }}
                  />
                  {isToday && (
                    <span
                      className={`text-[8px] tracking-wider uppercase px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-black/10 text-black font-bold"
                          : "bg-accent-gold/20 text-accent-gold"
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
            {/* Model & T-Shirt Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] max-w-md mx-auto shadow-2xl border border-white/10 group">
                <Image
                  src={selectedDay.outfitImage}
                  alt={`${selectedDay.day} men's look — ${selectedDay.outfitSuggestion}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />
                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Bottom badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="text-xs uppercase tracking-widest text-white/90 font-medium px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                    {selectedDay.color}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-white/70 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                    {selectedDay.planet}
                  </span>
                </div>
              </div>

              {/* Floating Planet Token */}
              <div className="absolute -top-5 -right-3 sm:-top-6 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-2xl border-2 border-white/20 ring-4 ring-black/60 animate-float">
                <Image
                  src={selectedDay.planetImage}
                  alt={selectedDay.planet}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
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
