import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import LOGO_IMG from '../images/Logo.png';
import BIO_IMG from '../images/profile.jpeg';

const HERO_BG = 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1920&q=85';
const GALLERY = [
  ['https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80', 'Fade & Texture'],
  ['https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80', 'Traditional Hot Towel'],
  ['https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=800&q=80', 'Razor Sharp Lineup'],
  ['https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80', 'Hunter Atmosphere']
] as const;

const services = [
  { id:'01', name:'Corte Fade', price:'$170', description:'Degradado preciso y limpio, adaptado a tu estilo y tipo de cabello.' },
  { id:'02', name:'Corte Clásico', price:'$150', description:'Corte tradicional con acabado pulido y asesoría para mantener la forma.' },
  { id:'03', name:'Perfilado de Barba', price:'$100', description:'Definición de líneas, recorte de barba y aceite hidratante anti-frizz.' },
  { id:'04', name:'Diseño o Limpieza de Cejas', price:'$100', description:'Limpieza y diseño personalizado para resaltar la expresión del rostro.' },
  { id:'05', name:'Depilación de Nariz con Cera', price:'$100', description:'Depilación rápida y cuidadosa para un acabado limpio y cómodo.' },
  { id:'06', name:'Hunter VIP', price:'$400', description:'Una experiencia completa de barbería con atención especial y acabado premium.' },
  { id:'07', name:'Rizos Permanentes', price:'$1,000', description:'Textura y volumen duradero, personalizado según el largo y tipo de cabello.' },
  { id:'08', name:'Trenzas', price:'$400', description:'Trenzado personalizado con un acabado limpio y duradero.' }
];
type BookingService={id:string;name:string;price:string;description:string};
const reviews = [
  { author:'Oscar Basto', rating:5, relativeTime:'Opinión de Google', comment:'Buena calidad en productos y buen trato al consumista del servicio en general.' },
  { author:'Manuel Mendoza', rating:5, relativeTime:'Opinión de Google', comment:'Excelente servicio, muy higiénico y buena atención.' },
  { author:'Armando Conrado Gamboa', rating:5, relativeTime:'Hace un mes', comment:'Excelente!!' },
  { author:'Andrés Turriza', rating:5, relativeTime:'Hace 3 días', comment:'Excelente servicio!' },
  { author:'Luis Gerardo Cruz Rodriguez', rating:5, relativeTime:'Opinión de Google', comment:'Excelente atención, buen servicio y muy profesional, 100% recomendado.' },
  { author:'TheRigbyg', rating:5, relativeTime:'Opinión de Google', comment:'Excelente servicio, un corte hecho por un profesional en lo que hace.' }
];

function Icon({name, size=22}:{name:string;size?:number}){
  const common={width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.8,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
  const paths:Record<string,React.ReactNode>={
    menu:<><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>,
    x:<><path d="m6 6 12 12"/><path d="M18 6 6 18"/></>,
    scissors:<><circle cx="6" cy="7" r="2.5"/><circle cx="6" cy="17" r="2.5"/><path d="m8 8 12 10"/><path d="m8 16 12-10"/></>,
    calendar:<><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></>,
    clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    map:<><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    check:<><path d="m5 12 4 4L19 6"/></>,
    arrow:<><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    quote:<><path d="M7 6H5a2 2 0 0 0-2 2v6h5V9H5"/><path d="M18 6h-2a2 2 0 0 0-2 2v6h5V9h-1"/></>,
    instagram:<><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></>,
    facebook:<><path d="M14 8h3V4h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8Z"/></>,
    tiktok:<><path d="M15 4c.5 2.4 2 3.8 4 4.2v3c-1.6-.1-3-.6-4.2-1.5v5.2A5.1 5.1 0 1 1 10 10h1v3h-1a2.1 2.1 0 1 0 1.8 2.1V4h3.2Z"/></>,
    whatsapp:<><path d="M20 11.5A8 8 0 0 1 8.2 19L4 20l1-4A8 8 0 1 1 20 11.5Z"/><path d="M9 9.2c.3-.7.6-.7 1-.6l.8.8c.2.2.2.5 0 .8l-.3.4c.7 1.3 1.6 2.1 2.9 2.8l.4-.3c.3-.2.6-.2.8 0l.8.7c.3.3.3.6.1 1-.4.8-1.2 1.1-2 1-2.7-.5-5.5-3.2-6-6-.1-.8.2-1.6.5-2Z"/></>
  };
  return <svg {...common}>{paths[name] ?? paths.check}</svg>
}

function StarRow(){ return <div className="flex items-center gap-1 text-[#FED700]" aria-label="5 estrellas">{Array.from({length:5}).map((_,i)=><span key={i}>★</span>)}</div> }

function Reveal({children,className='' }:{children:React.ReactNode;className?:string}){
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const el=document.getElementById(`r-${Math.random()}`);
    void el;
  },[]);
  return <div className={`reveal ${className} is-visible`}>{children}</div>
}

