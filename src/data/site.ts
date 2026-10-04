export const WHATSAPP_NUMBER = '529994845979';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const INSTAGRAM_URL = 'https://www.instagram.com/hunterbarbershop_/';
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61582343666473&locale=es_LA';
export const MAPS_URL = 'https://maps.app.goo.gl/fmKfpriT696j39Nq6';
export const REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJ74gwQgCyUo8R9CIKPFMlI6U';

export const GOOGLE_RATING = { score: 5, count: 16 } as const;

export const SOCIAL_LINKS = [
  { label: 'WhatsApp', icon: 'whatsapp', href: WHATSAPP_URL },
  { label: 'Instagram', icon: 'instagram', href: INSTAGRAM_URL },
  { label: 'Facebook', icon: 'facebook', href: FACEBOOK_URL }
] as const;

export const NAV_ITEMS = [
  ['Servicios', '#servicios'],
  ['Nosotros', '#nosotros'],
  ['Reseñas', '#resenas'],
  ['Galería', '#galeria'],
  ['Ubicación', '#ubicacion'],
  ['Contacto', '#contacto']
] as const;

export const SECTION_IDS = ['inicio', 'servicios', 'nosotros', 'resenas', 'galeria', 'ubicacion', 'contacto'] as const;

export const OPENING_HOURS = [
  ['Lunes', '9 a.m.–10 p.m.'],
  ['Martes', '9 a.m.–10 p.m.'],
  ['Miércoles', '9 a.m.–10 p.m.'],
  ['Jueves', '9 a.m.–10 p.m.'],
  ['Viernes', '9 a.m.–10 p.m.'],
  ['Sábado', '9 a.m.–10 p.m.'],
  ['Domingo', '9 a.m.–2 p.m.']
] as const;
