"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const isMobile = useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia("(max-width: 768px)");
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia("(max-width: 768px)").matches,
    () => false
  );

  const videoSrc = isMobile ? "/hero-mobile.mp4" : "/hero.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [videoSrc]);

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Primary Semantic H1 for Google Search Indexing */}
      <h1 className="sr-only">
        OOTD by Azfar — Daily Luxury Men&apos;s Outfit &amp; Celestial Style Guide
      </h1>

      {/* Full bleed edge-to-edge cinematic video with responsive mobile support */}
      <video
        key={videoSrc}
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        onEnded={(e) => {
          // Pause on final frame without restarting
          e.currentTarget.pause();
        }}
      >
        <source
          src="/hero-mobile.mp4"
          media="(max-width: 768px)"
          type="video/mp4"
        />
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Minimal clean scroll indicator without any background blur or fog */}
      <a
        href="#todays-look"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/80 hover:text-white transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        aria-label="Scroll to Today's Look"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase font-light text-white/70 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
          Scroll to explore
        </span>
        <ChevronDown
          size={16}
          className="animate-bounce text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
        />
      </a>
    </section>
  );
}
