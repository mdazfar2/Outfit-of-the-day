export interface PlanetSolarData {
  id: string;
  name: string;
  glyph: string;
  orbitRadius: number;
  orbitSpeed: number; // relative angular speed
  rotationSpeed: number;
  size: number;
  tilt: number; // axial tilt in radians
  colorHex: string;
  weekday: string | null;
  dayIndex: number | null; // 0 (Sun) to 6 (Sat)
  ootdColor: string;
  ootdTheme: string;
  tagline: string;
  distanceFromSun: string;
  orbitalPeriod: string;
  diameter: string;
  astronomyFact: string;
  fashionInspiration: string;
  hasRings?: boolean;
}

export const SOLAR_BODIES: PlanetSolarData[] = [
  {
    id: "sun",
    name: "The Sun",
    glyph: "☉",
    orbitRadius: 0,
    orbitSpeed: 0,
    rotationSpeed: 0.003,
    size: 4.2,
    tilt: 0.12,
    colorHex: "#E5A93C",
    weekday: "Sunday",
    dayIndex: 0,
    ootdColor: "Solar Gold & Amber Glow",
    ootdTheme: "Heavyweight Mustard Gold Crewneck",
    tagline: "Harness the radiant life-giving power of solar gold.",
    distanceFromSun: "Center (0 AU)",
    orbitalPeriod: "Core of Solar System",
    diameter: "1,392,700 km",
    astronomyFact:
      "A G-type main-sequence yellow dwarf star containing 99.86% of the entire Solar System's mass, generating thermonuclear fusion at 15 million Kelvin.",
    fashionInspiration:
      "Solar gold and warm mustard bring magnetic warmth, authority, and optimism to Sunday styling. An anchor of masculine quiet luxury.",
  },
  {
    id: "mercury",
    name: "Mercury",
    glyph: "☿",
    orbitRadius: 10,
    orbitSpeed: 0.024,
    rotationSpeed: 0.005,
    size: 0.65,
    tilt: 0.035,
    colorHex: "#68737D",
    weekday: "Wednesday",
    dayIndex: 3,
    ootdColor: "Charcoal Slate & Mineral Grey",
    ootdTheme: "Garment-Dyed Charcoal Slate Tee",
    tagline: "Sharp intellect. Fluid movement.",
    distanceFromSun: "57.9M km (0.39 AU)",
    orbitalPeriod: "88 Earth Days",
    diameter: "4,879 km",
    astronomyFact:
      "The fastest planet in the Solar System, with dramatic surface temperature swings from 430°C on its sunlit side down to -180°C in deep shadow.",
    fashionInspiration:
      "Named after the messenger god of agility and intellect, Mercury inspires sharp, architectural charcoal slate and cool titanium tones for focused midweek precision.",
  },
  {
    id: "venus",
    name: "Venus",
    glyph: "♀",
    orbitRadius: 15,
    orbitSpeed: 0.018,
    rotationSpeed: -0.002, // retrograde
    size: 1.05,
    tilt: 3.09,
    colorHex: "#EFE8DA",
    weekday: "Friday",
    dayIndex: 5,
    ootdColor: "Vanilla Cream & Soft Alabaster",
    ootdTheme: "Relaxed Vanilla Cream Silk-Blend Tee",
    tagline: "Embrace the effortless grace of Venus.",
    distanceFromSun: "108.2M km (0.72 AU)",
    orbitalPeriod: "225 Earth Days",
    diameter: "12,104 km",
    astronomyFact:
      "Shrouded in dense reflective clouds of sulfuric acid, Venus shines as the brightest natural object in Earth's sky after the Moon.",
    fashionInspiration:
      "Ruled by the Roman deity of beauty and aesthetic balance, Venus translates into soft vanilla cream, ecru drape trousers, and relaxed Friday evening grace.",
  },
  {
    id: "earth",
    name: "Earth & Moon",
    glyph: "♁",
    orbitRadius: 21,
    orbitSpeed: 0.013,
    rotationSpeed: 0.015,
    size: 1.15,
    tilt: 0.41,
    colorHex: "#F0EFEB",
    weekday: "Monday",
    dayIndex: 1,
    ootdColor: "Pearl White & Cool Lunar Silver",
    ootdTheme: "Boxy Heavyweight Pearl White Tee",
    tagline: "Reflect the tranquil lunar calm.",
    distanceFromSun: "149.6M km (1.0 AU)",
    orbitalPeriod: "365.25 Days",
    diameter: "12,742 km",
    astronomyFact:
      "The blue oasis of life, escorted by its celestial companion the Moon, which stabilizes Earth's axial tilt and governs the oceanic tides.",
    fashionInspiration:
      "Monday connects directly to the Moon (Moon-day). Pristine pearl white and brushed silver create a tranquil, architectural start to the work week.",
  },
  {
    id: "mars",
    name: "Mars",
    glyph: "♂",
    orbitRadius: 27,
    orbitSpeed: 0.01,
    rotationSpeed: 0.014,
    size: 0.78,
    tilt: 0.44,
    colorHex: "#B84A39",
    weekday: "Tuesday",
    dayIndex: 2,
    ootdColor: "Rust Red & Burnt Sienna",
    ootdTheme: "Mineral-Washed Rust Red Tee",
    tagline: "Wear the fire of Mars.",
    distanceFromSun: "227.9M km (1.52 AU)",
    orbitalPeriod: "687 Earth Days",
    diameter: "6,779 km",
    astronomyFact:
      "The Red Planet owes its distinctive color to iron oxide (rust) across its basaltic crust, home to Olympus Mons, the largest volcano in the Solar System.",
    fashionInspiration:
      "Named for the deity of strength and dynamic drive, Tuesday channels mineral rust red and raw selvedge textures for unyielding focus.",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    glyph: "♃",
    orbitRadius: 36,
    orbitSpeed: 0.006,
    rotationSpeed: 0.025,
    size: 2.4,
    tilt: 0.05,
    colorHex: "#C29864",
    weekday: "Thursday",
    dayIndex: 4,
    ootdColor: "Warm Tan & Camel Earth",
    ootdTheme: "Heavyweight Warm Tan Relaxed Tee",
    tagline: "Command the expanse of Jupiter.",
    distanceFromSun: "778.5M km (5.2 AU)",
    orbitalPeriod: "11.86 Earth Years",
    diameter: "139,820 km",
    astronomyFact:
      "The king of planets and gas giant titan with swirling atmospheric belts and a centuries-old anticyclonic storm larger than Earth: The Great Red Spot.",
    fashionInspiration:
      "Thursday (Thor/Jupiter's day) evokes expansive grandeur, translated into luxurious warm camel tan, olive trousers, and effortless mastery.",
  },
  {
    id: "saturn",
    name: "Saturn",
    glyph: "♄",
    orbitRadius: 46,
    orbitSpeed: 0.004,
    rotationSpeed: 0.022,
    size: 1.95,
    tilt: 0.47,
    colorHex: "#18181B",
    weekday: "Saturday",
    dayIndex: 6,
    ootdColor: "Matte Black & Onyx Deep",
    ootdTheme: "Structured Matte Black Heavyweight Tee",
    tagline: "Own the commanding depth of Saturn.",
    distanceFromSun: "1.43B km (9.5 AU)",
    orbitalPeriod: "29.45 Earth Years",
    diameter: "116,460 km",
    astronomyFact:
      "Encircled by magnificent icy rings spanning 282,000 km yet merely tens of meters thick, divided by the famous Cassini Division.",
    fashionInspiration:
      "Saturday belongs to Saturn, master of discipline and time. Impeccable matte black delivers structured geometric lines and timeless nocturnal dominance.",
    hasRings: true,
  },
  {
    id: "uranus",
    name: "Uranus",
    glyph: "♅",
    orbitRadius: 55,
    orbitSpeed: 0.0028,
    rotationSpeed: -0.016, // retrograde on its side
    size: 1.35,
    tilt: 1.71, // 98 deg tilt
    colorHex: "#82C8D8",
    weekday: null,
    dayIndex: null,
    ootdColor: "Distant Ice Aquamarine",
    ootdTheme: "Celestial Aquamarine Accent Layer",
    tagline: "Uncharted cold expanse on the edge of vision.",
    distanceFromSun: "2.87B km (19.2 AU)",
    orbitalPeriod: "84 Earth Years",
    diameter: "50,724 km",
    astronomyFact:
      "An ice giant rotating on its side with a dramatic 98° axial tilt, enveloped in cyan methane hazes with the coldest planetary atmosphere in the Solar System (-224°C).",
    fashionInspiration:
      "An avant-garde celestial inspiration symbolizing unconventional independence, coolness, and boundary-pushing artistic silhouettes.",
  },
  {
    id: "neptune",
    name: "Neptune",
    glyph: "♆",
    orbitRadius: 64,
    orbitSpeed: 0.002,
    rotationSpeed: 0.018,
    size: 1.3,
    tilt: 0.49,
    colorHex: "#3965B8",
    weekday: null,
    dayIndex: null,
    ootdColor: "Deep Cobalt Azure",
    ootdTheme: "Midnight Deep Cobalt Outerwear",
    tagline: "The deep cosmic abyss of the mystic giant.",
    distanceFromSun: "4.5B km (30.1 AU)",
    orbitalPeriod: "164.8 Earth Years",
    diameter: "49,244 km",
    astronomyFact:
      "The outermost major planet, battered by supersonic supersonic winds up to 2,100 km/h, boasting an intense, deep royal azure coloration.",
    fashionInspiration:
      "Symbolizes profound oceanic mystery and deep nocturnal presence, translated into rich cobalt cashmere and midnight blue layering.",
  },
];
