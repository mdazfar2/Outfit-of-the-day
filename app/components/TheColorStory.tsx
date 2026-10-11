"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Copy, 
  Compass,
  Layers,
  ZoomIn
} from "lucide-react";
import { DAYS, type DayData } from "@/app/data/days";

interface Swatch {
  name: string;
  hex: string;
  fabric: string;
  role: string;
}

interface ColorStoryData {
  dayIndex: number;
  day: string;
  planet: string;
  tagline: string;
  energy: string;
  planetImage: string;
  clothingImage: string;
  quote: string;
  swatches: Swatch[];
}

const COLOR_STORIES: ColorStoryData[] = [
  {
    dayIndex: 0,
    day: "Sunday",
    planet: "Sun",
    tagline: "Solar Radiance · Amber Vitality",
    energy: "Radiant Presence · Magnetism",
    planetImage: "/color-story/planets-images/sunday-sun.png",
    clothingImage: "/color-story/sunday.png",
    quote: "Radiant solar gold brings confident warmth and magnetic poise. Anchor with natural linen neutrals.",
    swatches: [
      { name: "Solar Gold", hex: "#E5A93C", fabric: "100% French Slub Linen", role: "Primary Accent" },
      { name: "Amber Ochre", hex: "#C98224", fabric: "Garment-Dyed Cotton", role: "Midtone Depth" },
      { name: "Warm Sand", hex: "#D4B996", fabric: "Pleated Linen Chino", role: "Linen Base" },
      { name: "Ivory Mist", hex: "#FAF6EE", fabric: "Calfskin Minimal Sneaker", role: "Crisp Neutral" },
    ],
  },
  {
    dayIndex: 1,
    day: "Monday",
    planet: "Moon",
    tagline: "Lunar Serenity · Architectural Poise",
    energy: "Pure Clarity · Understated Calm",
    planetImage: "/color-story/planets-images/monday-moon.png",
    clothingImage: "/color-story/monday.png",
    quote: "Luminous cool neutrals channel architectural clarity and understated serenity for beginning the week.",
    swatches: [
      { name: "Lunar Pearl", hex: "#F0EFEB", fabric: "Poplin Oxford Cotton", role: "Primary Accent" },
      { name: "Heather Grey", hex: "#A8B0B8", fabric: "Brushed Wool Harrington", role: "Outerwear Tone" },
      { name: "Charcoal Slate", hex: "#3F474F", fabric: "Tailored Flannel Trouser", role: "Tailored Base" },
      { name: "Deep Eclipse", hex: "#1E2228", fabric: "Matte Leather Field Watch", role: "Shadow Ground" },
    ],
  },
  {
    dayIndex: 2,
    day: "Tuesday",
    planet: "Mars",
    tagline: "Martian Drive · Earthy Fire",
    energy: "Decisive Action · Raw Confidence",
    planetImage: "/color-story/planets-images/tuesday-mars.png",
    clothingImage: "/color-story/tuesday-look.png",
    quote: "Rust and earthy warm tones are bold yet deeply wearable. Anchor with neutrals.",
    swatches: [
      { name: "Rust", hex: "#993D2C", fabric: "Camp Collar Cotton Shirt", role: "Primary Accent" },
      { name: "Terracotta", hex: "#C25736", fabric: "Desert Harrington Jacket", role: "Warm Layer" },
      { name: "Clay", hex: "#D67C52", fabric: "Mineral Washed Suede", role: "Desert Ochre" },
      { name: "Sand", hex: "#C8A27A", fabric: "Textured Pleated Chino", role: "Jacket Neutral" },
    ],
  },
  {
    dayIndex: 3,
    day: "Wednesday",
    planet: "Mercury",
    tagline: "Mercurial Intellect · Fluid Agility",
    energy: "Strategic Focus · Adaptive Movement",
    planetImage: "/color-story/planets-images/wednesday-mercury.png",
    clothingImage: "/color-story/wednesday.png",
    quote: "Sharp urban minerals evoke quick wit and fluid movement. Layer textured outerwear over crisp tones.",
    swatches: [
      { name: "Graphite", hex: "#4B525A", fabric: "14oz Faded Skate Denim", role: "Primary Denim" },
      { name: "Mineral Grey", hex: "#6B7280", fabric: "Wool-Blend Varsity Jacket", role: "Varsity Body" },
      { name: "Cool Ash", hex: "#9CA3AF", fabric: "Heavyweight Combed Tee", role: "Heather Knit" },
      { name: "Chalk White", hex: "#F3F4F6", fabric: "Leather Court Trainer", role: "Essential Base" },
    ],
  },
  {
    dayIndex: 4,
    day: "Thursday",
    planet: "Jupiter",
    tagline: "Jovian Expanse · Suede Warmth",
    energy: "Timeless Prestige · Expansive Luxury",
    planetImage: "/color-story/planets-images/thursday-jupyter.png",
    clothingImage: "/color-story/thrusday.png",
    quote: "Rich caramel suede and expansive earth tones command timeless luxury and generous warmth.",
    swatches: [
      { name: "Warm Tan", hex: "#C29864", fabric: "Italian Suede Blouson", role: "Suede Jacket" },
      { name: "Cognac Suede", hex: "#9A5B2D", fabric: "Fine Cashmere Knit Polo", role: "Knit Base" },
      { name: "Rich Espresso", hex: "#3D2619", fabric: "Double-Pleated Wool Pant", role: "Tailored Trousers" },
      { name: "Vanilla Foam", hex: "#F7EFE1", fabric: "Leather Horsebit Loafer", role: "Collar Highlight" },
    ],
  },
  {
    dayIndex: 5,
    day: "Friday",
    planet: "Venus",
    tagline: "Venusian Grace · Tactile Beauty",
    energy: "Effortless Charm · Relaxed Elegance",
    planetImage: "/color-story/planets-images/friday-venus.png",
    clothingImage: "/color-story/friday.png",
    quote: "Creamy neutrals create a soft, elegant palette that photographs beautifully.",
    swatches: [
      { name: "Warm Nude", hex: "#CBB39C", fabric: "Open Slub Linen Shirt", role: "Linen Overshirt" },
      { name: "Ivory", hex: "#E8DDD0", fabric: "Relaxed Supima Cotton Tee", role: "Relaxed Base" },
      { name: "Cream", hex: "#F6EFE3", fabric: "Wide-Leg Linen Trousers", role: "Wide Linen Pant" },
      { name: "Pearl", hex: "#FAF7F0", fabric: "Gum Sole Leather Sneaker", role: "Casual Footwear" },
    ],
  },
  {
    dayIndex: 6,
    day: "Saturday",
    planet: "Saturn",
    tagline: "Saturnian Power · Obsidian Depth",
    energy: "Absolute Authority · Evening Mystery",
    planetImage: "/color-story/planets-images/Saturday-Saturn.png",
    clothingImage: "/color-story/saturday.png",
    quote: "Structured darks embody absolute authority and evening mystery. Punctuate with tactile textured layering.",
    swatches: [
      { name: "Matte Black", hex: "#141416", fabric: "Mercerized Black Knit Polo", role: "Obsidian Base" },
      { name: "Smoked Onyx", hex: "#27272A", fabric: "Waxed Cotton City Jacket", role: "Washed Outerwear" },
      { name: "Weathered Slate", hex: "#52525B", fabric: "Selvedge Charcoal Denim", role: "Relaxed Denim" },
      { name: "Sunset Amber", hex: "#A16207", fabric: "Horology Bronze Bezel", role: "Metallic Accent" },
    ],
  },
];

