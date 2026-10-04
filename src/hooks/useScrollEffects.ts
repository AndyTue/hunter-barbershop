import { useEffect, useRef, useState } from 'react';
import { SECTION_IDS } from '../data/site';

export function useScrolled(threshold = 120) {
  const [scrolled, setScrolled] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const wasPast = useRef(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      const past = window.scrollY > threshold;
      if (past && !wasPast.current) {
        setBubbleVisible(true);
        timer = setTimeout(() => setBubbleVisible(false), 4000);
      }
      wasPast.current = past;
      setScrolled(past);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, [threshold]);

  return { scrolled, bubbleVisible };
}

export function useScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
      setAtBottom(max > 0 && max - window.scrollY < 400);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { barRef, atBottom };
}

export function useActiveSection() {
  const [active, setActive] = useState<string>('inicio');

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return active;
}

export function useRevealOnScroll() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}
