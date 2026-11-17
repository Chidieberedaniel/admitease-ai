import { useEffect, useState } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import { useChatUI } from '@/components/chatUIContext';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Programmes', href: '#programmes' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'AdmitEase', action: 'chat' as const },
];

export default function Navbar() {
  const { open } = useChatUI();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (e: React.MouseEvent, link: (typeof LINKS)[number]) => {
    if ('action' in link && link.action === 'chat') {
      e.preventDefault();
      open();
      setMenuOpen(false);
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm shadow-navy-900/5' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 text-gold-300">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span
            className={`font-serif text-lg font-semibold tracking-tight transition-colors ${
              scrolled ? 'text-navy-900' : 'text-white'
            }`}
          >
            Westbridge
            <span className="block text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-gold-400">
              University · Lagos
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) =>
            'action' in l ? (
              <button
                key={l.label}
                onClick={(e) => handleLink(e, l)}
                className={`text-sm font-medium transition-colors hover:text-gold-400 ${
                  scrolled ? 'text-navy-700' : 'text-navy-100'
                }`}
              >
                {l.label}
              </button>
            ) : (
              <a
                key={l.label}
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-gold-400 ${
                  scrolled ? 'text-navy-700' : 'text-navy-100'
                }`}
              >
                {l.label}
              </a>
            )
          )}
          <button
            onClick={open}
            className="rounded-full bg-gold-400 px-5 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-300"
          >
            Apply for 2027/2028
          </button>
        </div>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          className={`md:hidden ${scrolled ? 'text-navy-900' : 'text-white'}`}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-navy-100 bg-white md:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {LINKS.map((l) =>
              'action' in l ? (
                <button
                  key={l.label}
                  onClick={(e) => handleLink(e, l)}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-navy-700 hover:bg-navy-50"
                >
                  {l.label}
                </button>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-50"
                >
                  {l.label}
                </a>
              )
            )}
            <button
              onClick={() => { open(); setMenuOpen(false); }}
              className="mt-2 rounded-full bg-gold-400 px-5 py-2.5 text-center text-sm font-semibold text-navy-900"
            >
              Apply for 2027/2028
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
