export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 bg-black/40 backdrop-blur-xl py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <span className="font-serif text-xl tracking-[0.2em] font-medium text-white">
            OOTD
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold border border-accent-gold/25 font-medium">
            Men
          </span>
          <span className="text-white/30 text-xs hidden sm:inline">&middot;</span>
          <span className="text-xs text-white/40 hidden sm:inline">
            Your Style, Written In the Stars
          </span>
        </div>

        {/* Crafted by Credit */}
        <p className="text-xs text-white/60 tracking-wide">
          Crafted with <span className="text-accent-gold">✨</span> by{" "}
          <a
            href="https://github.com/mdazfar2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium hover:text-accent-gold underline underline-offset-4 decoration-accent-gold/40 hover:decoration-accent-gold transition-colors duration-200"
          >
            Azfar Alam
          </a>
        </p>

        {/* Copyright */}
        <p className="text-[11px] text-white/30 tracking-wider">
          &copy; 2026 OOTD. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