interface TheColorStoryProps {
  onDaySelect?: (day: DayData) => void;
  selectedDay?: DayData;
  todayIndex?: number;
}

export default function TheColorStory({
  onDaySelect,
  selectedDay,
  todayIndex = -1,
}: TheColorStoryProps) {
  // Initialize with selectedDay's index, or todayIndex, or default to current day
  const initialIndex = selectedDay ? selectedDay.index : (todayIndex !== -1 ? todayIndex : 6);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [prevSelectedDayIndex, setPrevSelectedDayIndex] = useState(selectedDay?.index);
  const [selectedSwatchIndex, setSelectedSwatchIndex] = useState(0);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [isFading, setIsFading] = useState(false);
  const [isTextureModalOpen, setIsTextureModalOpen] = useState(false);

  // Adjust state during render when selectedDay changes externally (React recommended pattern)
  if (selectedDay && selectedDay.index !== prevSelectedDayIndex) {
    setPrevSelectedDayIndex(selectedDay.index);
    setCurrentIndex(selectedDay.index);
    setSelectedSwatchIndex(0);
  }

  const activeStory = COLOR_STORIES[currentIndex] || COLOR_STORIES[0];
  const activeSwatch = activeStory.swatches[selectedSwatchIndex] || activeStory.swatches[0];

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      const nextIndex = (currentIndex + 1) % COLOR_STORIES.length;
      setCurrentIndex(nextIndex);
      setSelectedSwatchIndex(0);
      setIsFading(false);
      if (onDaySelect) {
        const matchingDay = DAYS.find((d) => d.index === nextIndex);
        if (matchingDay) onDaySelect(matchingDay);
      }
    }, 220);
  };

  const handlePrev = () => {
    setIsFading(true);
    setTimeout(() => {
      const prevIndex = (currentIndex - 1 + COLOR_STORIES.length) % COLOR_STORIES.length;
      setCurrentIndex(prevIndex);
      setSelectedSwatchIndex(0);
      setIsFading(false);
      if (onDaySelect) {
        const matchingDay = DAYS.find((d) => d.index === prevIndex);
        if (matchingDay) onDaySelect(matchingDay);
      }
    }, 220);
  };

  const handleSelectStory = (index: number) => {
    if (index === currentIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setSelectedSwatchIndex(0);
      setIsFading(false);
      if (onDaySelect) {
        const matchingDay = DAYS.find((d) => d.index === index);
        if (matchingDay) onDaySelect(matchingDay);
      }
    }, 220);
  };

  const handleCopyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  // Close modal with Escape key and lock scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsTextureModalOpen(false);
      }
    };

    if (isTextureModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isTextureModalOpen]);

  return (
    <section id="color-story" className="relative z-10 py-24 sm:py-36 scroll-mt-20 overflow-hidden">
      {/* Dynamic Ambient Background Glow tuned to active planet */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-25 pointer-events-none transition-all duration-1000 ease-out"
        style={{ backgroundColor: activeStory.swatches[0].hex }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6 border-b border-white/[0.08] pb-6">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-white font-light">
              The Color Story
            </h2>
            <p className="mt-2 text-sm text-stone-400 font-light max-w-xl">
              Where raw astronomical textures translate into quiet-luxury tailoring, 
              organic textiles, and calibrated menswear palettes.
            </p>
          </div>

          {/* Previous / Next Arrow Controls */}
          <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/10 rounded-full p-1 self-start md:self-auto">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Previous day"
            >
              <ArrowLeft size={14} />
            </button>
            <span className="text-xs font-mono text-stone-400 px-2.5">
              0{currentIndex + 1} / 07
            </span>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Next day"
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* ========================================================
            TOP PLANETARY DOCK (7 DAYS STRIP)
            ======================================================== */}
        <div className="mb-10 sm:mb-12">
          <div className="p-2 sm:p-2.5 bg-[#0A0D15]/90 border border-white/10 rounded-2xl sm:rounded-full backdrop-blur-xl shadow-2xl max-w-4xl mx-auto">
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {COLOR_STORIES.map((story, sIdx) => {
                const isActive = sIdx === currentIndex;

                return (
                  <button
                    key={story.day}
                    onClick={() => handleSelectStory(sIdx)}
                    className={`group relative flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 py-2.5 sm:py-2 px-1 sm:px-3.5 rounded-xl sm:rounded-full transition-all duration-300 cursor-pointer border ${
                      isActive
                        ? "bg-[#1B202E] border-white/20 text-white shadow-lg shadow-black/60 font-medium ring-1 ring-white/10"
                        : "border-transparent hover:bg-white/[0.04] text-stone-400 hover:text-white"
                    }`}
                  >
                    {/* Small color dot */}
                    <span 
                      className={`w-2.5 h-2.5 rounded-full border transition-transform duration-300 ${
                        isActive 
                          ? "scale-110 border-white/40 shadow-sm" 
                          : "border-white/20 group-hover:scale-110"
                      }`}
                      style={{ backgroundColor: story.swatches[0].hex }}
                    />

                    {/* Day Abbreviation */}
                    <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-white">
                      {story.day.slice(0, 3)}
                    </span>

                    {/* Planet Sub-label on Desktop */}
                    <span className={`hidden md:inline text-[10px] font-sans transition-colors ${isActive ? "text-stone-300 font-normal" : "text-stone-500"}`}>
                      {story.planet}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================
            THE MAIN CINEMATIC LUXURY STAGE
            ======================================================== */}
        <div className={`transition-all duration-300 ease-out ${isFading ? "opacity-30 scale-[0.99] blur-[2px]" : "opacity-100 scale-100 blur-0"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center bg-[#090C14]/80 border border-white/[0.08] rounded-3xl p-5 sm:p-8 lg:p-10 backdrop-blur-2xl shadow-2xl shadow-black/90 relative overflow-hidden">
            
            {/* Ambient Corner Accent */}
            <div 
              className="absolute -top-32 -left-32 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none"
              style={{ backgroundColor: activeStory.swatches[0].hex }}
            />

            {/* ----------------------------------------------------
                COLUMN 1: THE CELESTIAL ORB (4 Cols)
                ---------------------------------------------------- */}
            <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Compass size={14} className="text-accent-gold" />
                  <span className="text-xs font-mono tracking-[0.25em] uppercase text-accent-gold/90">
                    Day Ruler &bull; 0{currentIndex + 1}
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-light tracking-wide">
                  {activeStory.planet}
                </h3>
                
                <p className="text-xs sm:text-sm text-stone-400 mt-1.5 font-light">
                  {activeStory.tagline}
                </p>
                <div className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-stone-300">
                  Resonance: {activeStory.energy}
                </div>
              </div>

              {/* Floating Planet Sphere Showcase */}
              <div className="relative aspect-square w-full max-w-[320px] mx-auto my-6 lg:my-8 overflow-hidden rounded-2xl bg-gradient-to-b from-[#111624] to-[#06080E] border border-white/10 shadow-2xl group">
                <Image
                  src={activeStory.planetImage}
                  alt={`${activeStory.planet} Orb`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-stone-300 px-1">
                  <span className="uppercase tracking-widest text-accent-gold">
                    {activeStory.planet} Orbit
                  </span>
                  <span className="text-stone-400">
                    {activeStory.day}
                  </span>
                </div>
              </div>

              {/* Pullquote */}
              <blockquote className="italic text-xs sm:text-sm text-stone-300/90 font-serif leading-relaxed border-l-2 border-accent-gold/50 pl-3.5 py-0.5">
                &ldquo;{activeStory.quote}&rdquo;
              </blockquote>
            </div>

            {/* ----------------------------------------------------
                COLUMN 2: FULL-BODY EDITORIAL MODEL PORTRAIT (4 Cols)
                Clean & Uncluttered — Head, Face, Clothes & Shoes 100% Clear
                ---------------------------------------------------- */}
            <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center">
              <div className="relative w-full aspect-[2/3] max-w-[380px] lg:max-w-[420px] overflow-hidden rounded-3xl bg-[#070910] border border-white/15 shadow-2xl shadow-black group">
                <Image
                  src={activeStory.clothingImage}
                  alt={`${activeStory.day} Full Look`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                />

                {/* Subtle top corner pill */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-stone-200">
                  {activeStory.day} &bull; Editorial
                </div>
              </div>
            </div>

            {/* ----------------------------------------------------
                COLUMN 3: PALETTE & FABRIC INSPECTOR (4 Cols)
                ---------------------------------------------------- */}
            <div className="lg:col-span-4 order-3 lg:order-3 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Layers size={14} className="text-accent-gold" />
                    <span className="text-xs font-mono tracking-wider uppercase text-stone-300">
                      Color Resonance Palette
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500">
                    4 Calibrated Tones
                  </span>
                </div>

                {/* Swatches Interactive List */}
                <div className="space-y-3">
                  {activeStory.swatches.map((swatch, sIdx) => {
                    const isSelected = sIdx === selectedSwatchIndex;
                    const isCopied = copiedHex === swatch.hex;

                    return (
                      <div
                        key={swatch.name}
                        onClick={() => setSelectedSwatchIndex(sIdx)}
                        className={`group p-3 rounded-2xl transition-all duration-300 cursor-pointer border ${
                          isSelected
                            ? "bg-white/[0.08] border-accent-gold/50 shadow-lg shadow-black/40"
                            : "bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.06]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {/* Swatch circle */}
                            <span
                              className={`w-7 h-7 rounded-full border border-white/20 shadow-md flex-shrink-0 transition-transform duration-300 ${
                                isSelected ? "scale-110 ring-2 ring-accent-gold/40" : "group-hover:scale-105"
                              }`}
                              style={{ backgroundColor: swatch.hex }}
                            />
                            <div>
                              <p className="text-sm font-medium text-stone-200 group-hover:text-white">
                                {swatch.name}
                              </p>
                              <p className="text-[11px] text-stone-400 font-light">
                                {swatch.role}
                              </p>
                            </div>
                          </div>

                          {/* Hex Button / Copy */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyHex(swatch.hex);
                            }}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 hover:bg-white/10 border border-white/10 text-xs font-mono text-stone-300 transition-colors"
                            title="Copy Hex"
                          >
                            <span>{swatch.hex}</span>
                            {isCopied ? (
                              <Check size={11} className="text-emerald-400" />
                            ) : (
                              <Copy size={11} className="text-stone-400" />
                            )}
                          </button>
                        </div>

                        {/* Expanded details when selected */}
                        {isSelected && (
                          <div className="mt-2.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
                            <span className="font-sans">Textile / Weave:</span>
                            <span className="text-stone-200 font-medium font-sans">{swatch.fabric}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Swatch Magnifier Banner (Matching Screenshot 1) */}
              <div 
                className="p-4 rounded-2xl border border-white/10 flex items-center justify-between backdrop-blur-md"
                style={{
                  background: `linear-gradient(135deg, ${activeSwatch.hex}22 0%, rgba(9, 12, 20, 0.9) 100%)`
                }}
              >
                <div className="flex items-center gap-3">
                  {/* Clickable Left Side Color Swatch -> Opens Modal */}
                  <button
                    type="button"
                    onClick={() => setIsTextureModalOpen(true)}
                    className="group/swatchbtn relative w-10 h-10 rounded-xl border border-white/25 shadow-inner cursor-pointer transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-accent-gold/60 focus:outline-none flex-shrink-0"
                    style={{ backgroundColor: activeSwatch.hex }}
                    title="Click to view full fabric texture weave"
                    aria-label={`View ${activeSwatch.name} fabric texture`}
                  >
                    <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/35 opacity-0 group-hover/swatchbtn:opacity-100 transition-opacity">
                      <ZoomIn size={14} className="text-white drop-shadow" />
                    </span>
                  </button>

                  <div>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-accent-gold">Selected Focus</p>
                    <p className="text-sm font-semibold text-white">{activeSwatch.name}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-stone-300 block">{activeSwatch.hex}</span>
                  <span className="text-[11px] text-stone-400 font-light">{activeSwatch.role}</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Pure Color Swatch Modal Popup — Zero extra text, pure rich color, closes instantly on any click */}
      {isTextureModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md cursor-pointer animate-in fade-in duration-100"
          onClick={() => setIsTextureModalOpen(false)}
        >
          <div 
            className="relative aspect-square w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-black animate-in zoom-in-95 duration-100 cursor-pointer select-none"
            style={{ backgroundColor: activeSwatch.hex }}
            onClick={() => setIsTextureModalOpen(false)}
          >
            {/* Subtle luxury lighting gradient */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0.25) 100%)"
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
