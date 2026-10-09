import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import DayContent from "@/app/components/DayContent";
import Footer from "@/app/components/Footer";
import CosmicBackground from "@/app/components/CosmicBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#07080C] text-[#F3F4F6] selection:bg-accent-gold/30 selection:text-white">
      {/* Ambient Cosmic Background Waves matching Screenshot 1 */}
      <CosmicBackground />

      {/* Floating Sticky Starlink-Style Navbar */}
      <Navbar />

      {/* Main Flow */}
      <main className="relative z-10 flex-1">
        {/* Fullscreen Video Hero matching Amazon Leo */}
        <Hero />

        {/* Coordinated Men's T-Shirt Day Content & Weekly Palette */}
        <DayContent />
      </main>

      {/* Understated Minimalist Footer */}
      <Footer />
    </div>
  );
}
