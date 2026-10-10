"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import TodaysLook from "@/app/components/TodaysLook";
import WeeklyPalette from "@/app/components/WeeklyPalette";
import TheColorStory from "@/app/components/TheColorStory";
import SolarSystem3D from "@/app/components/SolarSystem3D";
import { DAYS, type DayData } from "@/app/data/days";

export default function DayContent() {
  // Safe client day index subscription with stable SSR snapshot
  const todayIndex = useSyncExternalStore(
    () => () => {},
    () => new Date().getDay(),
    () => 6
  );

  const [userSelectedDay, setUserSelectedDay] = useState<DayData | null>(null);
  const selectedDay = userSelectedDay ?? (DAYS[todayIndex] || DAYS[6]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleDayChange = useCallback(
    (day: DayData) => {
      if (day.index === selectedDay.index) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setUserSelectedDay(day);
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
        todayIndex={todayIndex}
      />

      <SolarSystem3D onSelectDay={handleSelectDayIndex} />
    </>
  );
}
