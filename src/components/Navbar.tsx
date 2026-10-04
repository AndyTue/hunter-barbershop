import type { RefObject } from 'react';
import { LOGO_IMG } from '../assets';
import { NAV_ITEMS } from '../data/site';

type Props = {
  scrolled: boolean;
  logoVisible: boolean;
  logoRef: RefObject<HTMLImageElement | null>;
  progressRef: RefObject<HTMLDivElement | null>;
  activeSection: string;
  onBook: () => void;
};

export function Navbar({ scrolled, logoVisible, logoRef, progressRef, activeSection, onBook }: Props) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 backdrop-blur-md border-b transition-all duration-300 ${scrolled ? 'py-1.5 bg-[#0b0b0b]/95 border-[#FED700]/20 shadow-lg shadow-black/40' : 'py-3 bg-[#111111]/85 border-[#C0C0C0]/10'}`}>
      <a href="#inicio" className="flex items-center gap-3 group">
        <img ref={logoRef} style={{ visibility: logoVisible ? 'visible' : 'hidden' }} src={LOGO_IMG} alt="Hunter BarberShop" className={`object-contain group-hover:scale-105 transition-all duration-300 ${scrolled ? 'w-14 h-10' : 'w-16 h-12'}`} />
      </a>
      <div className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider text-[#E0E0E0]">
        {NAV_ITEMS.map(([label, href]) => {
          const active = activeSection === href.slice(1);
          return (
            <a key={href} href={href} className={`relative py-1 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-[#FED700] after:transition-all after:duration-300 ${active ? 'text-[#FED700] after:w-full' : 'hover:text-[#FED700] after:w-0'}`}>{label}</a>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <a href="#agendar" onClick={event => { event.preventDefault(); onBook(); }} className="inline-flex px-4 sm:px-5 py-2 sm:py-2.5 bg-[#FED700] hover:bg-[#D87000] text-[#111111] font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-[#FED700]/20 transition-all transform hover:scale-105">Agendar Cita</a>
      </div>
      <div ref={progressRef} className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#FED700] shadow-[0_0_8px_rgba(254,215,0,.7)]" style={{ transform: 'scaleX(0)' }} />
    </nav>
  );
}
