const DAY_MS = 86_400_000;
const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'always' });

export function relativeTime(isoDate: string, now = new Date()): string {
  const days = Math.max(0, Math.round((now.getTime() - new Date(`${isoDate}T12:00:00`).getTime()) / DAY_MS));
  if (days < 1) return 'Hoy';
  if (days < 7) return capitalize(rtf.format(-days, 'day'));
  if (days < 30) return capitalize(rtf.format(-Math.floor(days / 7), 'week'));
  if (days < 365) return capitalize(rtf.format(-Math.floor(days / 30), 'month'));
  return capitalize(rtf.format(-Math.floor(days / 365), 'year'));
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
