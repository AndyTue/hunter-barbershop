import { useEffect, useRef } from 'react';
import { GOOGLE_RATING, REVIEW_URL } from '../data/site';
import { REVIEWS } from '../data/reviews';
import { relativeTime } from '../lib/format';
import { CountUp } from './CountUp';
import { Icon, StarRow } from './Icon';


export function ReviewsSection() {
  const track = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    if (dir === 1) {
      if (atEnd) return el.scrollTo({ left: 0, behavior: 'smooth' });
      const next = cards.find(c => c.offsetLeft > el.scrollLeft + 8);
      el.scrollTo({ left: next ? next.offsetLeft : el.scrollWidth, behavior: 'smooth' });
    } else {
      if (el.scrollLeft <= 8) return el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
      const prev = [...cards].reverse().find(c => c.offsetLeft < el.scrollLeft - 8);
      el.scrollTo({ left: prev ? prev.offsetLeft : 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => { if (!paused.current) go(1); }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="resenas" className="w-full py-20 px-4 md:px-8 bg-[#151515]">
      <div className="max-w-7xl mx-auto">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#FED700] font-bold">Google Reviews</div>
            <h2 className="mt-2 text-3xl md:text-5xl font-sauce-bold">Lo que dicen nuestros clientes</h2>
          </div>
          <div className="flex items-center gap-4 border border-[#C0C0C0]/15 bg-[#111111] rounded-2xl px-5 py-4">
            <div className="text-center">
              <div className="text-3xl font-sauce-bold text-[#FED700] leading-none"><CountUp to={GOOGLE_RATING.score} decimals={1} /></div>
              <div className="mt-1.5"><StarRow /></div>
              <div className="text-[10px] uppercase tracking-widest text-[#C0C0C0] mt-1"><CountUp to={GOOGLE_RATING.count} /> opiniones</div>
            </div>
            <div className="w-px h-12 bg-[#C0C0C0]/20 flex-shrink-0" />
            <a href={REVIEW_URL} target="_blank" rel="noreferrer" className="flex-shrink-0 px-4 py-2.5 rounded-xl border border-[#C0C0C0]/25 text-xs font-bold text-white hover:border-[#FED700] hover:text-[#FED700] transition-colors whitespace-nowrap">
              Escribir reseña
            </a>
          </div>
        </div>
        <div className="relative" onMouseEnter={() => { paused.current = true; }} onMouseLeave={() => { paused.current = false; }} onTouchStart={() => { paused.current = true; }} onTouchEnd={() => { paused.current = false; }}>
          <div ref={track} className="flex gap-4 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {REVIEWS.map(r => (
              <article key={r.author} className="bg-[#111111] border border-[#C0C0C0]/15 rounded-2xl p-6 shadow-xl shrink-0 snap-start w-[85%] sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#FED700]/15 text-[#FED700] flex items-center justify-center font-bold flex-shrink-0">{r.author.charAt(0)}</div>
                    <div>
                      <div className="font-bold text-white text-sm">{r.author}</div>
                      <div className="text-[10px] text-[#C0C0C0] mt-0.5">{relativeTime(r.date)}</div>
                    </div>
                  </div>
                  <span className="w-6 h-6 rounded-full border border-[#FED700]/30 text-[#FED700] flex items-center justify-center flex-shrink-0"><Icon name="check" size={13} /></span>
                </div>
                <div className="mt-4"><StarRow /></div>
                <p className="mt-3 text-sm leading-7 text-[#E0E0E0]">{r.comment}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button type="button" aria-label="Ver reseñas anteriores" onClick={() => go(-1)} className="w-10 h-10 rounded-full border border-[#C0C0C0]/20 text-[#FED700] hover:border-[#FED700] transition-colors flex items-center justify-center rotate-180"><Icon name="arrow" size={17} /></button>
          <button type="button" aria-label="Ver más reseñas" onClick={() => go(1)} className="w-10 h-10 rounded-full border border-[#C0C0C0]/20 text-[#FED700] hover:border-[#FED700] transition-colors flex items-center justify-center"><Icon name="arrow" size={17} /></button>
        </div>
      </div>
    </section>
  );
}
