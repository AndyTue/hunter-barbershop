import { MAPS_URL, OPENING_HOURS } from '../data/site';
import { Icon } from './Icon';

export function LocationSection() {
  return (
    <section id="ubicacion" className="w-full py-20 px-4 md:px-8 bg-[#151515] border-t border-[#C0C0C0]/10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.15fr_.85fr] gap-5">
        <div className="min-h-[430px] rounded-3xl overflow-hidden border border-[#C0C0C0]/15 relative bg-[#111111]">
          <iframe title="Previsualización del mapa de Hunter BarberShop" loading="lazy" sandbox="allow-scripts allow-same-origin" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full border-0 opacity-60 grayscale" src="https://www.openstreetmap.org/export/embed.html?bbox=-88.157%2C21.149%2C-88.144%2C21.157&layer=mapnik&marker=21.1531603%2C-88.1505589" />
          <div className="absolute inset-0 bg-[#111111]/45 pointer-events-none" />
          <div className="absolute top-6 left-6 z-20 flex flex-col items-start gap-2 pointer-events-none">
            <span className="px-1 py-1 text-xs uppercase tracking-widest font-bold text-[#FED700] [text-shadow:0_2px_8px_#111111]">Ubicación</span>
            <span className="px-1 py-1 text-2xl md:text-3xl font-sauce-bold text-white [text-shadow:0_2px_8px_#111111]">Ven a visitarnos</span>
          </div>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" aria-label="Abrir ubicación en Google Maps" className="absolute inset-0 z-10" />
          <div className="absolute left-[44%] top-[49%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-[#FED700]/10 border border-[#FED700]/40 flex items-center justify-center animate-pulse"><div className="w-4 h-4 rounded-full bg-[#FED700] shadow-[0_0_30px_rgba(254,215,0,.7)]" /></div>
          </div>
          <div className="absolute left-6 bottom-6 right-6 flex justify-between items-end pointer-events-none">
            <div>
              <div className="text-[10px] uppercase tracking-[.25em] text-[#FED700]">Hunter BarberShop</div>
              <div className="font-sauce-bold text-xl mt-1">Calle 50 240-x 33 y 35</div>
              <div className="text-xs text-[#C0C0C0] mt-1">Centro, Tizimín, Yuc.</div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-[#111111]/70 border border-[#C0C0C0]/15 text-xs text-[#E0E0E0]"><Icon name="map" size={15} /> Tizimín</div>
          </div>
        </div>
        <div className="bg-[#111111] border border-[#C0C0C0]/15 rounded-3xl p-7 md:p-9">
          <div className="text-xs uppercase tracking-widest text-[#FED700] font-bold">Horarios de atención</div>
          <h2 className="mt-2 text-3xl font-sauce-bold">Nuestros horarios</h2>
          <div className="mt-8 space-y-3">
            {OPENING_HOURS.map(([day, hours]) => (
              <div key={day} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm last:border-b-0 last:pb-0">
                <span className="text-[#C0C0C0]">{day}</span><span className="text-white font-bold">{hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
