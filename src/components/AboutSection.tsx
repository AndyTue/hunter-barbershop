import type { CSSProperties } from 'react';
import { BIO_IMG } from '../assets';

export function AboutSection() {
  return (
    <section id="nosotros" className="w-full py-20 px-4 md:px-8 bg-[#111111] border-t border-[#C0C0C0]/10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[.9fr_1.1fr] gap-12 lg:gap-20 items-center">
        <div className="reveal relative">
          <div className="absolute -inset-3 border border-[#FED700]/15 rounded-3xl translate-x-3 translate-y-3" />
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-[#FED700]/30">
            <img src={BIO_IMG} alt="Barbero fundador" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale-[.25]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="inline-flex px-3 py-2 rounded-full bg-[#FED700] text-[#111111] text-[10px] font-black uppercase tracking-widest">Desde 2025 forjando estilo</span>
            </div>
          </div>
        </div>
        <div className="reveal" style={{ '--d': '150ms' } as CSSProperties}>
          <div className="text-xs uppercase tracking-widest text-[#FED700] font-bold">La historia</div>
          <h2 className="mt-2 text-3xl md:text-5xl font-sauce-bold leading-tight">El Arte del Afeitado &amp; la Disciplina del Estilo</h2>
          <div className="w-20 h-1 bg-[#FED700] mt-7" />
          <p className="mt-7 text-[#C0C0C0] leading-8">Hunter nació para rescatar la ceremonia clásica de la barbería y llevarla a un lenguaje contemporáneo. El símbolo de la corona representa carácter; el poste de barbero, oficio y tradición. Cada visita combina técnica, higiene rigurosa y atención al detalle.</p>
          <p className="mt-4 text-[#C0C0C0] leading-8">Desde el fade perfectamente conectado hasta el ritual de toalla caliente, la experiencia está pensada para que salgas arreglado, ligero y con la sensación de haber cuidado de ti mismo.</p>
          <blockquote className="mt-7 pl-5 border-l-2 border-[#D87000] text-[#D87000] italic text-lg">“El estilo no se improvisa. Se trabaja con disciplina.”</blockquote>
        </div>
      </div>
    </section>
  );
}
