"use client";

import { useState, useEffect, useCallback } from "react";
import TodaysLook from "@/app/components/TodaysLook";
import WeeklyPalette from "@/app/components/WeeklyPalette";
import SolarSystem3D from "@/app/components/SolarSystem3D";
import { DAYS, getTodayIndex, type DayData } from "@/app/data/days";

function SectionDivider() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 my-6 sm:my-8" aria-hidden="true">
      <div className="relative flex items-center justify-center">
        {/* Ambient luminous glow layer */}
        <div className="absolute w-3/4 h-[2px] bg-gradient-to-r from-transparent via-accent-gold/35 to-transparent blur-[2px]" />

        {/* Main crisp divider line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 via-accent-gold/45 to-transparent" />

        {/* Elegant Center Celestial Diamond Accent */}
        <div className="absolute flex items-center justify-center">
          <div className="w-12 h-[1px] bg-accent-gold/60" />
          <div className="w-2.5 h-2.5 rotate-45 border border-accent-gold bg-[#07080C] shadow-md shadow-accent-gold/50" />
        </div>
      </div>
    </div>
  );
}

export default function DayContent() {
  const [selectedDay, setSelectedDay] = useState<DayData>(DAYS[6]); // Saturday default
  const [todayIndex, setTodayIndex] = useState<number>(6);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const currentToday = getTodayIndex();
    setTodayIndex(currentToday);
    setSelectedDay(DAYS[currentToday]);
  }, []);

  const handleDayChange = useCallback(
    (day: DayData) => {
      if (day.index === selectedDay.index) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setSelectedDay(day);
        setIsTransitioning(false);
      }, 250);
    },
    [selectedDay.index]
  );

  const handleSelectDayIndex = useCallback(
    (dayIndex: number) => {
      if (DAYS[dayIndex]) {
        handleDayChange(DAYS[dayIndex]);
      }
    },
    [handleDayChange]
  );

  return (
    <>
      <TodaysLook
        selectedDay={selectedDay}
        todayIndex={todayIndex}
        isTransitioning={isTransitioning}
        onDayChange={handleDayChange}
      />

      {/* Subtle section divider between Today's Look and Weekly Palette */}
      <SectionDivider />

      <WeeklyPalette
        selectedDay={selectedDay}
        todayIndex={todayIndex}
        onDaySelect={handleDayChange}
      />

      {/* Subtle section divider between Weekly Palette and 3D Solar System */}
      <SectionDivider />

      <SolarSystem3D onSelectDay={handleSelectDayIndex} />
    </>
  );
}
