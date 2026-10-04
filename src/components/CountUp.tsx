import { useEffect, useRef, useState } from 'react';

export function CountUp({to,decimals=0,duration=1400}:{to:number;decimals?:number;duration?:number}){
  const ref=useRef<HTMLSpanElement>(null);
  const [value,setValue]=useState(0);
  useEffect(()=>{
    const el=ref.current;
    if(!el) return;
    let frame=0;
    const io=new IntersectionObserver(([entry])=>{
      if(!entry.isIntersecting) return;
      io.disconnect();
      const start=performance.now();
      const tick=(now:number)=>{
        const t=Math.min(1,(now-start)/duration);
        setValue(to*(1-Math.pow(1-t,3)));
        if(t<1) frame=requestAnimationFrame(tick);
      };
      frame=requestAnimationFrame(tick);
    },{threshold:.4});
    io.observe(el);
    return ()=>{io.disconnect();cancelAnimationFrame(frame);};
  },[to,duration]);
  return <span ref={ref}>{value.toFixed(decimals)}</span>;
}
