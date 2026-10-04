import { useEffect, useState } from 'react';
import { GOOGLE_RATING, REVIEW_URL } from '../data/site';
import { REVIEWS } from '../data/reviews';
import { relativeTime } from '../lib/format';
import { CountUp } from './CountUp';
import { Icon, StarRow } from './Icon';

const PAGE_SIZE = 3;
const PAGE_COUNT = Math.ceil(REVIEWS.length / PAGE_SIZE);

export function ReviewsSection() {
  const [page, setPage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPage(p => (p + 1) % PAGE_COUNT), 4000);
    return () => clearInterval(id);
  }, [page]);

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
        <div className="relative overflow-hidden">
          <div className="flex gap-4 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(calc(-${page * (100 / 3)}% - ${page * (16 / 3)}px))` }}>
            {REVIEWS.map(r => (
              <article key={r.author} className="bg-[#111111] border border-[#C0C0C0]/15 rounded-2xl p-6 shadow-xl flex-shrink-0 w-[calc(33.333%-11px)]" style={{ minWidth: '280px' }}>
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
          <button type="button" aria-label="Ver reseñas anteriores" onClick={() => setPage(p => (p - 1 + PAGE_COUNT) % PAGE_COUNT)} className="w-10 h-10 rounded-full border border-[#C0C0C0]/20 text-[#FED700] hover:border-[#FED700] transition-colors flex items-center justify-center rotate-180"><Icon name="arrow" size={17} /></button>
          <button type="button" aria-label="Ver más reseñas" onClick={() => setPage(p => (p + 1) % PAGE_COUNT)} className="w-10 h-10 rounded-full border border-[#C0C0C0]/20 text-[#FED700] hover:border-[#FED700] transition-colors flex items-center justify-center"><Icon name="arrow" size={17} /></button>
          <div className="flex items-center gap-1.5 ml-2">
            {Array.from({ length: PAGE_COUNT }).map((_, i) => (
              <button key={i} type="button" aria-label={`Ir a la página ${i + 1} de reseñas`} onClick={() => setPage(i)} className={`rounded-full transition-all ${page === i ? 'w-5 h-2 bg-[#FED700]' : 'w-2 h-2 bg-[#C0C0C0]/30 hover:bg-[#FED700]/50'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
