import type { CSSProperties } from 'react';
import { SERVICES } from '../data/services';

export function ServicesSection({ onBook }: { onBook: () => void }) {
  return (
    <section id="servicios" className="w-full py-20 px-4 md:px-8 bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-10">
          <div className="text-xs uppercase tracking-widest text-[#FED700] font-bold">Nuestros trabajos</div>
          <h2 className="mt-2 text-3xl md:text-5xl font-sauce-bold text-white">Servicios de Barbería</h2>
          <p className="mt-3 max-w-2xl text-[#C0C0C0] text-sm">Cada servicio está diseñado alrededor de una idea sencilla: precisión, ritual y un resultado que se note.</p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => (
            <article key={s.id} style={{ '--d': `${(i % 4) * 90}ms` } as CSSProperties} className="reveal bg-[#181818] border border-[#C0C0C0]/15 hover:border-[#FED700]/60 hover:-translate-y-1.5 hover:shadow-[0_14px_40px_rgba(254,215,0,0.12)] transition-all duration-300 rounded-2xl p-6 min-h-[285px] flex flex-col justify-between group">
              <div>
                <div className="text-[#D87000] font-bold text-sm tracking-widest">{s.id}</div>
                <h3 className="mt-7 text-xl md:text-2xl font-bold text-white group-hover:text-[#FED700] whitespace-pre-line transition-colors">{s.name}</h3>
                <p className="text-xs md:text-sm text-[#C0C0C0] mt-3 leading-relaxed">{s.description}</p>
              </div>
              <div className="pt-6 flex items-end justify-between gap-3">
                <div className="text-lg font-black text-[#FED700] origin-left group-hover:scale-110 transition-transform duration-300">{s.price}</div>
                <button onClick={onBook} className="px-4 py-2 rounded-full border border-[#C0C0C0]/25 hover:border-[#FED700] hover:bg-[#FED700] hover:text-[#111111] text-[10px] font-bold uppercase tracking-widest transition-colors">Reservar</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
