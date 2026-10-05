import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { GALLERY, GALLERY_VIDEO } from '../data/gallery';

// Masonry columns: each column stacks photos (index into GALLERY, flex weight) at different heights.
const COLUMNS: { photos: [number, number][]; width: string }[] = [
  { photos: [[0, 2.5], [1, 2]], width: 'w-[280px] md:w-[360px]' },
  { photos: [[2, 4.5], [3, 1.8]], width: 'w-[280px] md:w-[360px]' },
  { photos: [[4, 2.5], [5, 2]], width: 'w-[280px] md:w-[360px]' },
  { photos: [[6, 2], [7, 2.5]], width: 'w-[280px] md:w-[360px]' }
];

export function GallerySection() {
  const [open, setOpen] = useState<number | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const cols = Array.from(el.children) as HTMLElement[];
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    if (dir === 1) {
      if (atEnd) return el.scrollTo({ left: 0, behavior: 'smooth' });
      const next = cols.find(c => c.offsetLeft > el.scrollLeft + 8);
      el.scrollTo({ left: next ? next.offsetLeft : el.scrollWidth, behavior: 'smooth' });
    } else {
      const prev = [...cols].reverse().find(c => c.offsetLeft < el.scrollLeft - 8);
      el.scrollTo({ left: prev ? prev.offsetLeft : 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      if (!paused.current && open === null) go(1);
    }, 3500);
    return () => clearInterval(id);
  }, [open]);

  const pause = () => { paused.current = true; };
  const resume = () => { paused.current = false; };
  const H = 'h-[520px] md:h-[min(85vh,820px)]';

  return (
    <section id="galeria" className="w-full py-20 px-4 md:px-8 bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-10 flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#FED700] font-bold">Galería</div>
            <h2 className="mt-2 text-3xl md:text-5xl font-sauce-bold">Nuestro trabajo</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => go(-1)} aria-label="Anterior" className="w-10 h-10 rounded-full border border-white/20 hover:border-[#FED700] hover:text-[#FED700] transition-colors">‹</button>
            <button onClick={() => go(1)} aria-label="Siguiente" className="w-10 h-10 rounded-full border border-white/20 hover:border-[#FED700] hover:text-[#FED700] transition-colors">›</button>
          </div>
        </div>

        <div
          ref={track}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
          className={`reveal relative flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${H}`}
        >
          <div className={`relative shrink-0 snap-start h-full aspect-[9/16] overflow-hidden rounded-2xl border border-[#C0C0C0]/10 bg-black`}>
            <video
              src={GALLERY_VIDEO}
              poster={GALLERY[4][0]}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Video de un corte fade en Hunter Barbershop"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {COLUMNS.map(({ photos, width }, c) => (
            <div key={c} className={`shrink-0 snap-start h-full flex flex-col gap-3 md:gap-4 ${width}`}>
              {photos.map(([i, w]) => (
                <button
                  key={i}
                  onClick={() => setOpen(i)}
                  style={{ flex: w, '--d': `${i * 60}ms` } as CSSProperties}
                  className="group relative min-h-0 overflow-hidden rounded-2xl border border-[#C0C0C0]/10 text-left"
                >
                  <img src={GALLERY[i][0]} alt={GALLERY[i][1]} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {open !== null && (
        <div className="fixed inset-0 z-[80] bg-black/90 flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <img src={GALLERY[open][0]} alt={GALLERY[open][1]} className="max-h-[80vh] w-full object-contain rounded-2xl" />
            <div className="mt-3 flex items-center">
              <button onClick={() => setOpen(null)} className="ml-auto px-4 py-2 rounded-full border border-white/20 text-xs">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
