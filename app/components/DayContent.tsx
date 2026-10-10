"use client";

import { useState, useEffect, useCallback } from "react";
import TodaysLook from "@/app/components/TodaysLook";
import WeeklyPalette from "@/app/components/WeeklyPalette";
import TheColorStory from "@/app/components/TheColorStory";
import SolarSystem3D from "@/app/components/SolarSystem3D";
import { DAYS, getTodayIndex, type DayData } from "@/app/data/days";

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

      <WeeklyPalette
        selectedDay={selectedDay}
        todayIndex={todayIndex}
        onDaySelect={handleDayChange}
      />

      <TheColorStory
        onDaySelect={handleDayChange}
        selectedDay={selectedDay}
      />

      <SolarSystem3D onSelectDay={handleSelectDayIndex} />
    </>
  );
}
