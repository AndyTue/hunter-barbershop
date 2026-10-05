import fade from '../../images/fade.jpeg';
import fade2 from '../../images/fade2.jpeg';
import fade3 from '../../images/fade 3.jpeg';
import fadeBarba from '../../images/fade y barba.jpeg';
import fadeBarba2 from '../../images/fade y barba 2.jpeg';
import clasicoBarba from '../../images/clasico y barba .jpeg';
import antesDespues from '../../images/antes y despues fade .jpeg';
import mascarilla from '../../images/Mascarilla puntos negros.jpeg';
import trenzas from '../../images/trenzas.jpeg';

export { default as GALLERY_VIDEO } from '../../images/video corte fade .mp4';

export const GALLERY = [
  [fade, 'Fade clásico'],
  [fadeBarba, 'Fade y barba'],
  [fade3, 'Fade con textura'],
  [antesDespues, 'Antes y después'],
  [clasicoBarba, 'Clásico y barba'],
  [fade2, 'Fade en niños'],
  [fadeBarba2, 'Fade y barba definida'],
  [trenzas, 'Trenzas'],
  [mascarilla, 'Mascarilla de puntos negros']
] as const;
