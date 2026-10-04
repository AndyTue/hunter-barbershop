import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export type SplashPhase = 'loading' | 'exit' | 'done';

const LOAD_MS = 2000;
const EXIT_MS = 1000;

export function useSplash(navLogoRef: RefObject<HTMLImageElement | null>) {
  const [phase, setPhase] = useState<SplashPhase>('loading');
  const [progress, setProgress] = useState(0);
  const [fly, setFly] = useState({ x: 0, y: 0, scale: 1 });
  const splashLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const value = Math.min(100, Math.round(((now - start) / LOAD_MS) * 100));
      setProgress(value);
      if (value < 100) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const from = splashLogoRef.current?.getBoundingClientRect();
      const to = navLogoRef.current?.getBoundingClientRect();
      if (from && to) {
        setFly({
          x: to.left + to.width / 2 - (from.left + from.width / 2),
          y: to.top + to.height / 2 - (from.top + from.height / 2),
          scale: Math.min(to.width / from.width, to.height / from.height)
        });
      }
      setPhase('exit');
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [navLogoRef]);

  useEffect(() => {
    if (phase !== 'exit') return;
    const timer = setTimeout(() => setPhase('done'), EXIT_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  return { phase, progress, fly, splashLogoRef };
}
