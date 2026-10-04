import type { RefObject } from 'react';
import { LOGO_IMG } from '../assets';
import type { SplashPhase } from '../hooks/useSplash';

type Props = {
  phase: SplashPhase;
  progress: number;
  fly: { x: number; y: number; scale: number };
  logoRef: RefObject<HTMLDivElement | null>;
};

export function SplashScreen({ phase, progress, fly, logoRef }: Props) {
  if (phase === 'done') return null;
  const exiting = phase === 'exit';
  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden ${exiting ? 'pointer-events-none' : ''}`}>
      <div className="splash-bg absolute inset-0 bg-black" style={{ opacity: exiting ? 0 : 1 }} />
      <div ref={logoRef} className="splash-fly relative" style={{ transform: exiting ? `translate(${fly.x}px,${fly.y}px) scale(${fly.scale})` : 'none' }}>
        <img src={LOGO_IMG} alt="Hunter BarberShop" className="splash-logo block w-[min(85vw,440px)] h-auto object-contain drop-shadow-[0_0_40px_rgba(254,215,0,0.35)]" />
      </div>
      <div className="splash-barwrap relative mt-4" style={{ opacity: exiting ? 0 : 1 }}>
        <div className="splash-bar w-[min(52vw,240px)] h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#FED700] rounded-full transition-all duration-75" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
