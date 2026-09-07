/**
 * Trayectoria de Yamid, de 2021 a hoy.
 *
 * Vive aquí y no dentro del componente porque son doce entradas de texto que se
 * actualizan solas con el tiempo: añadir un hito no deberia obligar a tocar el
 * marcado del "Sobre mí".
 *
 * El orden es cronológico por fecha de inicio. Las etapas que se solapan
 * (Marvy Shopmarket arranca en 2023 y sigue) se colocan donde empiezan.
 */

export type Hito = {
  /** Etiqueta corta que se usa como navegación rápida. */
  anio: string;
  /** Periodo completo, tal como se muestra en la tarjeta. */
  periodo: string;
  titulo: string;
  /** Formación, Experiencia, Proyecto o Comunidad: etiqueta la tarjeta. */
  tipo: 'Formación' | 'Experiencia' | 'Proyecto' | 'Comunidad';
  lugar: string;
  descripcion: string;
  /** Se listan solo cuando la etapa tiene un stack reconocible. */
  tecnologias?: string[];
};

export const TRAYECTORIA: Hito[] = [
  {
    anio: '2021',
    periodo: '2021',
    titulo: 'El punto de partida',
    tipo: 'Formación',
    lugar: 'Chitagá',
    descripcion:
      'Al terminar el colegio mi intención era estudiar Psicología y Filosofía, pero encontré dificultades para ingresar a la universidad. Ese periodo de incertidumbre me llevó a explorar otras áreas y a descubrir que la tecnología también servía para comprender problemas y crear soluciones.',
  },
  {
    anio: '2022',
    periodo: '2022',
    titulo: 'Entrada al desarrollo de software',
    tipo: 'Formación',
    lugar: 'SENA · Presencial',
    descripcion:
      'Ingresé al SENA a estudiar Tecnología en Análisis y Desarrollo de Software. Descubrí que programar no era solo escribir código, sino una forma de pensar y analizar problemas, y que podía ser tanto una profesión como una herramienta para crear proyectos desde mi propio territorio.',
  },
  {
    anio: '2023',
    periodo: '2023',
    titulo: 'Construcción de fundamentos',
    tipo: 'Formación',
    lugar: 'SENA',
    descripcion:
      'Etapa centrada en construir las bases técnicas. Aquí nació Marvy Shopmarket como iniciativa de aprendizaje, y empecé a entender cómo la tecnología podía responder a necesidades reales de la comunidad.',
    tecnologias: ['Python', 'HTML', 'CSS', 'JavaScript', 'SQL'],
  },
  {
    anio: '2023',
    periodo: '2023 - Actualmente',
    titulo: 'Marvy Shopmarket',
    tipo: 'Proyecto',
    lugar: 'Chitagá',
    descripcion:
      'Empezó como proyecto de formación y sigue en desarrollo. Es una solución para la gestión de tiendas de barrio en Chitagá: productos, inventario, ventas y administración. Muestra que un ejercicio de aprendizaje puede crecer hasta convertirse en un producto real.',
    tecnologias: ['React', 'Vite', 'Tailwind', 'Python', 'Flask', 'SQLAlchemy', 'MySQL', 'Docker', 'Nginx', 'Gunicorn'],
  },
  {
    anio: '2024',
    periodo: 'May 2024 - Nov 2024',
    titulo: 'Del estudiante al desarrollador',
    tipo: 'Experiencia',
    lugar: 'Ega Kat Logística · Remoto',
    descripcion:
      'Prácticas profesionales con situaciones reales: administración de servidores, WordPress, soporte de primer nivel, atención a usuarios y capacitación a clientes. El paso de un contexto académico a uno profesional, asumiendo responsabilidades dentro de una organización.',
  },
  {
    anio: '2024',
    periodo: '2024 - 2025',
    titulo: 'Consolidación de Yamid Dev',
    tipo: 'Proyecto',
    lugar: 'Marca propia',
    descripcion:
      'Yamid Dev se consolida como identidad profesional: mostrar trabajo, desarrollar proyectos y construir una visión propia. Con Think in Code empecé además a enseñar fundamentos de programación. Pasé de aprender para cumplir una formación a aprender para crear, enseñar y compartir.',
    tecnologias: ['JavaScript', 'React', 'Node.js', 'Python', 'Flask', 'MySQL', 'Git', 'Tailwind', 'Astro', 'Docker', 'Flutter'],
  },
  {
    anio: '2025',
    periodo: 'Antes de 2026',
    titulo: 'La idea de Chitagá Tech',
    tipo: 'Comunidad',
    lugar: 'Chitagá',
    descripcion:
      'Antes de existir formalmente ya estaba la idea: crear espacios de aprendizaje y desarrollo para que la gente del municipio accediera a oportunidades tecnológicas sin tener que irse. Surgió de mi propia experiencia al ver que esas oportunidades se concentran en las grandes ciudades.',
  },
  {
    anio: '2026',
    periodo: '26 de febrero de 2026',
    titulo: 'Nace Chitagá Tech',
    tipo: 'Comunidad',
    lugar: 'Chitagá',
    descripcion:
      'La comunidad nace formalmente, con una idea central: «que irse sea opción, no obligación». Promueve el aprendizaje tecnológico, la creación de proyectos y la mentoría, para demostrar que desde un municipio también se puede aprender tecnología y construir oportunidades.',
  },
  {
    anio: '2026',
    periodo: '1 de julio de 2026',
    titulo: 'Vicepresidente de la JAC Villa Carmen',
    tipo: 'Comunidad',
    lugar: 'Villa Carmen, Chitagá',
    descripcion:
      'Participación directa en procesos comunitarios, de organización y gestión local. Refuerza liderazgo, comunicación y trabajo colectivo, y me permite conocer de cerca las necesidades de la comunidad: el desarrollo no depende solo de la tecnología, también del compromiso con el territorio.',
  },
  {
    anio: '2026',
    periodo: '2026',
    titulo: 'Desarrollo de Chitagá Tech',
    tipo: 'Comunidad',
    lugar: 'Chitagá',
    descripcion:
      'La comunidad toma estructura con cursos, talleres, encuentros, mentorías y proyectos, además de su presencia digital. Mi experiencia como desarrollador se pone al servicio de un objetivo colectivo: generar oportunidades desde Chitagá.',
  },
  {
    anio: '2026',
    periodo: '17 de agosto de 2026',
    titulo: 'Ingeniería de Sistemas',
    tipo: 'Formación',
    lugar: 'UNAD',
    descripcion:
      'Tras una base sobre todo práctica —SENA, proyectos propios y experiencia profesional— empiezo la formación universitaria para ampliar fundamentos y prepararme para proyectos de mayor complejidad.',
  },
  {
    anio: 'Hoy',
    periodo: 'Septiembre de 2026',
    titulo: 'Etapa actual',
    tipo: 'Proyecto',
    lugar: 'Chitagá',
    descripcion:
      'Marvy Shopmarket sigue en marcha, Yamid Dev crece con Yamid Dev Formación y contenidos educativos, Chitagá Tech avanza como comunidad y continúo en la JAC. El propósito: usar la tecnología no solo para construir sistemas, sino para conectar personas y demostrar que el futuro también se construye desde el territorio.',
  },
];
