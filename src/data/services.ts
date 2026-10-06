export type Service = { id: string; name: string; price: string; description: string; from?: boolean };

export const SERVICES: Service[] = [
  { id: '01', name: 'Corte Fade/Desvanecido', price: '$170', description: 'Degradado preciso y limpio, adaptado a tu estilo y tipo de cabello.' },
  { id: '02', name: 'Corte Clásico', price: '$150', description: 'Corte tradicional con acabado pulido y asesoría para mantener la forma.' },
  { id: '03', name: 'Perfilado de Barba', price: '$100', description: 'Definición de líneas, recorte de barba y aceite hidratante anti-frizz.' },
  { id: '04', name: 'Diseño o Limpieza de Cejas', price: '$100', description: 'Limpieza y diseño personalizado para resaltar la expresión del rostro.' },
  { id: '05', name: 'Depilación de Nariz con Cera', price: '$100', description: 'Depilación rápida y cuidadosa para un acabado limpio y cómodo.' },
  { id: '06', name: 'Hunter VIP', price: '$400', description: 'Una experiencia completa de barbería con atención especial y acabado premium.' },
  { id: '07', name: 'Rizos Permanentes', price: '$1,000', from: true, description: 'Textura y volumen duradero, personalizado según el largo y tipo de cabello.' },
  { id: '08', name: 'Trenzas', price: '$400', from: true, description: 'Trenzado personalizado con un acabado limpio y duradero.' }
];
