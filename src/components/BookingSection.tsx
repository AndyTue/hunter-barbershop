import React, { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { WHATSAPP_URL } from '../data/site';
import type { Service } from '../data/services';
import { capitalize } from '../lib/format';

type Field='services'|'date'|'time'|'name'|'phone';
const STEPS=['Servicios','Fecha y hora','Tus datos'] as const;
const STEP_FIELDS:Field[][]=[['services'],['date','time'],['name','phone']];
const MISSING_LABEL:Record<Field,string>={services:'Elige un servicio',date:'Elige una fecha',time:'Elige un horario',name:'Escribe tu nombre',phone:'Escribe tu teléfono'};
const pad2=(n:number)=>String(n).padStart(2,'0');
const dateKeyOf=(d:Date)=>`${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
const hourLabel=(h:number)=>`${h%12===0?12:h%12}:00 ${h<12?'a. m.':'p. m.'}`;
const formatPhone=(raw:string)=>{
  const d=raw.replace(/\D/g,'').slice(0,10);
  return [d.slice(0,3),d.slice(3,6),d.slice(6,10)].filter(Boolean).join(' ');
};
const slotsFor=(key:string,now:Date)=>{
  const last=new Date(`${key}T12:00:00`).getDay()===0?14:21;
  const isToday=key===dateKeyOf(now);
  const nowMin=now.getHours()*60+now.getMinutes();
  return Array.from({length:last-9+1},(_,i)=>{
    const hour=9+i;
    return {hour,label:hourLabel(hour),disabled:isToday&&hour*60<nowMin+30};
  });
};

export function BookingSection({services,onClose}:{services:Service[];onClose:()=>void}){
  const now=new Date();
  const todayKey=dateKeyOf(now);
  const [step,setStep]=useState(0);
  const [sent,setSent]=useState(false);
  const [waUrl,setWaUrl]=useState('');
  const [selectedIds,setSelectedIds]=useState<string[]>([]);
  const [date,setDate]=useState('');
  const [time,setTime]=useState('');
  const [name,setName]=useState('');
  const [customerPhone,setCustomerPhone]=useState('');
  const [notes,setNotes]=useState('');
  const [attempted,setAttempted]=useState(false);
  const [touched,setTouched]=useState<Partial<Record<Field,boolean>>>({});
  const [calendarMonth,setCalendarMonth]=useState(()=>new Date(now.getFullYear(),now.getMonth(),1,12));
  const dialogRef=useRef<HTMLDivElement>(null);
  const bodyRef=useRef<HTMLDivElement>(null);
  const onCloseRef=useRef(onClose);
  onCloseRef.current=onClose;

  const monthStart=new Date(calendarMonth.getFullYear(),calendarMonth.getMonth(),1,12);
  const daysInMonth=new Date(calendarMonth.getFullYear(),calendarMonth.getMonth()+1,0,12).getDate();
  const leadingDays=(monthStart.getDay()+6)%7;
  const calendarDays=Array.from({length:leadingDays+daysInMonth},(_,index)=>index<leadingDays?null:index-leadingDays+1);
  const canGoPrevious=monthStart.getFullYear()*12+monthStart.getMonth()>now.getFullYear()*12+now.getMonth();
  const monthLabel=calendarMonth.toLocaleDateString('es-MX',{month:'long',year:'numeric'});
  const selectedServices=services.filter(service=>selectedIds.includes(service.id));
  const totalPrice=selectedServices.reduce((total,service)=>total+(Number(service.price.replace(/[^0-9]/g,''))||0),0);
  const selectedDate=date?new Date(`${date}T12:00:00`):null;
  const isSunday=selectedDate?.getDay()===0;
  const slots=date?slotsFor(date,now):[];
  const morning=slots.filter(slot=>slot.hour<12);
  const afternoon=slots.filter(slot=>slot.hour>=12);
  const phoneDigits=customerPhone.replace(/\D/g,'');
  const prettyDate=selectedDate?capitalize(selectedDate.toLocaleDateString('es-MX',{weekday:'long',day:'numeric',month:'long',year:'numeric'})):'';
  const shortDate=selectedDate?capitalize(selectedDate.toLocaleDateString('es-MX',{weekday:'short',day:'numeric',month:'short'})):'';

  const errors:Record<Field,string>={
    services:selectedServices.length===0?'Elige al menos un servicio.':'',
    date:!date?'Elige una fecha.':'',
    time:!time?'Elige un horario.':slots.some(slot=>slot.label===time&&!slot.disabled)?'':'Ese horario ya no está disponible.',
    name:name.trim().length<2?'Escribe tu nombre completo.':'',
    phone:phoneDigits.length!==10?'Escribe un teléfono de 10 dígitos.':''
  };
  const stepValid=(index:number)=>STEP_FIELDS[index].every(field=>!errors[field]);
  const firstError=STEP_FIELDS[step].find(field=>errors[field]);
  const showError=(field:Field)=>Boolean(errors[field])&&(attempted||Boolean(touched[field]));
  const touch=(field:Field)=>setTouched(current=>({...current,[field]:true}));

  useEffect(()=>{
    const previous=document.activeElement as HTMLElement|null;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    dialogRef.current?.focus();
    const onKey=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){onCloseRef.current();return;}
      if(event.key!=='Tab'||!dialogRef.current) return;
      const focusable=Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input,textarea')).filter(el=>el.offsetParent!==null);
      if(focusable.length===0) return;
      const first=focusable[0];
      const last=focusable[focusable.length-1];
      const active=document.activeElement;
      if(event.shiftKey&&(active===first||active===dialogRef.current)){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&active===last){event.preventDefault();first.focus();}
    };
    document.addEventListener('keydown',onKey);
    return ()=>{
      document.removeEventListener('keydown',onKey);
      document.body.style.overflow=previousOverflow;
      previous?.focus?.();
    };
  },[]);

  const toggleService=(id:string)=>setSelectedIds(current=>current.includes(id)?current.filter(item=>item!==id):[...current,id]);

  const changeStep=(next:number)=>{
    setStep(next);
    setAttempted(false);
    bodyRef.current?.scrollTo({top:0});
  };

  const goTo=(index:number)=>{
    if(index<=step){changeStep(index);return;}
    const blocked=Array.from({length:index},(_,i)=>i).find(i=>!stepValid(i));
    if(blocked===undefined) changeStep(index);
    else{
      if(blocked!==step) changeStep(blocked);
      setAttempted(true);
    }
  };

  const submitBooking=()=>{
    const serviceSummary=selectedServices.map(service=>`${service.name} (${service.price})`).join(', ');
    const message=[
      'Buen día, equipo de *Hunter BarberShop*.',
      '',
      `Mi nombre es ${name.trim()} y me gustaría solicitar una cita con los siguientes datos:`,
      '',
      '*SOLICITUD DE CITA*',
      `*Servicios:* ${serviceSummary}`,
      `*Total estimado:* $${totalPrice.toLocaleString('es-MX')} MXN`,
      `*Fecha:* ${prettyDate}`,
      `*Horario:* ${time}`,
      `*Teléfono de contacto:* ${formatPhone(customerPhone)}`,
      notes.trim()?`*Notas:* ${notes.trim()}`:'',
      '',
      '¿Me podrían confirmar la disponibilidad? Quedo atento(a). Muchas gracias.'
    ].filter((line,i,arr)=>line!==''||(arr[i-1]!==''&&i>0)).join('\n');
    const url=`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
    window.open(url,'_blank','noopener,noreferrer');
    setWaUrl(url);
    setSent(true);
    bodyRef.current?.scrollTo({top:0});
  };

  const handlePrimary=()=>{
    if(firstError){
      setAttempted(true);
      requestAnimationFrame(()=>{
        const el=document.getElementById(`bk-${firstError}`);
        el?.scrollIntoView({block:'center',behavior:'smooth'});
        if(el instanceof HTMLInputElement) el.focus({preventScroll:true});
      });
      return;
    }
    if(step<STEPS.length-1) changeStep(step+1);
    else submitBooking();
  };

  const fieldClass=(field:Field)=>`mt-2 w-full rounded-xl border bg-[#111111] px-4 py-3 text-white placeholder:text-white/35 outline-none transition-colors ${showError(field)?'border-[#D87000] focus:border-[#D87000]':'border-[#C0C0C0]/20 focus:border-[#FED700]'}`;
  const fieldError=(field:Field)=>showError(field)?<p id={`bk-${field}-err`} role="alert" className="mt-2 text-xs text-[#ff9a5c]">{errors[field]}</p>:null;
  const isLast=step===STEPS.length-1;

  return <div id="agendar" className="modal-fade fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 sm:p-4" onClick={onClose}>
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="bk-title" tabIndex={-1} className="modal-pop flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-[#FED700]/30 bg-[#111111] shadow-2xl outline-none" onClick={event=>event.stopPropagation()}>

      <header className="shrink-0 border-b border-white/10 px-5 pb-5 pt-5 md:px-8 md:pt-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#FED700]">Reserva tu espacio</div>
            <h2 id="bk-title" className="mt-1 text-2xl font-sauce-bold md:text-4xl">Agenda tu cita</h2>
          </div>
          <button type="button" aria-label="Cerrar agendamiento" onClick={onClose} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C0C0C0]/20 text-white transition-colors hover:border-[#FED700] hover:text-[#FED700]"><Icon name="x" size={20}/></button>
        </div>
        {!sent&&<>
          <ol className="mt-5 flex items-center gap-2 sm:gap-3" aria-label="Pasos de la reserva">
            {STEPS.map((label,i)=>{
              const done=i<step;
              const active=i===step;
              return <React.Fragment key={label}>
                {i>0&&<li aria-hidden="true" className={`h-px flex-1 transition-colors duration-500 ${i<=step?'bg-[#FED700]':'bg-white/15'}`}/>}
                <li>
                  <button type="button" onClick={()=>goTo(i)} aria-current={active?'step':undefined} className="flex items-center gap-2">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300 ${active?'border-[#FED700] bg-[#FED700] text-[#111111]':done?'border-[#FED700] text-[#FED700]':'border-white/20 text-white/50'}`}>{done?<Icon name="check" size={14}/>:i+1}</span>
                    <span className={`hidden text-xs uppercase tracking-widest sm:inline ${active?'text-white':'text-white/50'}`}>{label}</span>
                  </button>
                </li>
              </React.Fragment>;
            })}
          </ol>
          <p className="mt-3 text-xs uppercase tracking-widest text-[#FED700] sm:hidden">Paso {step+1} de {STEPS.length} · {STEPS[step]}</p>
        </>}
      </header>

      <div ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-6 md:px-8 md:py-8">
        {sent?<div className="step-in mx-auto flex max-w-lg flex-col items-center py-4 text-center">
          <div className="success-badge success-check flex h-20 w-20 items-center justify-center rounded-full bg-[#FED700] text-[#111111] shadow-[0_0_40px_rgba(254,215,0,.35)]">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>
          </div>
          <h3 className="mt-6 text-2xl font-sauce-bold md:text-3xl">¡Solicitud enviada!</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#C0C0C0]">Se abrió WhatsApp con los datos de tu cita. Tu horario queda confirmado cuando recibas nuestra respuesta.</p>
          <div className="mt-6 w-full rounded-2xl border border-[#C0C0C0]/15 bg-[#151515] p-5 text-left text-sm">
            <div className="flex justify-between gap-4"><span className="text-[#C0C0C0]">Servicios</span><span className="text-right font-bold">{selectedServices.map(service=>service.name).join(', ')}</span></div>
            <div className="mt-3 flex justify-between gap-4"><span className="text-[#C0C0C0]">Fecha</span><span className="text-right font-bold">{shortDate}</span></div>
            <div className="mt-3 flex justify-between gap-4"><span className="text-[#C0C0C0]">Hora</span><span className="text-right font-bold">{time}</span></div>
            <div className="mt-4 flex justify-between gap-4 border-t border-white/10 pt-4"><span className="text-[#C0C0C0]">Total estimado</span><span className="font-black text-[#FED700]">${totalPrice.toLocaleString('es-MX')}</span></div>
          </div>
          <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
            <a href={waUrl} target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#C0C0C0]/25 px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors hover:border-[#FED700] hover:text-[#FED700]"><Icon name="whatsapp" size={18}/> Abrir WhatsApp</a>
            <button type="button" onClick={onClose} className="inline-flex flex-1 items-center justify-center rounded-full bg-[#FED700] px-6 py-3.5 text-xs font-black uppercase tracking-widest text-[#111111] transition-colors hover:bg-[#D87000]">Cerrar</button>
          </div>
        </div>

        :<div key={step} className="step-in">
          {step===0&&<div id="bk-services" aria-describedby="bk-services-err">
            <h3 className="text-lg font-bold">¿Qué servicios necesitas?</h3>
            <p className="mt-1 text-sm text-[#C0C0C0]">Puedes elegir más de uno.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {services.map(service=>{
                const selected=selectedIds.includes(service.id);
                return <button type="button" key={service.id} role="checkbox" aria-checked={selected} onClick={()=>toggleService(service.id)} className={`group flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${selected?'border-[#FED700] bg-[#FED700]/10':'border-[#C0C0C0]/15 bg-[#151515] hover:border-[#FED700]/60'}`}>
                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${selected?'border-[#FED700] bg-[#FED700] text-[#111111]':'border-[#C0C0C0]/40 text-transparent'}`}><span className={`transition-transform duration-200 ${selected?'scale-100':'scale-0'}`}><Icon name="check" size={12}/></span></span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-3"><span className="font-bold text-white">{service.name}</span><span className="text-sm font-black text-[#FED700]">{service.price}</span></span>
                    <span className="mt-1.5 line-clamp-2 block text-xs leading-relaxed text-[#C0C0C0]">{service.description}</span>
                  </span>
                </button>;
              })}
            </div>
            {fieldError('services')}
          </div>}

          {step===1&&<div className="grid gap-6 md:grid-cols-2">
            <div id="bk-date">
              <h3 className="text-lg font-bold">Elige el día</h3>
              <div className={`mt-4 rounded-2xl border bg-[#151515] p-3 transition-colors ${showError('date')?'border-[#D87000]':'border-[#C0C0C0]/20'}`}>
                <div className="flex items-center justify-between gap-3 px-1 pb-3">
                  <button type="button" aria-label="Mes anterior" disabled={!canGoPrevious} onClick={()=>setCalendarMonth(current=>new Date(current.getFullYear(),current.getMonth()-1,1,12))} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C0C0C0]/20 text-white transition-colors hover:border-[#FED700] disabled:cursor-not-allowed disabled:opacity-30"><span className="flex rotate-180"><Icon name="arrow" size={16}/></span></button>
                  <div className="text-sm font-bold capitalize text-white" aria-live="polite">{monthLabel}</div>
                  <button type="button" aria-label="Mes siguiente" onClick={()=>setCalendarMonth(current=>new Date(current.getFullYear(),current.getMonth()+1,1,12))} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C0C0C0]/20 text-white transition-colors hover:border-[#FED700]"><Icon name="arrow" size={16}/></button>
                </div>
                <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] uppercase tracking-wider text-[#C0C0C0]">{['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(day=><span key={day}>{day}</span>)}</div>
                <div key={monthLabel} className="step-in mt-2 grid grid-cols-7 gap-1.5">
                  {calendarDays.map((day,index)=>{
                    if(day===null) return <span key={`empty-${index}`} className="h-10"/>;
                    const cell=new Date(calendarMonth.getFullYear(),calendarMonth.getMonth(),day,12);
                    const key=dateKeyOf(cell);
                    const isToday=key===todayKey;
                    const disabled=key<todayKey||(isToday&&slotsFor(key,now).every(slot=>slot.disabled));
                    const selected=date===key;
                    const sunday=cell.getDay()===0;
                    return <button type="button" key={key} disabled={disabled} aria-pressed={selected} onClick={()=>{setDate(key);setTime('')}} className={`relative h-10 rounded-xl border text-xs transition-colors ${selected?'border-[#FED700] bg-[#FED700] font-bold text-[#111111]':disabled?'cursor-not-allowed border-transparent text-white/20':`border-[#C0C0C0]/20 bg-[#111111] hover:border-[#FED700] ${sunday?'text-[#D87000]':'text-white'}`}`}>
                      {day}
                      {isToday&&<span className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${selected?'bg-[#111111]':'bg-[#FED700]'}`}/>}
                    </button>;
                  })}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 px-1 text-[11px] text-[#C0C0C0]">
                  <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#FED700]"/>Hoy</span>
                  <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#D87000]"/>Domingo: 9 a. m. – 2 p. m.</span>
                </div>
              </div>
              {fieldError('date')}
            </div>

            <div id="bk-time">
              <h3 className="text-lg font-bold">Elige la hora</h3>
              {!date?<div className="mt-4 flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-[#C0C0C0]/20 p-6 text-center text-sm text-[#C0C0C0]">Selecciona un día para ver los horarios disponibles.</div>
              :<div className="mt-4 space-y-5">
                <p className="text-sm text-[#FED700]">{prettyDate}</p>
                {isSunday&&<p className="rounded-xl border border-[#D87000]/40 bg-[#D87000]/10 px-3 py-2 text-xs text-[#ffb27a]">Los domingos atendemos con horario reducido: de 9:00 a. m. a 2:00 p. m.</p>}
                {[['Mañana',morning],['Tarde',afternoon]].map(([label,list])=>(list as typeof slots).length>0&&<div key={label as string}>
                  <div className="mb-2 text-[11px] uppercase tracking-widest text-[#C0C0C0]">{label as string}</div>
                  <div className="grid grid-cols-3 gap-2">
                    {(list as typeof slots).map(slot=><button type="button" key={slot.label} disabled={slot.disabled} aria-pressed={time===slot.label} onClick={()=>setTime(slot.label)} className={`rounded-xl border px-1 py-2.5 text-xs transition-colors ${time===slot.label?'border-[#FED700] bg-[#FED700] font-bold text-[#111111]':slot.disabled?'cursor-not-allowed border-transparent text-white/20 line-through':'border-[#C0C0C0]/20 bg-[#151515] text-white hover:border-[#FED700]'}`}>{slot.label}</button>)}
                  </div>
                </div>)}
                {slots.every(slot=>slot.disabled)&&<p className="text-sm text-[#C0C0C0]">Ya no hay horarios disponibles hoy. Elige otro día.</p>}
              </div>}
              {fieldError('time')}
            </div>
          </div>}

          {step===2&&<div className="grid gap-6 md:grid-cols-[1.1fr_.9fr]">
            <div className="space-y-5">
              <h3 className="text-lg font-bold">¿A nombre de quién?</h3>
              <div>
                <label htmlFor="bk-name" className="text-sm text-[#C0C0C0]">Nombre completo</label>
                <input id="bk-name" value={name} onChange={event=>setName(event.target.value)} onBlur={()=>touch('name')} type="text" autoComplete="name" placeholder="Tu nombre" aria-invalid={showError('name')} aria-describedby={showError('name')?'bk-name-err':undefined} className={fieldClass('name')}/>
                {fieldError('name')}
              </div>
              <div>
                <label htmlFor="bk-phone" className="text-sm text-[#C0C0C0]">Teléfono</label>
                <input id="bk-phone" value={customerPhone} onChange={event=>setCustomerPhone(formatPhone(event.target.value))} onBlur={()=>touch('phone')} type="tel" inputMode="tel" autoComplete="tel-national" placeholder="999 000 0000" aria-invalid={showError('phone')} aria-describedby={showError('phone')?'bk-phone-err':undefined} className={fieldClass('phone')}/>
                {fieldError('phone')}
              </div>
              <div>
                <label htmlFor="bk-notes" className="text-sm text-[#C0C0C0]">Notas <span className="text-white/40">(opcional)</span></label>
                <textarea id="bk-notes" value={notes} onChange={event=>setNotes(event.target.value)} rows={3} placeholder="Alguna preferencia o detalle" className="mt-2 w-full resize-none rounded-xl border border-[#C0C0C0]/20 bg-[#111111] px-4 py-3 text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#FED700]"/>
              </div>
            </div>
            <aside className="h-fit rounded-2xl border border-[#C0C0C0]/15 bg-[#151515] p-5 text-sm">
              <div className="text-xs font-bold uppercase tracking-widest text-[#FED700]">Resumen</div>
              <ul className="mt-4 space-y-2">{selectedServices.map(service=><li key={service.id} className="flex justify-between gap-3"><span>{service.name}</span><span className="font-bold text-[#FED700]">{service.price}</span></li>)}</ul>
              <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-[#C0C0C0]">
                <div className="flex justify-between gap-3"><span>Fecha</span><span className="font-bold text-white">{shortDate}</span></div>
                <div className="flex justify-between gap-3"><span>Hora</span><span className="font-bold text-white">{time}</span></div>
              </div>
              <div className="mt-4 flex justify-between gap-3 border-t border-white/10 pt-4"><span className="text-[#C0C0C0]">Total estimado</span><span className="text-lg font-black text-[#FED700]">${totalPrice.toLocaleString('es-MX')}</span></div>
              <p className="mt-4 text-xs leading-relaxed text-[#C0C0C0]">Al enviar se abrirá WhatsApp con tu solicitud. La cita queda confirmada cuando te respondamos.</p>
            </aside>
          </div>}
        </div>}
      </div>

      {!sent&&<footer className="shrink-0 border-t border-white/10 bg-[#0d0d0d] px-5 py-4 md:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 text-sm">
            <div>{selectedServices.length>0?<><span className="text-[#C0C0C0]">{selectedServices.length} servicio{selectedServices.length>1?'s':''} · </span><strong className="text-[#FED700]">${totalPrice.toLocaleString('es-MX')}</strong></>:<span className="text-[#C0C0C0]">Aún no eliges servicios</span>}</div>
            {date&&<div className="mt-0.5 truncate text-xs text-[#C0C0C0]">{shortDate}{time?` · ${time}`:''}</div>}
          </div>
          <div className="flex items-center gap-3">
            {step>0&&<button type="button" onClick={()=>changeStep(step-1)} className="inline-flex h-12 items-center gap-2 rounded-full border border-[#C0C0C0]/25 px-5 text-xs font-bold uppercase tracking-widest transition-colors hover:border-[#FED700] hover:text-[#FED700]"><span className="flex rotate-180"><Icon name="arrow" size={16}/></span>Atrás</button>}
            <button type="button" onClick={handlePrimary} aria-disabled={Boolean(firstError)} className={`inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-6 text-xs font-black uppercase tracking-widest transition-colors sm:flex-none ${firstError?'cursor-not-allowed bg-white/10 text-white/50':'bg-[#FED700] text-[#111111] shadow-lg shadow-[#FED700]/20 hover:bg-[#D87000]'}`}>
              {firstError?MISSING_LABEL[firstError]:isLast?<><Icon name="whatsapp" size={18}/> Enviar por WhatsApp</>:<>Continuar <Icon name="arrow" size={16}/></>}
            </button>
          </div>
        </div>
      </footer>}
    </div>
  </div>;
}
