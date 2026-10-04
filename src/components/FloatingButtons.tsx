import { Icon } from './Icon';

type Props = {
  scrolled: boolean;
  bubbleVisible: boolean;
  atBottom: boolean;
  onBook: () => void;
};

export function FloatingButtons({ scrolled, bubbleVisible, atBottom, onBook }: Props) {
  return (
    <>
      <button type="button" aria-label="Volver arriba" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 left-6 z-[90] w-14 h-14 rounded-full bg-[#FED700] flex items-center justify-center text-[#111111] shadow-2xl shadow-[#FED700]/30 hover:bg-[#D87000] hover:scale-110 transition-all duration-300 ${atBottom ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <span className="-rotate-90 flex"><Icon name="arrow" size={26} /></span>
      </button>
      {scrolled && (
        <div className="fixed bottom-6 right-6 z-[90] flex items-end gap-2">
          {bubbleVisible && (
            <div className="wa-bubble-in mb-1 flex items-center gap-2 bg-[#1a1a1a] border border-[#FED700]/30 text-white text-sm font-medium px-4 py-2.5 rounded-2xl rounded-br-none shadow-xl whitespace-nowrap">
              <span>Agenda tu cita</span>
            </div>
          )}
          <a href="#agendar" onClick={event => { event.preventDefault(); onBook(); }} aria-label="Agendar cita"
            className="wa-fab w-14 h-14 rounded-full bg-[#FED700] flex items-center justify-center text-[#111111] shadow-2xl shadow-[#FED700]/30 hover:bg-[#D87000] hover:scale-110 transition-all duration-300">
            <Icon name="calendar" size={26} />
          </a>
        </div>
      )}
    </>
  );
}
