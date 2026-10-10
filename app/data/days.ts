export interface DayData {
  index: number;
  day: string;
  dayShort: string;
  planet: string;
  color: string;
  colorHex: string;
  colorSecondary: string;
  colorSecondaryHex: string;
  colorTertiary: string;
  colorTertiaryHex: string;
  tagline: string;
  taglineColor: string;
  description: string;
  outfitSuggestion: string;
  outfitImage: string;
  planetImage: string;
}

export const DAYS: DayData[] = [
  {
    index: 0,
    day: "Sunday",
    dayShort: "Sun",
    planet: "Sun",
    color: "Solar Gold",
    colorHex: "#E5A93C",
    colorSecondary: "Amber Glow",
    colorSecondaryHex: "#C98224",
    colorTertiary: "Warm Ivory",
    colorTertiaryHex: "#FFF3DC",
    tagline: "Harness the solar gold.",
    taglineColor: "#E5A93C",
    description:
      "Sunday draws its power directly from the Sun. Channel radiant solar energy with a tailored, heavyweight mustard gold T-shirt. The rich warm hue brings confident warmth and magnetic presence, crafted for modern masculine luxury.",
    outfitSuggestion:
      "Heavyweight mustard gold crewneck T-shirt, black pleated trousers, minimalist white leather sneakers, subtle gold chain",
    outfitImage: "/men-tshirt-sunday.jpg",
    planetImage: "/planet-sun.jpg",
  },
  {
    index: 1,
    day: "Monday",
    dayShort: "Mon",
    planet: "Moon",
    color: "Pearl White",
    colorHex: "#F0EFEB",
    colorSecondary: "Cool Silver",
    colorSecondaryHex: "#B8C0C8",
    colorTertiary: "Soft Smoke",
    colorTertiaryHex: "#D8DCE0",
    tagline: "Reflect the lunar calm.",
    taglineColor: "#F0EFEB",
    description:
      "Monday belongs to the Moon. Start the week with pristine, architectural clarity in a heavyweight pearl white boxy T-shirt. A clean, luminous drape that exudes quiet confidence and effortless masculine poise.",
    outfitSuggestion:
      "Luxury boxy pearl white drop-shoulder T-shirt, charcoal tailored trousers, stainless steel link watch, clean minimalist sneakers",
    outfitImage: "/men-tshirt-monday.jpg",
    planetImage: "/planet-moon.jpg",
  },
  {
    index: 2,
    day: "Tuesday",
    dayShort: "Tue",
    planet: "Mars",
    color: "Rust Red",
    colorHex: "#B84A39",
    colorSecondary: "Burnt Sienna",
    colorSecondaryHex: "#91382A",
    colorTertiary: "Warm Clay",
    colorTertiaryHex: "#D46D58",
    tagline: "Wear the fire of Mars.",
    taglineColor: "#E5634E",
    description:
      "Tuesday channels the fiery drive of Mars. A mineral-washed rust red T-shirt captures the raw, rugged texture of the red planet. Grounded, bold, and unapologetically masculine for focused intensity.",
    outfitSuggestion:
      "Washed rust red vintage-fit T-shirt, dark raw selvedge denim, dark leather cuff bracelet, rugged leather field watch",
    outfitImage: "/men-tshirt-tuesday.jpg",
    planetImage: "/planet-mars.jpg",
  },
  {
    index: 3,
    day: "Wednesday",
    dayShort: "Wed",
    planet: "Mercury",
    color: "Charcoal Slate",
    colorHex: "#4A525A",
    colorSecondary: "Mineral Grey",
    colorSecondaryHex: "#68737D",
    colorTertiary: "Cool Ash",
    colorTertiaryHex: "#8B959E",
    tagline: "Sharp intellect. Fluid movement.",
    taglineColor: "#A4B1C2",
    description:
      "Wednesday is governed by Mercury, the planet of agility and communication. A garment-dyed charcoal slate T-shirt delivers razor-sharp urban minimalism with subtle vintage depth and modern drape.",
    outfitSuggestion:
      "Charcoal slate-washed oversized heavyweight T-shirt, tailored wool-blend trousers, matte silver ring, low-profile leather shoes",
    outfitImage: "/men-tshirt-wednesday.jpg",
    planetImage: "/planet-mercury.jpg",
  },
  {
    index: 4,
    day: "Thursday",
    dayShort: "Thu",
    planet: "Jupiter",
    color: "Warm Tan",
    colorHex: "#C29864",
    colorSecondary: "Camel Earth",
    colorSecondaryHex: "#9E7441",
    colorTertiary: "Sandstone",
    colorTertiaryHex: "#E2C79E",
    tagline: "Command the expanse of Jupiter.",
    taglineColor: "#D6B079",
    description:
      "Thursday belongs to Jupiter, king of the heavens. Command the day in rich tan and camel tones. A premium heavyweight cotton T-shirt provides an expansive, relaxed luxury that feels regal yet effortless.",
    outfitSuggestion:
      "Warm tan / camel tailored T-shirt, tailored dark olive chinos, woven leather belt, tortoise acetate sunglasses",
    outfitImage: "/warm-tan-tshirt.png",
    planetImage: "/planet-jupiter.jpg",
  },
  {
    index: 5,
    day: "Friday",
    dayShort: "Fri",
    planet: "Venus",
    color: "Vanilla Cream",
    colorHex: "#EFE8DA",
    colorSecondary: "Soft Alabaster",
    colorSecondaryHex: "#D8CEBE",
    colorTertiary: "Warm Cashmere",
    colorTertiaryHex: "#FAF4E8",
    tagline: "Embrace the effortless grace of Venus.",
    taglineColor: "#EFE8DA",
    description:
      "Friday is ruled by Venus, deity of beauty and aesthetic harmony. Step into the weekend with a relaxed vanilla cream T-shirt. Soft, elevated, and impeccably refined for an understated luxury finish.",
    outfitSuggestion:
      "Vanilla cream relaxed drop-shoulder T-shirt, ecru wide-leg linen trousers, minimal leather watch, casual slide mules",
    outfitImage: "/men-tshirt-friday.jpg",
    planetImage: "/planet-venus.jpg",
  },
  {
    index: 6,
    day: "Saturday",
    dayShort: "Sat",
    planet: "Saturn",
    color: "Matte Black",
    colorHex: "#18181B",
    colorSecondary: "Onyx Deep",
    colorSecondaryHex: "#27272A",
    colorTertiary: "Graphite",
    colorTertiaryHex: "#3F3F46",
    tagline: "Own the commanding depth of Saturn.",
    taglineColor: "#E4E4E7",
    description:
      "Saturday carries the ancient majesty of Saturn. Pure, structured matte black delivers timeless dominance. A heavyweight luxury black T-shirt offers razor-sharp geometric lines and unmatched evening presence.",
    outfitSuggestion:
      "Structured matte black heavyweight T-shirt, tapered black denim, silver geometric pendant, black leather Chelsea boots",
    outfitImage: "/black-tshirt.png",
    planetImage: "/planet-saturn.jpg",
  },
];

export function getTodayIndex(): number {
  return new Date().getDay();
}

export function getTodayData(): DayData {
  return DAYS[getTodayIndex()];
}
