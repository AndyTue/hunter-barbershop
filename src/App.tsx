import { useRef, useState } from 'react';
import { SERVICES } from './data/services';
import { useActiveSection, useRevealOnScroll, useScrollProgress, useScrolled } from './hooks/useScrollEffects';
import { useSplash } from './hooks/useSplash';
import { AboutSection } from './components/AboutSection';
import { BookingSection } from './components/BookingSection';
import { FloatingButtons } from './components/FloatingButtons';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { Hero } from './components/Hero';
import { LocationSection } from './components/LocationSection';
import { Navbar } from './components/Navbar';
import { ReviewsSection } from './components/ReviewsSection';
import { ServicesSection } from './components/ServicesSection';
import { SplashScreen } from './components/SplashScreen';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const navLogoRef = useRef<HTMLImageElement>(null);
  const { phase, progress, fly, splashLogoRef } = useSplash(navLogoRef);
  const { scrolled, bubbleVisible } = useScrolled();
  const { barRef, atBottom } = useScrollProgress();
  const activeSection = useActiveSection();
  useRevealOnScroll();

  const openBooking = () => setBookingOpen(true);

  return (
    <div className={`min-h-screen bg-[#111111] text-white selection:bg-[#FED700] selection:text-[#111111] ${phase !== 'loading' ? 'app-ready' : ''}`}>
      <SplashScreen phase={phase} progress={progress} fly={fly} logoRef={splashLogoRef} />
      <Navbar scrolled={scrolled} logoVisible={phase === 'done'} logoRef={navLogoRef} progressRef={barRef} activeSection={activeSection} onBook={openBooking} />
      <main>
        <Hero onBook={openBooking} />
        <ServicesSection onBook={openBooking} />
        <AboutSection />
        <ReviewsSection />
        <GallerySection />
        <LocationSection />
        {bookingOpen && <BookingSection services={SERVICES} onClose={() => setBookingOpen(false)} />}
        <FloatingButtons scrolled={scrolled} bubbleVisible={bubbleVisible} atBottom={atBottom} onBook={openBooking} />
        <Footer onBook={openBooking} />
      </main>
    </div>
  );
}
