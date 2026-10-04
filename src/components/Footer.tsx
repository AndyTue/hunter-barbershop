import type { CSSProperties } from 'react';
import { LOGO_IMG } from '../assets';
import { SOCIAL_LINKS } from '../data/site';
import { Icon } from './Icon';

export function Footer({ onBook }: { onBook: () => void }) {
  const d = (ms: number) => ({ '--d': `${ms}ms` } as CSSProperties);
  return (
    <footer id="contacto" className="w-full py-16 px-4 md:px-8 bg-[#0D0D0D] border-t border-[#FED700]/20">
      <div className="max-w-7xl mx-auto">
        <div style={d(0)} className="reveal mb-10 rounded-3xl bg-[#FED700] text-[#111111] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="text-xs uppercase tracking-[.3em] font-bold opacity-70">Hunter BarberShop</div>
            <h2 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-sauce-bold text-balance">¿Listo para tu próximo corte?</h2>
          </div>
          <button onClick={onBook} className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#111111] text-[#FED700] text-xs uppercase tracking-widest font-bold hover:scale-105 active:scale-95 transition-transform duration-300">
            Reservar cita
            <span className="group-hover:translate-x-1 transition-transform duration-300"><Icon name="arrow" size={18} /></span>
          </button>
        </div>
        <div style={d(120)} className="reveal rounded-3xl border border-[#FED700]/50 bg-[radial-gradient(circle_at_50%_0%,rgba(254,215,0,.11),transparent_38%),#111111] p-6 sm:p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#FED700]/5 blur-3xl rounded-full" />
          <div className="relative flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-12">
            <div className="flex-shrink-0 flex items-center justify-center">
              <img src={LOGO_IMG} alt="Hunter BarberShop" className="w-28 h-28 object-contain opacity-90" />
            </div>
            <div className="w-px bg-[#FED700]/20 hidden md:block" />
            <div className="flex flex-col justify-center gap-6 flex-1 w-full text-center md:text-left">
              <div>
                <div className="text-xs uppercase tracking-[.3em] text-[#FED700] font-bold">Síguenos</div>
                <h2 className="mt-1 text-xl sm:text-2xl md:text-3xl font-sauce-bold text-balance">Encuéntranos en redes sociales</h2>
              </div>
              <div className="grid grid-cols-3 sm:flex sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                {SOCIAL_LINKS.map(({ label, icon, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="relative overflow-hidden flex items-center justify-center gap-3 px-3 sm:px-5 py-3.5 sm:py-3 rounded-full border border-[#C0C0C0]/20 bg-[#111111] text-[#C0C0C0] hover:border-[#FED700] hover:text-[#111111] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(254,215,0,0.25)] transition-all duration-300 group before:content-[''] before:absolute before:inset-0 before:bg-[#FED700] before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-300">
                    <span className="relative"><Icon name={icon} size={20} /></span>
                    <span className="relative hidden sm:inline text-xs uppercase tracking-widest font-bold">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={d(240)} className="reveal mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center gap-4 justify-between text-center md:text-left text-[10px] leading-relaxed uppercase tracking-widest text-[#C0C0C0]">
          <span>© {new Date().getFullYear()} Hunter BarberShop. Todos los derechos reservados.</span>
          <span className="opacity-70">Diseñado por <a href="https://www.instagram.com/andy_tue/" target="_blank" rel="noreferrer" className="text-[#FED700] hover:underline">Andrés Turriza</a></span>
        </div>
      </div>
    </footer>
  );
}
