import type { ReactNode } from 'react';

const PATHS: Record<string, ReactNode> = {
  x: <><path d="m6 6 12 12"/><path d="M18 6 6 18"/></>,
  calendar: <><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></>,
  map: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  check: <><path d="m5 12 4 4L19 6"/></>,
  arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></>,
  facebook: <><path d="M14 8h3V4h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8Z"/></>,
  whatsapp: <><path d="M20 11.5A8 8 0 0 1 8.2 19L4 20l1-4A8 8 0 1 1 20 11.5Z"/><path d="M9 9.2c.3-.7.6-.7 1-.6l.8.8c.2.2.2.5 0 .8l-.3.4c.7 1.3 1.6 2.1 2.9 2.8l.4-.3c.3-.2.6-.2.8 0l.8.7c.3.3.3.6.1 1-.4.8-1.2 1.1-2 1-2.7-.5-5.5-3.2-6-6-.1-.8.2-1.6.5-2Z"/></>
};

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      {PATHS[name] ?? PATHS.check}
    </svg>
  );
}

export function StarRow() {
  return (
    <div className="flex items-center gap-1 text-[#FED700]" aria-label="5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => <span key={i}>★</span>)}
    </div>
  );
}
