"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const exitTimer = setTimeout(() => {
        setShouldRender(false);
      }, 700);
      return () => clearTimeout(exitTimer);
    }
  }, [loading]);

  if (!shouldRender) return null;

  return (
    <div
      aria-hidden={!loading}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07080C] transition-all duration-700 ease-out select-none ${
        loading
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none scale-[1.03]"
      }`}
    >
      {/* Scoped CSS from Uiverse.io by andrew-manzyk */}
      <style>{`
        .uiverse-container {
          --color-one: #ffbf48;
          --color-two: #be4a1d;
          --color-three: #ffbf4780;
          --color-four: #bf4a1d80;
          --color-five: #ffbf4740;
          --time-animation: 2s;
          --size: 1.35;
          position: relative;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          transform: scale(var(--size));
          box-shadow:
            0 0 25px 0 var(--color-three),
            0 20px 50px 0 var(--color-four);
          animation: uiverse-colorize calc(var(--time-animation) * 3) ease-in-out infinite;
        }

        .uiverse-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border-top: solid 1px var(--color-one);
          border-bottom: solid 1px var(--color-two);
          background: linear-gradient(180deg, var(--color-five), var(--color-four));
          box-shadow:
            inset 0 10px 10px 0 var(--color-three),
            inset 0 -10px 10px 0 var(--color-four);
          pointer-events: none;
          z-index: 2;
        }

        .uiverse-container .uiverse-box {
          position: absolute;
          top: 0;
          left: 0;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          background: linear-gradient(
            180deg,
            var(--color-one) 30%,
            var(--color-two) 70%
          );
          -webkit-mask: url(#clipping);
          mask: url(#clipping);
        }

        .uiverse-container svg {
          position: absolute;
          width: 0;
          height: 0;
          pointer-events: none;
        }

        .uiverse-container svg #clipping {
          filter: contrast(15);
          animation: uiverse-roundness calc(var(--time-animation) / 2) linear infinite;
        }

        .uiverse-container svg #clipping polygon {
          filter: blur(7px);
        }

        .uiverse-container svg #clipping polygon:nth-child(1) {
          transform-origin: 75% 25%;
          transform: rotate(90deg);
        }

        .uiverse-container svg #clipping polygon:nth-child(2) {
          transform-origin: 50% 50%;
          animation: uiverse-rotation var(--time-animation) linear infinite reverse;
        }

        .uiverse-container svg #clipping polygon:nth-child(3) {
          transform-origin: 50% 60%;
          animation: uiverse-rotation var(--time-animation) linear infinite;
          animation-delay: calc(var(--time-animation) / -3);
        }

        .uiverse-container svg #clipping polygon:nth-child(4) {
          transform-origin: 40% 40%;
          animation: uiverse-rotation var(--time-animation) linear infinite reverse;
        }

        .uiverse-container svg #clipping polygon:nth-child(5) {
          transform-origin: 40% 40%;
          animation: uiverse-rotation var(--time-animation) linear infinite reverse;
          animation-delay: calc(var(--time-animation) / -2);
        }

        .uiverse-container svg #clipping polygon:nth-child(6) {
          transform-origin: 60% 40%;
          animation: uiverse-rotation var(--time-animation) linear infinite;
        }

        .uiverse-container svg #clipping polygon:nth-child(7) {
          transform-origin: 60% 40%;
          animation: uiverse-rotation var(--time-animation) linear infinite;
          animation-delay: calc(var(--time-animation) / -1.5);
        }

        @keyframes uiverse-rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes uiverse-roundness {
          0% {
            filter: contrast(15);
          }
          20% {
            filter: contrast(3);
          }
          40% {
            filter: contrast(3);
          }
          60% {
            filter: contrast(15);
          }
          100% {
            filter: contrast(15);
          }
        }

        @keyframes uiverse-colorize {
          0% {
            filter: hue-rotate(0deg);
          }
          20% {
            filter: hue-rotate(-30deg);
          }
          40% {
            filter: hue-rotate(-60deg);
          }
          60% {
            filter: hue-rotate(-90deg);
          }
          80% {
            filter: hue-rotate(-45deg);
          }
          100% {
            filter: hue-rotate(0deg);
          }
        }
      `}</style>

      {/* Main Content */}
      <div className="relative flex flex-col items-center">
        {/* Lava Orb */}
        <div className="mb-12 flex items-center justify-center">
          <div className="uiverse-container">
            <svg viewBox="0 0 100 100">
              <defs>
                <mask id="clipping">
                  <polygon points="0,0 100,0 100,100 0,100" fill="black" />
                  <polygon points="25,25 75,25 50,75" fill="white" />
                  <polygon points="50,25 75,75 25,75" fill="white" />
                  <polygon points="35,35 65,35 50,65" fill="white" />
                  <polygon points="35,35 65,35 50,65" fill="white" />
                  <polygon points="35,35 65,35 50,65" fill="white" />
                  <polygon points="35,35 65,35 50,65" fill="white" />
                </mask>
              </defs>
            </svg>
            <div className="uiverse-box" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.35em] font-light text-white uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          OOTD
        </h1>

        {/* Editorial Subtitle */}
        <p className="mt-3 text-[10px] tracking-[0.28em] uppercase font-light text-white/50">
          Your Style, Written In The Stars
        </p>
      </div>
    </div>
  );
}