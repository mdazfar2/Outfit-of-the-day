import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 bg-black/40 backdrop-blur-xl py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <span className="font-serif text-xl tracking-[0.2em] font-medium text-white">
            OOTD
          </span>
          <span className="text-white/30 text-xs hidden sm:inline">&middot;</span>
          <span className="text-xs text-white/40 hidden sm:inline">
            Your Style, Written In the Stars
          </span>
        </div>

        {/* crafted by credit */}
        <div className="flex items-center justify-center gap-2 text-xs text-white/60 tracking-wide">
          <span className="flex items-center gap-1.5 leading-none">
            <span>Crafted with</span>
            <span className="text-accent-gold text-xs leading-none">✨</span>
            <span>by</span>
          </span>
          <a
            href="https://azfaralam.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center transition-all duration-300 hover:scale-115 hover:drop-shadow-[0_0_10px_rgba(255,191,72,0.6)]"
            title="Azfar Alam"
            aria-label="Visit Azfar Alam's website"
          >
            <Image
              src="/Azfar-fevico.webp"
              alt="Azfar Alam"
              width={22}
              height={22}
              className="w-[21px] h-[21px] object-contain -translate-y-[1.5px]"
            />
          </a>
        </div>

        {/* copyright */}
        <p className="text-[11px] text-white/30 tracking-wider">
          &copy; 2026 OOTD. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

