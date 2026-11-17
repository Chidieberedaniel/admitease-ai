import { ArrowRight, MessageCircle } from 'lucide-react';
import { useChatUI } from '@/components/chatUIContext';

export default function Hero() {
  const { open } = useChatUI();
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-navy-950"
    >
      {/* Abstract layered background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
        {/* Concentric arcs */}
        <svg
          className="absolute -right-40 top-1/2 -translate-y-1/2 h-[900px] w-[900px] text-gold-400/10"
          viewBox="0 0 800 800"
          fill="none"
        >
          {[120, 220, 320, 420].map((r) => (
            <circle key={r} cx="400" cy="400" r={r} stroke="currentColor" strokeWidth="1" />
          ))}
          <circle cx="400" cy="400" r="60" fill="currentColor" opacity="0.15" />
        </svg>
        {/* Grid lines */}
        <svg className="absolute inset-0 h-full w-full text-white/[0.03]" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Floating gold shapes */}
        <div className="absolute left-[8%] top-[22%] h-24 w-24 animate-float rounded-3xl border border-gold-400/20 bg-gold-400/5 backdrop-blur-sm" />
        <div className="absolute right-[20%] bottom-[18%] h-16 w-16 animate-float rounded-full border border-white/10 bg-white/[0.02]" style={{ animationDelay: '2s' }} />
        <div className="absolute left-[28%] bottom-[28%] h-2 w-2 rounded-full bg-gold-400/40" />
        <div className="absolute right-[12%] top-[30%] h-2 w-2 rounded-full bg-gold-400/30" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-28 pb-20 sm:px-8">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-gold-200">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            Applications open 1 March 2027 · 2027/2028 session
          </div>

          <h1 className="animate-fade-up font-serif text-4xl font-semibold leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl" style={{ animationDelay: '0.1s' }}>
            Where ambition finds its <span className="text-gold-300">footing</span>.
          </h1>

          <p className="mt-6 animate-fade-up max-w-xl text-lg leading-relaxed text-navy-200" style={{ animationDelay: '0.2s' }}>
            Westbridge University is a private university in Lagos, Nigeria, built
            around eight undergraduate programmes and a belief that a good education
            should feel personal, rigorous and worth the journey.
          </p>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center" style={{ animationDelay: '0.3s' }}>
            <a
              href="#programmes"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-7 py-3.5 font-semibold text-navy-900 transition-all hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/20"
            >
              Explore Programmes
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              onClick={open}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              Talk to AdmitEase
            </button>
          </div>

          <div className="mt-16 grid max-w-md grid-cols-3 gap-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            {[
              { value: '8', label: 'Undergraduate programmes' },
              { value: '1', label: 'Campus in Lagos' },
              { value: '2027', label: 'Next intake year' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-serif text-3xl font-semibold text-gold-300">{s.value}</p>
                <p className="mt-1 text-xs leading-snug text-navy-300">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
