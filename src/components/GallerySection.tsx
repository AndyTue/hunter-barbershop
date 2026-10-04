import { useState } from 'react';
import type { CSSProperties } from 'react';
import { GALLERY } from '../data/gallery';

export function GallerySection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="galeria" className="w-full py-20 px-4 md:px-8 bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-10">
          <div className="text-xs uppercase tracking-widest text-[#FED700] font-bold">Photo showcase</div>
          <h2 className="mt-2 text-3xl md:text-5xl font-sauce-bold">El taller, de cerca</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {GALLERY.map(([src, cap], i) => (
            <button key={src} onClick={() => setOpen(i)} style={{ '--d': `${i * 100}ms` } as CSSProperties} className={`reveal group relative overflow-hidden rounded-2xl border border-[#C0C0C0]/10 text-left ${i === 0 ? 'md:col-span-2 md:row-span-2 min-h-[420px]' : 'min-h-[200px]'}`}>
              <img src={src} alt={cap} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="text-[10px] uppercase tracking-widest text-[#FED700]">Hunter / Detail</div>
                <div className="font-bold text-white mt-1">{cap}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {open !== null && (
        <div className="fixed inset-0 z-[80] bg-black/90 flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <img src={GALLERY[open][0]} alt={GALLERY[open][1]} className="max-h-[80vh] w-full object-contain rounded-2xl" />
            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="text-[#FED700] text-xs uppercase tracking-widest">Gallery</div>
                <div className="font-bold">{GALLERY[open][1]}</div>
              </div>
              <button onClick={() => setOpen(null)} className="px-4 py-2 rounded-full border border-white/20 text-xs">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
