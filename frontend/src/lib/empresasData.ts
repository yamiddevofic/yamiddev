/**
 * Datos de la vertiente orientada a postularse a empresas.
 *
 * Regla del skill agent-portfolio-empresas que manda sobre este archivo:
 * "Todo lo que afirmes debe tener a un clic la prueba que lo sostiene."
 *
 * Por eso PROYECTOS declara los tres enlaces por separado y `enHome` marca
 * cuáles cumplen la regla de las tres evidencias. Un proyecto sin demo viva o
 * sin write-up no debe aparecer en la home: se queda con enHome en false hasta
 * que exista la prueba, en lugar de listarse con un enlace roto o inventado.
 */

/**
 * Bloque "Ahora". El skill es explícito: un "Ahora" desactualizado prueba que
 * el sitio está muerto, así que lleva su fecha visible y hay que revisarlo cada
 * mes. Si deja de actualizarse, es preferible retirarlo que dejarlo viejo.
 */
export const AHORA = {
  fecha: 'Septiembre 2026',
  lineas: [
    'Cursando primer semestre de Ingeniería de Sistemas en la UNAD.',
    'Desarrollando y manteniendo este sitio: Astro 7, React 18 y Tailwind v4 sobre Vercel.',
    'Coordinando Chitagá Tech, comunidad tecnológica del municipio, y la vicepresidencia de la JAC de Villa Carmen.',
  ],
  disponibilidad: 'Disponible para roles full-stack en modalidad remota.',
};

export type Proyecto = {
  nombre: string;
  /** Qué resuelve, en una línea. Sin adjetivos. */
  resumen: string;
  rol: string;
  estado: string;
  stack: string[];
  /** Las tres evidencias. `null` significa que aún no existe, no que se omita. */
  demo: string | null;
  repo: string | null;
  writeup: string | null;
  /** Solo true cuando las tres evidencias existen y están verificadas. */
  enHome: boolean;
};

export const PROYECTOS: Proyecto[] = [
  {
    nombre: 'Marvy Shopmarket',
    resumen:
      'Sistema de gestión de productos, inventario y ventas concebido para tiendas de barrio en Chitagá. No se encuentra desplegado.',
    rol: 'Diseño y desarrollo',
    estado: 'Iniciado en 2023 · sin actividad reciente',
    stack: ['React', 'Vite', 'Tailwind', 'Python', 'Flask', 'SQLAlchemy', 'MySQL', 'Docker', 'Nginx', 'Gunicorn'],
    demo: null,
    repo: 'https://github.com/yamiddevofic/Marvy_Shopmarket',
    writeup: null,
    enHome: false,
  },
  {
    nombre: 'Think in Code',
    resumen:
      'Curso en línea de fundamentos de programación y pensamiento computacional.',
    rol: 'Contenido, plataforma y despliegue',
    estado: 'Publicado',
    stack: ['Astro', 'React', 'Tailwind'],
    demo: 'https://www.yamid.dev/curso/',
    repo: 'https://github.com/yamiddevofic/Think_In_Code',
    writeup: null,
    enHome: false,
  },
  {
    nombre: 'yamid.dev',
    resumen:
      'Este sitio: estático con una función serverless para el formulario de contacto.',
    rol: 'Diseño, desarrollo y operación',
    estado: 'En producción',
    stack: ['Astro 7', 'React 18', 'Tailwind v4', 'Vercel', 'Cloudflare'],
    demo: 'https://www.yamid.dev',
    repo: 'https://github.com/yamiddevofic/yamiddev',
    writeup: null,
    enHome: false,
  },
  {
    nombre: 'Fino App',
    resumen: 'Aplicación móvil de gestión de finanzas personales.',
    rol: 'Desarrollo',
    estado: 'En desarrollo',
    stack: ['Flutter', 'Dart', 'Hive'],
    demo: null,
    repo: 'https://github.com/yamiddevofic/fino_app',
    writeup: null,
    enHome: false,
  },
];

/**
 * Stack agrupado por uso real, no por familiaridad. El skill prohíbe las barras
 * de porcentaje: el nivel se demuestra con el proyecto, no se declara.
 */
export const STACK = [
  {
    grupo: 'En producción',
    nota: 'Desplegado y mantenido por mí',
    items: ['JavaScript', 'React', 'Astro', 'Tailwind', 'Node.js', 'Vercel', 'Git'],
  },
  {
    grupo: 'En proyectos propios',
    nota: 'Usado a fondo, sin operación pública todavía',
    items: ['Python', 'Flask', 'SQLAlchemy', 'MySQL', 'Docker', 'Nginx', 'Flutter'],
  },
  {
    grupo: 'Explorando',
    nota: 'En estudio este semestre',
    items: ['TypeScript', 'Vitest'],
  },
];

/** Cronológica, breve, con el resultado de cada entrada. */
export const EXPERIENCIA = [
  {
    puesto: 'Aprendiz en prácticas',
    organizacion: 'Ega Kat Logística',
    periodo: 'May 2024 - Nov 2024',
    modalidad: 'Remoto',
    resultado:
      'Soporte de primer nivel, administración de servidores y CMS WordPress, y capacitación a clientes.',
  },
];

export const FORMACION = [
  {
    titulo: 'Ingeniería de Sistemas',
    institucion: 'UNAD',
    periodo: 'Desde ago 2026',
  },
  {
    titulo: 'Tecnólogo en Análisis y Desarrollo de Software',
    institucion: 'SENA',
    periodo: 'Jul 2022 - Nov 2024',
  },
  {
    titulo: 'Escuela de JavaScript',
    institucion: 'Platzi',
    periodo: 'Desde ago 2024',
  },
];

/** Rol público: señal de arraigo y responsabilidad, no de tecnología. */
export const COMUNIDAD = [
  {
    rol: 'Fundador',
    organizacion: 'Chitagá Tech',
    periodo: 'Desde feb 2026',
    nota: 'Comunidad tecnológica del municipio. «Que irse sea opción, no obligación».',
  },
  {
    rol: 'Vicepresidente',
    organizacion: 'JAC Villa Carmen, Chitagá',
    periodo: 'Desde jul 2026',
    nota: 'Participación en procesos comunitarios, organización y gestión local.',
  },
];
