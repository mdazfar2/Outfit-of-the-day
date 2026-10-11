import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OOTD by Azfar — Daily Celestial Men's Outfits",
    short_name: "OOTD by Azfar",
    description:
      "Daily luxury men's outfit inspiration curated through cosmic colors and planetary alignments by Md Azfar Alam.",
    start_url: "/",
    display: "standalone",
    background_color: "#07080C",
    theme_color: "#07080C",
    icons: [
      {
        src: "/Azfar-fevico.webp",
        sizes: "any",
        type: "image/webp",
      },
    ],
  };
}
