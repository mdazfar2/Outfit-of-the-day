"use client";

import Image from "next/image";
import { DAYS, type DayData } from "@/app/data/days";

interface WeeklyPaletteProps {
  selectedDay?: DayData;
  todayIndex?: number;
  onDaySelect?: (day: DayData) => void;
}

export default function WeeklyPalette({
  selectedDay,
  todayIndex = -1,
  onDaySelect,
}: WeeklyPaletteProps) {
  return (
    <section
      id="weekly-palette"
      className="relative z-10 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-xs tracking-[0.25em] uppercase text-accent-gold mb-3 font-medium">
            Seven Days · Seven Planetary Alignments
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            Weekly Planet Palette
          </h2>
          <p className="mt-3 text-sm text-white/50 max-w-md mx-auto">
            Select any day to preview its cosmic tone, tailored silhouette, and men&apos;s styling guide.
          </p>
        </div>

        {/* 7-Day Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3.5 sm:gap-4">
          {DAYS.map((day) => {
            const isToday = day.index === todayIndex;
            const isSelected = selectedDay
              ? day.index === selectedDay.index
              : isToday;

            return (
              <a
                key={day.day}
                href="#todays-look"
                onClick={() => {
                  if (onDaySelect) {
                    onDaySelect(day);
                  }
                }}
                className={`group relative flex flex-col items-center gap-4 p-5 sm:p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-white/[0.09] border-2 border-accent-gold shadow-2xl shadow-accent-gold/10 scale-[1.03]"
                    : "glass-card hover:scale-[1.02]"
                }`}
              >
                {/* Today indicator */}
                {isToday && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.2em] uppercase px-2.5 py-0.5 rounded-full font-bold bg-accent-gold text-black shadow-md shadow-accent-gold/30">
                    Today
                  </span>
                )}

                {/* Planet thumbnail */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden transition-all duration-300 ${
                    isSelected
                      ? "ring-2 ring-accent-gold/60 shadow-lg shadow-accent-gold/20"
                      : "ring-1 ring-white/10 group-hover:ring-white/30"
                  }`}
                >
                  <Image
                    src={day.planetImage}
                    alt={day.planet}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Day name */}
                <div className="text-center">
                  <p
                    className={`text-xs sm:text-sm font-semibold tracking-wide ${
                      isSelected ? "text-white" : "text-white/80"
                    }`}
                  >
                    {day.dayShort}
                  </p>
                  <p className="text-[10px] tracking-wider uppercase text-white/40 mt-0.5">
                    {day.planet}
                  </p>
                </div>

                {/* Colour swatch */}
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-5 h-5 rounded-full ring-2 ring-white/10 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: day.colorHex,
                      boxShadow: isSelected
                        ? `0 0 10px ${day.colorHex}55`
                        : "none",
                    }}
                  />
                </div>

                {/* Colour name */}
                <p
                  className={`text-[10px] tracking-wider text-center line-clamp-1 ${
                    isSelected ? "text-accent-gold font-medium" : "text-white/50"
                  }`}
                >
                  {day.color}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
