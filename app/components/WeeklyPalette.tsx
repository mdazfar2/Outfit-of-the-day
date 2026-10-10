"use client";

import Image from "next/image";
import { DAYS, type DayData } from "@/app/data/days";

interface WeeklyPaletteProps {
  selectedDay?: DayData;
  todayIndex?: number;
  onDaySelect?: (day: DayData) => void;
}

interface WeeklyCardItem {
  dayName: string;
  dayShort: string;
  dayIndex: number;
  title: string;
  subtitle: string;
  image: string;
  colors: [string, string, string];
  paletteName: string;
}

const WEEKLY_CARDS: WeeklyCardItem[] = [
  {
    dayName: "MONDAY",
    dayShort: "Mon",
    dayIndex: 1,
    title: "Moon",
    subtitle: "Chandra",
    image: "/weekly-palette/moon.png",
    colors: ["#F0EFEB", "#A8B0B8", "#1E2228"],
    paletteName: "Lunar Pearl",
  },
  {
    dayName: "TUESDAY",
    dayShort: "Tue",
    dayIndex: 2,
    title: "Mars",
    subtitle: "Mangal",
    image: "/weekly-palette/mars.jpg",
    colors: ["#8D3A2B", "#C25736", "#DE7E5D"],
    paletteName: "Rust Red",
  },
  {
    dayName: "WEDNESDAY",
    dayShort: "Wed",
    dayIndex: 3,
    title: "Mercury",
    subtitle: "Budh",
    image: "/weekly-palette/mercury.jpg",
    colors: ["#2C3238", "#4F5862", "#8A94A0"],
    paletteName: "Charcoal Slate",
  },
  {
    dayName: "THURSDAY",
    dayShort: "Thu",
    dayIndex: 4,
    title: "Jupiter",
    subtitle: "Brihaspati",
    image: "/weekly-palette/jupiter.jpg",
    colors: ["#8C6534", "#C29864", "#E2C79E"],
    paletteName: "Warm Tan",
  },
  {
    dayName: "FRIDAY",
    dayShort: "Fri",
    dayIndex: 5,
    title: "Venus",
    subtitle: "Shukra",
    image: "/weekly-palette/venus.jpg",
    colors: ["#CBB39C", "#E8DDD0", "#FAF7F0"],
    paletteName: "Cream & Ivory",
  },
  {
    dayName: "SATURDAY",
    dayShort: "Sat",
    dayIndex: 6,
    title: "Saturn",
    subtitle: "Shani",
    image: "/weekly-palette/saturn.jpg",
    colors: ["#141416", "#27272A", "#52525B"],
    paletteName: "Matte Black",
  },
  {
    dayName: "SUNDAY",
    dayShort: "Sun",
    dayIndex: 0,
    title: "Sun",
    subtitle: "Surya",
    image: "/weekly-palette/sun.png",
    colors: ["#E5A93C", "#C98224", "#FAF6EE"],
    paletteName: "Solar Gold",
  },
];

export default function WeeklyPalette({
  selectedDay,
  todayIndex = -1,
  onDaySelect,
}: WeeklyPaletteProps) {
  return (
    <section
      id="weekly-palette"
      className="relative z-10 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs tracking-[0.25em] uppercase text-accent-gold mb-3 font-medium font-mono">
            Seven Days · Seven Planetary Alignments
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white font-light">
            Weekly Planet Palette
          </h2>
          <p className="mt-3 text-sm text-white/50 max-w-md mx-auto font-light">
            Select any day to preview its cosmic tone, tailored silhouette, and men&apos;s styling guide.
          </p>
        </div>

        {/* 7-Day Celestial Cards Grid (Matching Screenshot) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-3.5 lg:gap-3">
          {WEEKLY_CARDS.map((item) => {
            const isToday = item.dayIndex === todayIndex;
            const isSelected = selectedDay
              ? item.dayIndex === selectedDay.index
              : isToday;

            return (
              <a
                key={item.dayName}
                href="#todays-look"
                onClick={(e) => {
                  const dayData = DAYS.find((d) => d.index === item.dayIndex);
                  if (dayData && onDaySelect) {
                    onDaySelect(dayData);
                  }
                }}
                className={`group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "bg-[#0C101B] border-2 border-white ring-1 ring-white/30 shadow-2xl shadow-black scale-[1.02]"
                    : "bg-[#0C101B] border border-white/10 hover:border-white/25 hover:scale-[1.02] shadow-xl shadow-black/60"
                }`}
              >
                {/* Floating "TODAY" badge (Top Right, matching screenshot) */}
                {isToday && (
                  <span className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full bg-white text-black text-[9px] font-bold tracking-wider uppercase shadow-md shadow-black/50">
                    TODAY
                  </span>
                )}

                {/* Celestial Image Area */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/50">
                  <Image
                    src={item.image}
                    alt={`${item.title} celestial view`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Seamless Bottom Gradient Fade into Card Body */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C101B] via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card Content Details */}
                <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Day Name */}
                    <p className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-stone-400 font-semibold mb-1">
                      {item.dayName}
                    </p>

                    {/* Planet / Theme Title */}
                    <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                      {item.title}
                    </h3>

                    {/* Vedic / Subtitle */}
                    <p className="text-[11px] text-stone-400 font-light mb-3">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* 3 Color Pills & Palette Label */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      {item.colors.map((color, cIdx) => (
                        <span
                          key={cIdx}
                          className="h-1.5 flex-1 rounded-full shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    <p className="text-[11px] text-stone-400 font-light truncate">
                      {item.paletteName}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