function BookingSection({services,onClose}:{services:BookingService[];onClose:()=>void}){
  const [selectedIds,setSelectedIds]=useState<string[]>([]);
  const [date,setDate]=useState('');
  const [time,setTime]=useState('');
  const [name,setName]=useState('');
  const [customerPhone,setCustomerPhone]=useState('');
  const [notes,setNotes]=useState('');
  const [error,setError]=useState('');
  const [calendarMonth,setCalendarMonth]=useState(()=>{
    const current=new Date();
    return new Date(current.getFullYear(),current.getMonth(),1,12);
  });

  const today=new Date().toISOString().split('T')[0];
  const currentMonth=new Date(`${today}T12:00:00`);
  const monthStart=new Date(calendarMonth.getFullYear(),calendarMonth.getMonth(),1,12);
  const daysInMonth=new Date(calendarMonth.getFullYear(),calendarMonth.getMonth()+1,0,12).getDate();
  const leadingDays=(monthStart.getDay()+6)%7;
  const calendarDays=Array.from({length:leadingDays+daysInMonth},(_,index)=>index<leadingDays?null:index-leadingDays+1);
  const canGoPrevious=monthStart.getFullYear()>currentMonth.getFullYear()||monthStart.getMonth()>currentMonth.getMonth();
  const monthLabel=calendarMonth.toLocaleDateString('es-MX',{month:'long',year:'numeric'});
  const selectedServices=services.filter(service=>selectedIds.includes(service.id));
  const totalPrice=selectedServices.reduce((total,service)=>total+(Number(service.price.replace(/[^0-9]/g,''))||0),0);
  const selectedDate=new Date(`${date}T12:00:00`);
  const isSunday=date!==''&&!Number.isNaN(selectedDate.getTime())&&selectedDate.getDay()===0;
  const timeSlots=Array.from({length:isSunday?6:13},(_,index)=>{
    const hour=9+index;
    return `${String(hour).padStart(2,'0')}:00`;
  });

  useEffect(()=>{
    const handleEscape=(event:KeyboardEvent)=>{if(event.key==='Escape')onClose()};
    document.addEventListener('keydown',handleEscape);
    return ()=>document.removeEventListener('keydown',handleEscape);
  },[onClose]);

  const toggleService=(id:string)=>{
    setSelectedIds(current=>current.includes(id)?current.filter(item=>item!==id):[...current,id]);
    setError('');
  };

  const submitBooking=()=>{
    if(selectedServices.length===0||!date||!time||!name.trim()||!customerPhone.trim()){
      setError('Completa los servicios, la fecha, el horario, tu nombre y tu teléfono.');
      return;
    }
    const serviceSummary=selectedServices.map(service=>`${service.name} (${service.price})`).join(', ');
    const message=[
      'Hola Hunter BarberShop 👋',
      '',
      'Quiero agendar una cita:',
      `• Servicios: ${serviceSummary}`,
      `• Total estimado: $${totalPrice.toLocaleString('es-MX')}`,
      `• Fecha: ${date}`,
      `• Hora: ${time}`,
      `• Nombre: ${name.trim()}`,
      `• Teléfono: ${customerPhone.trim()}`,
      notes.trim()?`• Notas: ${notes.trim()}`:''
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/529994845979?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');
  };

  return <div id="agendar" className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4" onClick={onClose}>
    <div className="max-h-[92vh] w-full max-w-7xl overflow-y-auto rounded-3xl border border-[#FED700]/30 bg-[#111111] p-5 shadow-2xl md:p-8" onClick={event=>event.stopPropagation()}><div className="mb-8 flex items-start justify-between gap-5"><div><div className="text-xs uppercase tracking-widest text-[#FED700] font-bold">Reserva tu espacio</div><h2 className="mt-2 text-3xl md:text-5xl font-sauce-bold">Agenda tu cita</h2><p className="mt-3 max-w-2xl text-[#C0C0C0] text-sm">Elige tus servicios y envíanos los datos por WhatsApp para confirmar disponibilidad.</p></div><button type="button" aria-label="Cerrar agendamiento" onClick={onClose} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C0C0C0]/20 text-white hover:border-[#FED700] hover:text-[#FED700]"><Icon name="x" size={20}/></button></div>
      <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-5">
        <div className="bg-[#151515] border border-[#C0C0C0]/15 rounded-3xl p-6 md:p-8"><div className="text-xs uppercase tracking-widest text-[#FED700] font-bold">1 / Servicios</div><div className="mt-5 grid sm:grid-cols-2 gap-3">{services.map(service=><button type="button" key={service.id} onClick={()=>toggleService(service.id)} className={`text-left rounded-2xl border p-4 transition-colors ${selectedIds.includes(service.id)?'border-[#FED700] bg-[#FED700]/10':'border-[#C0C0C0]/15 bg-[#111111] hover:border-[#FED700]/60'}`}><div className="flex items-start justify-between gap-3"><div className="font-bold text-white">{service.name}</div><span className="text-sm font-black text-[#FED700]">{service.price}</span></div><p className="mt-3 text-xs leading-relaxed text-[#C0C0C0]">{service.description}</p></button>)}</div><div className="mt-6 flex flex-wrap gap-4 border-t border-white/10 pt-5 text-sm"><span className="text-[#C0C0C0]">Total: <strong className="text-[#FED700]">${totalPrice.toLocaleString('es-MX')}</strong></span></div></div>
        <div className="bg-[#151515] border border-[#C0C0C0]/15 rounded-3xl p-6 md:p-8"><div className="text-xs uppercase tracking-widest text-[#FED700] font-bold">2 / Fecha y datos</div><div className="mt-5 space-y-5"><div><div className="text-sm text-[#C0C0C0]">Fecha</div><div className="mt-2 rounded-2xl border border-[#C0C0C0]/20 bg-[#111111] p-3"><div className="flex items-center justify-between gap-3 px-1 pb-3"><button type="button" aria-label="Mes anterior" disabled={!canGoPrevious} onClick={()=>setCalendarMonth(current=>new Date(current.getFullYear(),current.getMonth()-1,1,12))} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C0C0C0]/20 text-white transition-colors hover:border-[#FED700] disabled:cursor-not-allowed disabled:opacity-30"><Icon name="arrow" size={16}/></button><div className="text-sm font-bold capitalize text-white">{monthLabel}</div><button type="button" aria-label="Mes siguiente" onClick={()=>setCalendarMonth(current=>new Date(current.getFullYear(),current.getMonth()+1,1,12))} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C0C0C0]/20 text-white transition-colors hover:border-[#FED700] rotate-180"><Icon name="arrow" size={16}/></button></div><div className="grid grid-cols-7 gap-2 text-center text-[10px] uppercase tracking-wider text-[#C0C0C0]">{['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(day=><span key={day}>{day}</span>)}</div><div className="mt-2 grid grid-cols-7 gap-2">{calendarDays.map((day,index)=>{if(day===null)return <span key={`empty-${index}`} className="h-9"/>;const selectedDate=new Date(calendarMonth.getFullYear(),calendarMonth.getMonth(),day,12);const dateKey=`${selectedDate.getFullYear()}-${String(selectedDate.getMonth()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;const disabled=dateKey<today;return <button type="button" key={dateKey} disabled={disabled} onClick={()=>{setDate(dateKey);setTime('');setError('')}} className={`h-9 rounded-xl border text-xs transition-colors ${date===dateKey?'border-[#FED700] bg-[#FED700] text-[#111111] font-bold':disabled?'cursor-not-allowed border-transparent text-white/20':'border-[#C0C0C0]/20 bg-[#111111] text-white hover:border-[#FED700]'}`}>{day}</button>})}</div></div>{date&&<div className="mt-2 text-xs text-[#FED700]">Fecha seleccionada: {new Date(`${date}T12:00:00`).toLocaleDateString('es-MX',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div>}</div><div><div className="text-sm text-[#C0C0C0]">Horario</div><div className="mt-2 grid grid-cols-3 gap-2">{timeSlots.map(slot=><button type="button" key={slot} onClick={()=>{setTime(slot);setError('')}} className={`rounded-xl border px-2 py-2 text-xs transition-colors ${time===slot?'border-[#FED700] bg-[#FED700] text-[#111111] font-bold':'border-[#C0C0C0]/20 bg-[#111111] text-white hover:border-[#FED700]'}`}>{slot}</button>)}</div></div><label className="block text-sm text-[#C0C0C0]">Nombre completo<input value={name} onChange={event=>setName(event.target.value)} type="text" placeholder="Tu nombre" className="mt-2 w-full rounded-xl border border-[#C0C0C0]/20 bg-[#111111] px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-[#FED700]"/></label><label className="block text-sm text-[#C0C0C0]">Teléfono<input value={customerPhone} onChange={event=>setCustomerPhone(event.target.value)} type="tel" placeholder="986 000 0000" className="mt-2 w-full rounded-xl border border-[#C0C0C0]/20 bg-[#111111] px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-[#FED700]"/></label><label className="block text-sm text-[#C0C0C0]">Notas opcionales<textarea value={notes} onChange={event=>setNotes(event.target.value)} rows={3} placeholder="Alguna preferencia o detalle" className="mt-2 w-full resize-none rounded-xl border border-[#C0C0C0]/20 bg-[#111111] px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-[#FED700]"/></label>{error&&<p role="alert" className="text-sm text-[#D87000]">{error}</p>}<button type="button" onClick={submitBooking} className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#FED700] px-6 py-4 text-sm font-black uppercase tracking-widest text-[#111111] shadow-lg shadow-[#FED700]/20 transition-colors hover:bg-[#D87000]"><Icon name="whatsapp" size={20}/> Confirmar y agendar por WhatsApp</button></div></div>
      </div>
    </div></div>;
}

function App(){
  const [loading,setLoading]=useState(true);
  const [progress,setProgress]=useState(0);
  const [menu,setMenu]=useState(false);
  const [activeService,setActiveService]=useState<string|null>(null);
  const [galleryOpen,setGalleryOpen]=useState<number|null>(null);
  const [reviewPage,setReviewPage]=useState(0);
  const [bookingOpen,setBookingOpen]=useState(false);

  useEffect(()=>{
    const start=performance.now();
    let frame=0;
    const tick=(now:number)=>{
      const progressValue=Math.min(100,Math.round(((now-start)/1500)*100));
      setProgress(progressValue);
      if(progressValue<100) frame=requestAnimationFrame(tick); else setLoading(false);
    };
    frame=requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(frame);
  },[]);

  const phone='tel:+529861120699';
  const whatsapp=phone;
  const mapsUrl='https://maps.app.goo.gl/fmKfpriT696j39Nq6';
  const openingHours=[
    ['Jueves','9 a.m.–10 p.m.'],
    ['Viernes','9 a.m.–10 p.m.'],
    ['Sábado','9 a.m.–10 p.m.'],
    ['Domingo','9 a.m.–2 p.m.'],
    ['Lunes','9 a.m.–10 p.m.'],
    ['Martes','9 a.m.–10 p.m.'],
    ['Miércoles','9 a.m.–10 p.m.']
  ];
  const reviewPageCount=Math.ceil(reviews.length/3);
  const visibleReviews=reviews.slice(reviewPage*3,reviewPage*3+3);
  const navItems=useMemo(()=>[['Servicios','#servicios'],['Nosotros','#nosotros'],['Reseñas','#resenas'],['Galería','#galeria'],['Ubicación','#ubicacion'],['Contacto','#contacto']] as const,[]);

  return <div className="min-h-screen bg-[#111111] text-white selection:bg-[#FED700] selection:text-[#111111]">
    {loading && <div className="fixed inset-0 z-[100] bg-[#111111] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-30 hero-grid"/>
      <div className="relative z-10 flex flex-col items-center">
        <img src={LOGO_IMG} alt="Hunter BarberShop" className="w-48 h-48 object-contain animate-pulse" />
        <div className="mt-8 h-px w-28 bg-white/15"><div className="h-full bg-[#FED700]" style={{width:`${progress}%`}}/></div>
      </div>
    </div>}

    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 bg-[#111111]/85 backdrop-blur-md border-b border-[#C0C0C0]/10">
      <a href="#inicio" className="flex items-center gap-3 group">
        <img src={LOGO_IMG} alt="Hunter BarberShop" className="w-16 h-12 object-contain group-hover:scale-105 transition-transform" />
      </a>
      <div className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider text-[#E0E0E0]">
        {navItems.map(([label,href])=><a key={href} href={href} className="hover:text-[#FED700] transition-colors">{label}</a>)}
      </div>
      <div className="flex items-center gap-2">
        <a href="#agendar" onClick={event=>{event.preventDefault();setBookingOpen(true)}} className="hidden sm:inline-flex px-5 py-2.5 bg-[#FED700] hover:bg-[#D87000] text-[#111111] font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-[#FED700]/20 transition-all transform hover:scale-105">Agendar Cita</a>
        <button aria-label="Abrir menú" onClick={()=>setMenu(!menu)} className="lg:hidden p-2 text-[#FED700]">{menu?<Icon name="x"/>:<Icon name="menu"/>}</button>
      </div>
    </nav>

    {menu && <div className="fixed top-[61px] inset-x-0 z-40 bg-[#111111]/98 border-b border-[#FED700]/20 lg:hidden">
      <div className="px-5 py-4 space-y-1">{navItems.map(([label,href])=><a onClick={()=>setMenu(false)} key={href} href={href} className="block px-2 py-3 text-sm uppercase tracking-widest text-white hover:text-[#FED700]">{label}</a>)}<a onClick={event=>{event.preventDefault();setMenu(false);setBookingOpen(true)}} href="#agendar" className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#FED700] text-[#111111] font-sauce-bold py-3">Agendar cita</a></div>
    </div>}

    <main>
      <section id="inicio" className="h-[100svh] min-h-0 w-full overflow-hidden flex flex-col pt-20 md:pt-24 px-3 md:px-6 pb-3 md:pb-4 gap-2 bg-[#111111]">
        <div className="relative flex-1 min-h-0 rounded-2xl overflow-hidden border border-[#FED700]/20 gold-glow noise">
          <img src={HERO_BG} alt="Interior de Hunter BarberShop" fetchPriority="high" decoding="async" className="absolute inset-0 w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-[#111111]/70"/>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,215,0,.10),transparent_42%),linear-gradient(180deg,rgba(17,17,17,.15),rgba(17,17,17,.92))]"/>
          <div className="absolute inset-0 hero-grid opacity-50"/>
          <div className="relative h-full min-h-0 flex flex-col justify-between p-4 md:p-8 lg:p-10">
            <div className="flex justify-between items-start text-[10px] uppercase tracking-[.3em] text-[#C0C0C0]"><span>Valentín Campos</span><span className="hidden sm:block">Desde 2025</span></div>
            <div className="text-center max-w-5xl mx-auto">
              <img src={LOGO_IMG} alt="Hunter BarberShop" className="mx-auto mb-4 md:mb-6 w-[min(62vw,20rem)] lg:w-[min(32vw,18rem)] h-auto object-contain drop-shadow-[0_4px_24px_rgba(254,215,0,0.22)]" />
              <div className="mt-3 md:mt-5 inline-flex items-center gap-2 border border-[#C0C0C0]/30 bg-[#111111]/50 backdrop-blur px-3 md:px-4 py-2 rounded-full text-[#E0E0E0] text-[10px] md:text-xs uppercase tracking-[.2em]">Tradición clásica <span className="text-[#FED700]">•</span> Estilo contemporáneo</div>
              <div className="mt-5 md:mt-7"><a href="#agendar" onClick={event=>{event.preventDefault();setBookingOpen(true)}} className="inline-flex items-center gap-3 px-6 md:px-10 py-3.5 md:py-4 bg-[#FED700] hover:bg-[#D87000] text-[#111111] font-black text-xs md:text-base uppercase tracking-widest rounded-full shadow-2xl transition-transform hover:scale-105"><Icon name="calendar" size={21}/> Agendar Cita Ahora <Icon name="arrow" size={19}/></a></div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 text-xs md:text-sm text-[#E0E0E0]">
              <p className="max-w-xl"> </p>
              <div className="flex items-center gap-2"><StarRow/><span>5.0  <span className="text-white/50">(Google Rating)</span></span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="w-full py-20 px-4 md:px-8 bg-[#111111]">
        <div className="max-w-7xl mx-auto"><div className="mb-10"><div className="text-xs uppercase tracking-widest text-[#FED700] font-bold">Nuestros trabajos de maestría</div><h2 className="mt-2 text-3xl md:text-5xl font-sauce-bold text-white">Servicios de Barbería</h2><p className="mt-3 max-w-2xl text-[#C0C0C0] text-sm">Cada servicio está diseñado alrededor de una idea sencilla: precisión, ritual y un resultado que se note.</p></div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {services.map((s)=><article key={s.id} className="bg-[#181818] border border-[#C0C0C0]/15 hover:border-[#FED700]/60 transition-all rounded-2xl p-6 min-h-[285px] flex flex-col justify-between group">
              <div><div className="text-[#D87000] font-bold text-sm tracking-widest">{s.id}</div><h3 className="mt-7 text-xl md:text-2xl font-bold text-white group-hover:text-[#FED700] whitespace-pre-line transition-colors">{s.name}</h3><p className="text-xs md:text-sm text-[#C0C0C0] mt-3 leading-relaxed">{s.description}</p></div>
              <div className="pt-6 flex items-end justify-between gap-3"><div><div className="text-lg font-black text-[#FED700]">{s.price}</div></div><button onClick={()=>setBookingOpen(true)} className="px-4 py-2 rounded-full border border-[#C0C0C0]/25 hover:border-[#FED700] hover:bg-[#FED700] hover:text-[#111111] text-[10px] font-bold uppercase tracking-widest transition-colors">Reservar</button></div>
              {activeService===s.id && <div className="fixed inset-0 z-[70] bg-black/75 flex items-center justify-center p-4" onClick={()=>setActiveService(null)}><div className="max-w-md w-full bg-[#181818] border border-[#FED700]/40 rounded-2xl p-7" onClick={e=>e.stopPropagation()}><div className="text-[#D87000] font-bold text-sm">{s.id} / SERVICIO</div><h4 className="mt-2 text-2xl font-sauce-bold whitespace-pre-line">{s.name}</h4><p className="mt-4 text-sm text-[#C0C0C0]">Para reservar este servicio, abre WhatsApp y envía el mensaje prellenado.</p><div className="mt-6 flex gap-3"><a href={whatsapp} className="flex-1 rounded-full bg-[#FED700] text-[#111111] px-5 py-3 text-center text-xs font-black uppercase tracking-widest">Abrir WhatsApp</a><button onClick={()=>setActiveService(null)} className="px-5 rounded-full border border-[#C0C0C0]/20 text-xs uppercase tracking-wider">Cerrar</button></div></div></div>}
            </article>)}
          </div>
        </div>
      </section>

      <section id="nosotros" className="w-full py-20 px-4 md:px-8 bg-[#111111] border-t border-[#C0C0C0]/10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[.9fr_1.1fr] gap-12 lg:gap-20 items-center">
          <div className="relative"><div className="absolute -inset-3 border border-[#FED700]/15 rounded-3xl translate-x-3 translate-y-3"/><div className="relative aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-[#FED700]/30"><img src={BIO_IMG} alt="Barbero fundador" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale-[.25]"/><div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent"/><div className="absolute bottom-5 left-5 right-5"><span className="inline-flex px-3 py-2 rounded-full bg-[#FED700] text-[#111111] text-[10px] font-black uppercase tracking-widest">Desde 2025 forjando estilo</span></div></div></div>
          <div><div className="text-xs uppercase tracking-widest text-[#FED700] font-bold">La historia</div><h2 className="mt-2 text-3xl md:text-5xl font-sauce-bold leading-tight">El Arte del Afeitado &amp; la Disciplina del Estilo</h2><div className="w-20 h-1 bg-[#FED700] mt-7"/><p className="mt-7 text-[#C0C0C0] leading-8">Hunter nació para rescatar la ceremonia clásica de la barbería y llevarla a un lenguaje contemporáneo. El símbolo de la corona representa carácter; el poste de barbero, oficio y tradición. Cada visita combina técnica, higiene rigurosa y atención al detalle.</p><p className="mt-4 text-[#C0C0C0] leading-8">Desde el fade perfectamente conectado hasta el ritual de toalla caliente, la experiencia está pensada para que salgas arreglado, ligero y con la sensación de haber cuidado de ti mismo.</p><blockquote className="mt-7 pl-5 border-l-2 border-[#D87000] text-[#D87000] italic text-lg">“El estilo no se improvisa. Se trabaja con disciplina.”</blockquote>{/* <div className="grid grid-cols-3 gap-3 mt-9"><div> <div className="text-2xl md:text-3xl font-sauce-bold text-[#FED700]">1+</div><div className="text-[10px] uppercase tracking-widest text-[#C0C0C0] mt-1">Años</div></div><div><div className="text-2xl md:text-3xl font-sauce-bold text-[#FED700]">15K+</div><div className="text-[10px] uppercase tracking-widest text-[#C0C0C0] mt-1">Cortes</div></div><div><div className="text-2xl md:text-3xl font-sauce-bold text-[#FED700]">100%</div><div className="text-[10px] uppercase tracking-widest text-[#C0C0C0] mt-1">Satisfacción</div></div></div> */}</div>
        </div>
      </section>

      <section id="resenas" className="w-full py-20 px-4 md:px-8 bg-[#151515]">
        <div className="max-w-7xl mx-auto"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10"><div><div className="text-xs uppercase tracking-widest text-[#FED700] font-bold">Google Reviews</div><h2 className="mt-2 text-3xl md:text-5xl font-sauce-bold">Lo que dicen nuestros clientes</h2></div><div className="border border-[#C0C0C0]/15 bg-[#111111] rounded-2xl px-5 py-4"><div className="flex items-center gap-2"><div className="text-2xl font-sauce-bold text-white">5.0</div><StarRow/></div><div className="text-[10px] uppercase tracking-widest text-[#C0C0C0] mt-1">Basado en 16 opiniones de Google</div></div></div>
          <div className="relative"><div className="grid lg:grid-cols-3 gap-4">{visibleReviews.map(r=><article key={r.author} className="bg-[#111111] border border-[#C0C0C0]/15 rounded-2xl p-6 shadow-xl relative"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-11 h-11 rounded-full bg-[#FED700]/15 text-[#FED700] flex items-center justify-center font-bold">{r.author.charAt(0)}</div><div><div className="font-bold text-white">{r.author}</div><div className="text-[10px] text-[#C0C0C0] mt-0.5">{r.relativeTime}</div></div></div><span className="w-6 h-6 rounded-full border border-[#FED700]/30 text-[#FED700] flex items-center justify-center"><Icon name="check" size={13}/></span></div><div className="mt-5"><StarRow/></div><div className="mt-4 w-9 h-9 rounded-full bg-[#FED700]/10 text-[#FED700] flex items-center justify-center"><Icon name="quote" size={17}/></div><p className="mt-3 text-sm leading-7 text-[#E0E0E0]">{r.comment}</p></article>)}</div><div className="mt-6 flex items-center justify-between"><div className="flex items-center gap-2"><button type="button" aria-label="Ver reseñas anteriores" onClick={()=>setReviewPage(page=>(page-1+reviewPageCount)%reviewPageCount)} className="w-10 h-10 rounded-full border border-[#C0C0C0]/20 text-[#FED700] hover:border-[#FED700] transition-colors rotate-180"><Icon name="arrow" size={17}/></button><button type="button" aria-label="Ver más reseñas" onClick={()=>setReviewPage(page=>(page+1)%reviewPageCount)} className="w-10 h-10 rounded-full border border-[#C0C0C0]/20 text-[#FED700] hover:border-[#FED700] transition-colors"><Icon name="arrow" size={17}/></button><span className="ml-2 text-[10px] uppercase tracking-widest text-[#C0C0C0]">{reviewPage+1} / {reviewPageCount}</span></div><a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#FED700] hover:text-white transition-colors">Ver todas las reseñas en Google Maps <Icon name="arrow" size={16}/></a></div></div>
          </div>
        </section>

        <section id="galeria" className="w-full py-20 px-4 md:px-8 bg-[#111111]">
        <div className="max-w-7xl mx-auto"><div className="mb-10"><div className="text-xs uppercase tracking-widest text-[#FED700] font-bold">Photo showcase</div><h2 className="mt-2 text-3xl md:text-5xl font-sauce-bold">El taller, de cerca</h2></div><div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">{GALLERY.map(([src,cap],i)=><button key={src} onClick={()=>setGalleryOpen(i)} className={`group relative overflow-hidden rounded-2xl border border-[#C0C0C0]/10 text-left ${i===0?'md:col-span-2 md:row-span-2 min-h-[420px]':'min-h-[200px]'}`}><img src={src} alt={cap} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"/><div className="absolute inset-x-0 bottom-0 p-4"><div className="text-[10px] uppercase tracking-widest text-[#FED700]">Hunter / Detail</div><div className="font-bold text-white mt-1">{cap}</div></div></button>)}</div></div>
        {galleryOpen!==null && <div className="fixed inset-0 z-[80] bg-black/90 flex items-center justify-center p-4" onClick={()=>setGalleryOpen(null)}><div className="relative max-w-5xl w-full" onClick={e=>e.stopPropagation()}><img src={GALLERY[galleryOpen][0]} alt={GALLERY[galleryOpen][1]} className="max-h-[80vh] w-full object-contain rounded-2xl"/><div className="mt-3 flex items-center justify-between"><div><div className="text-[#FED700] text-xs uppercase tracking-widest">Gallery</div><div className="font-bold">{GALLERY[galleryOpen][1]}</div></div><button onClick={()=>setGalleryOpen(null)} className="px-4 py-2 rounded-full border border-white/20 text-xs">Cerrar</button></div></div></div>}
      </section>

      <section id="ubicacion" className="w-full py-20 px-4 md:px-8 bg-[#151515] border-t border-[#C0C0C0]/10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.15fr_.85fr] gap-5">
          <div className="min-h-[430px] rounded-3xl overflow-hidden border border-[#C0C0C0]/15 relative bg-[#111111]">
            <iframe title="Previsualización del mapa de Hunter BarberShop" loading="lazy" className="absolute inset-0 w-full h-full border-0 opacity-60 grayscale" src="https://www.openstreetmap.org/export/embed.html?bbox=-88.157%2C21.149%2C-88.144%2C21.157&layer=mapnik&marker=21.1531603%2C-88.1505589"/>
            <div className="absolute inset-0 bg-[#111111]/45 pointer-events-none"/>
            <div className="absolute top-6 left-6 z-20 flex flex-col items-start gap-2 pointer-events-none"><span className="px-1 py-1 text-xs uppercase tracking-widest font-bold text-[#FED700] [text-shadow:0_2px_8px_#111111]">Ubicación</span><span className="px-1 py-1 text-2xl md:text-3xl font-sauce-bold text-white [text-shadow:0_2px_8px_#111111]">Ven a visitarnos</span></div>
            <a href={mapsUrl} target="_blank" rel="noreferrer" aria-label="Abrir ubicación en Google Maps" className="absolute inset-0 z-10"/>
            <div className="absolute left-[44%] top-[49%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"><div className="w-16 h-16 rounded-full bg-[#FED700]/10 border border-[#FED700]/40 flex items-center justify-center animate-pulse"><div className="w-4 h-4 rounded-full bg-[#FED700] shadow-[0_0_30px_rgba(254,215,0,.7)]"/></div></div>
            <div className="absolute left-6 bottom-6 right-6 flex justify-between items-end pointer-events-none"><div><div className="text-[10px] uppercase tracking-[.25em] text-[#FED700]">Hunter BarberShop</div><div className="font-sauce-bold text-xl mt-1">Calle 50 240-x 33 y 35</div><div className="text-xs text-[#C0C0C0] mt-1">Centro, Tizimín, Yuc.</div></div><div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-[#111111]/70 border border-[#C0C0C0]/15 text-xs text-[#E0E0E0]"><Icon name="map" size={15}/> Tizimín</div></div>
          </div>
          <div className="bg-[#111111] border border-[#C0C0C0]/15 rounded-3xl p-7 md:p-9"><div className="text-xs uppercase tracking-widest text-[#FED700] font-bold">Horarios de atención</div><h2 className="mt-2 text-3xl font-sauce-bold">Nuestros horarios</h2><div className="mt-8 space-y-3">{openingHours.map(([day,hours])=><div key={day} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm last:border-b-0 last:pb-0"><span className="text-[#C0C0C0]">{day}</span><span className="text-white font-bold">{hours}</span></div>)}</div></div>
        </div>
      </section>

      {bookingOpen&&<BookingSection services={services} onClose={()=>setBookingOpen(false)}/>}

      <footer id="contacto" className="w-full py-16 px-4 md:px-8 bg-[#0D0D0D] border-t border-[#FED700]/20">
        <div className="max-w-7xl mx-auto"><div className="rounded-3xl border border-[#FED700]/50 bg-[radial-gradient(circle_at_50%_0%,rgba(254,215,0,.11),transparent_38%),#111111] p-7 md:p-12 text-center relative overflow-hidden"><div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#FED700]/5 blur-3xl rounded-full"/><div className="relative"><div className="text-xs uppercase tracking-[.3em] text-[#FED700] font-bold">Tu siguiente corte empieza aquí</div><h2 className="mt-3 text-3xl md:text-6xl font-sauce-bold text-balance">¿Listo para tu próximo nivel de estilo?</h2><p className="mx-auto mt-4 max-w-2xl text-[#C0C0C0] text-sm md:text-base">Agenda por WhatsApp y cuéntanos qué servicio quieres. Fácil, directo y sin vueltas.</p><div className="mt-8"><a href={whatsapp} className="inline-flex items-center gap-3 px-7 md:px-10 py-4 bg-[#FED700] hover:bg-[#D87000] text-[#111111] font-black text-sm uppercase tracking-widest rounded-full shadow-2xl transition-transform hover:scale-105"><Icon name="calendar" size={21}/> Agendar Cita Ahora </a></div></div></div>
          <div className="mt-12 flex flex-col md:flex-row justify-between gap-8 items-start md:items-center"><div><div className="font-sauce-bold text-2xl tracking-wider text-[#FED700]">HUNTER</div><div className="text-[10px] tracking-[.32em] text-white mt-1">BARBERSHOP</div></div><div className="flex flex-wrap gap-2">{[['Instagram','instagram'],['TikTok','tiktok'],['WhatsApp','whatsapp'],['Facebook','facebook']].map(([label,icon])=><a key={label} href={icon==='whatsapp'?whatsapp:'#'} aria-label={label} className="w-11 h-11 rounded-full border border-[#C0C0C0]/15 flex items-center justify-center text-[#C0C0C0] hover:text-[#FED700] hover:border-[#FED700]/50 transition-all"><Icon name={icon} size={18}/></a>)}</div></div>
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3 justify-between text-[10px] uppercase tracking-widest text-[#C0C0C0]"><span>© 2026 Hunter BarberShop. Todos los derechos reservados.</span><span></span></div>
        </div>
      </footer>
    </main>
  </div>
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
