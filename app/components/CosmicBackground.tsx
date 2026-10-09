"use client";

import { useEffect, useState } from "react";

export default function CosmicBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Deep Obsidian Radial Background Base */}
      <div className="absolute inset-0 bg-[#07080C]" />

      {/* Layer 1: Parallax Ambient Nebulae Glows */}
      <div
        className="absolute top-1/4 -right-1/4 w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(229,169,60,0.09)_0%,transparent_70%)] blur-3xl transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(0, ${scrollY * -0.12}px, 0)`,
        }}
      />
      <div
        className="absolute top-2/3 -left-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(200,82,63,0.06)_0%,transparent_70%)] blur-3xl transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(0, ${scrollY * -0.2}px, 0)`,
        }}
      />
      <div
        className="absolute top-[120%] right-10 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(100,116,139,0.07)_0%,transparent_70%)] blur-3xl transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(0, ${scrollY * -0.28}px, 0)`,
        }}
      />

      {/* Layer 2: Dynamic Parallax Golden Ribbon Waves (Matching Screenshot 1) */}
      <div
        className="absolute inset-0 w-full h-[150%] transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(0, ${scrollY * -0.25}px, 0)`,
        }}
      >
        <svg
          className="w-full h-full opacity-70 mix-blend-screen"
          preserveAspectRatio="none"
          viewBox="0 0 1440 1200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldRibbon1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E1204" stopOpacity="0" />
              <stop offset="25%" stopColor="#D48B28" stopOpacity="0.4" />
              <stop offset="55%" stopColor="#F5C065" stopOpacity="0.95" />
              <stop offset="85%" stopColor="#FAD79A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1E1204" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="goldRibbon2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1A0F02" stopOpacity="0" />
              <stop offset="35%" stopColor="#C97B1A" stopOpacity="0.35" />
              <stop offset="65%" stopColor="#EDB050" stopOpacity="0.85" />
              <stop offset="90%" stopColor="#FCE4B8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#1A0F02" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="ribbonFill1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D48B28" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#07080C" stopOpacity="0" />
            </linearGradient>

            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="14" result="blur1" />
              <feGaussianBlur stdDeviation="4" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="28" />
            </filter>
          </defs>

          {/* Ambient luminous glow paths */}
          <path
            d="M-100,580 Q320,840 850,560 T1600,200"
            stroke="url(#goldRibbon1)"
            strokeWidth="70"
            filter="url(#softGlow)"
            opacity="0.35"
          />
          <path
            d="M-100,820 Q420,980 980,720 T1600,340"
            stroke="url(#goldRibbon2)"
            strokeWidth="75"
            filter="url(#softGlow)"
            opacity="0.3"
          />

          {/* Ribbon Shading field */}
          <path
            d="M-100,580 Q320,840 850,560 T1600,200 L1600,1200 L-100,1200 Z"
            fill="url(#ribbonFill1)"
            opacity="0.25"
          />

          {/* Primary Golden Upper Light Wave */}
          <path
            d="M-100,580 Q320,840 850,560 T1600,200"
            stroke="url(#goldRibbon1)"
            strokeWidth="4.5"
            filter="url(#goldGlow)"
          />

          {/* Secondary Golden Lower Light Wave */}
          <path
            d="M-100,820 Q420,980 980,720 T1600,340"
            stroke="url(#goldRibbon2)"
            strokeWidth="3.5"
            filter="url(#goldGlow)"
          />

          {/* Tertiary Deep Cosmic Wave */}
          <path
            d="M-100,1050 Q500,1180 1100,950 T1600,600"
            stroke="url(#goldRibbon1)"
            strokeWidth="2.5"
            filter="url(#goldGlow)"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Layer 3: Multi-depth Stardust Field (Parallax Star Dust) */}
      <div
        className="absolute inset-0 w-full h-[160%] transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(0, ${scrollY * -0.4}px, 0)`,
        }}
      >
        <svg
          className="w-full h-full mix-blend-screen"
          viewBox="0 0 1440 1400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {[
            { cx: 720, cy: 380, r: 1.6, o: 0.85 },
            { cx: 840, cy: 320, r: 1.2, o: 0.6 },
            { cx: 620, cy: 450, r: 1.0, o: 0.5 },
            { cx: 910, cy: 260, r: 2.0, o: 0.95 },
            { cx: 980, cy: 210, r: 1.4, o: 0.7 },
            { cx: 1080, cy: 150, r: 2.2, o: 0.9 },
            { cx: 500, cy: 520, r: 1.1, o: 0.45 },
            { cx: 410, cy: 580, r: 1.5, o: 0.65 },
            { cx: 780, cy: 410, r: 1.3, o: 0.8 },
            { cx: 860, cy: 460, r: 1.0, o: 0.5 },
            { cx: 1140, cy: 230, r: 1.8, o: 0.75 },
            { cx: 1220, cy: 190, r: 1.2, o: 0.5 },
            { cx: 670, cy: 300, r: 1.7, o: 0.7 },
            { cx: 760, cy: 240, r: 1.2, o: 0.55 },
            { cx: 300, cy: 750, r: 1.6, o: 0.7 },
            { cx: 450, cy: 820, r: 1.2, o: 0.5 },
            { cx: 600, cy: 910, r: 2.1, o: 0.9 },
            { cx: 820, cy: 880, r: 1.4, o: 0.65 },
            { cx: 1000, cy: 950, r: 1.7, o: 0.8 },
            { cx: 1200, cy: 870, r: 1.3, o: 0.6 },
            { cx: 200, cy: 1100, r: 1.5, o: 0.65 },
            { cx: 550, cy: 1180, r: 1.8, o: 0.85 },
            { cx: 880, cy: 1220, r: 2.0, o: 0.9 },
            { cx: 1150, cy: 1140, r: 1.4, o: 0.7 },
          ].map((star, i) => (
            <circle
              key={i}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="#FFE8BA"
              opacity={star.o}
              filter="drop-shadow(0 0 4px #F5C065)"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
