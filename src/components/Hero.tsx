import { HERO_BG, LOGO_IMG } from '../assets';
import { SOCIAL_LINKS } from '../data/site';
import { Icon, StarRow } from './Icon';

export function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="inicio" className="h-[100svh] min-h-0 w-full overflow-hidden flex flex-col pt-20 md:pt-24 px-3 md:px-6 pb-3 md:pb-4 gap-2 bg-[#111111]">
      <div className="relative flex-1 min-h-0 rounded-2xl overflow-hidden border border-[#FED700]/20 gold-glow noise">
        <img src={HERO_BG} alt="Hunter BarberShop background" fetchPriority="high" decoding="async" className="neon-flicker absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.25)_0%,rgba(0,0,0,.5)_100%)]" />
        <div className="relative h-full min-h-0 p-4 md:p-8 lg:p-10">
          <div className="flex justify-between items-start text-[10px] uppercase tracking-[.3em] text-[#C0C0C0]">
            <span className="hidden sm:block">Valentin Garcilazo</span><span className="hidden sm:block">Desde 2025</span>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pb-[4.4%]">
            <img src={LOGO_IMG} alt="Hunter BarberShop" className="hero-logo w-[min(68vw,24rem)] lg:w-[min(36vw,28rem)] h-auto object-contain drop-shadow-[0_4px_48px_rgba(254,215,0,0.35)]" />
          </div>
          <div className="absolute bottom-8 md:bottom-12 inset-x-0 flex flex-col items-center gap-4 px-4">
            <div className="hero-socials flex items-center justify-center gap-6">
              {SOCIAL_LINKS.map(({ label, icon, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="text-[#00000] hover:text-white hover:scale-110 transition-all duration-300"><Icon name={icon} size={26} /></a>
              ))}
            </div>
            <div className="hero-cta">
              <a href="#agendar" onClick={event => { event.preventDefault(); onBook(); }} className="inline-flex items-center gap-3 px-6 md:px-10 py-3.5 md:py-4 bg-[#FED700] hover:bg-[#D87000] text-[#111111] font-black text-xs md:text-base uppercase tracking-widest rounded-full shadow-2xl transition-transform hover:scale-105">
                <Icon name="calendar" size={21} /> Agendar Cita Ahora <Icon name="arrow" size={19} />
              </a>
            </div>
          </div>
          <div className="hidden sm:block absolute bottom-4 md:bottom-8 lg:bottom-10 right-4 md:right-8 lg:right-10">
            <div className="flex items-center gap-2 text-xs md:text-sm text-[#E0E0E0]"><StarRow /><span>5.0 <span className="text-white/50">(Google Rating)</span></span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
