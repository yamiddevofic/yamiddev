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
  fecha: 'Octubre 2026',
  lineas: [
    'Cursando primer semestre de Ingeniería de Sistemas en la UNAD.',
    'Desarrollando y manteniendo este sitio: Astro 7, React 18 y Tailwind v4 sobre Vercel.',
    'Desarrollando con agentes de código, con las reglas de trabajo escritas y versionadas en el propio repositorio.',
    // Va en "Ahora" y no en la seccion de abajo a proposito: todavia no esta
    // hecho. La seccion solo admite lo que ya se puede abrir y revisar; aqui,
    // que lleva fecha a la vista, cabe decir hacia donde se va.
    'Preparando la primera integración de un modelo dentro de un producto, no solo en el flujo de trabajo.',
    'Coordinando Chitagá Tech, comunidad tecnológica del municipio, y la vicepresidencia de la JAC de Villa Carmen.',
  ],
  disponibilidad: 'Disponible para roles full-stack en modalidad remota.',
};

/**
 * Como trabajo con agentes de codigo.
 *
 * Decir "uso IA" no distingue a nadie: a estas alturas lo dice todo el mundo y
 * no se puede comprobar. Por eso cada punto de aqui apunta a algo que esta
 * publico en el repositorio y que quien lea puede abrir y juzgar, que es lo
 * que pide el skill de la vertiente tecnica.
 *
 * Lo que no esta hecho no entra en esta lista. La integracion de un modelo
 * dentro de un producto vive en AHORA, que lleva fecha, y se mueve aqui el dia
 * que exista algo que ensenar.
 */
export const TRABAJO_CON_IA = {
  intro:
    'Uso agentes de código a diario, con reglas escritas en vez de a ojo. Todo lo de abajo está en el repositorio de este sitio y se puede revisar.',
  practicas: [
    {
      titulo: 'Las reglas del repositorio están escritas',
      detalle:
        'AGENTS.md fija cómo se trabaja aquí: nunca commitear en main, verificar en el preview de Vercel antes de dar algo por terminado y separar los commits de documentación. El agente las sigue igual que yo.',
      enlace: 'https://github.com/yamiddevofic/yamiddev/blob/main/AGENTS.md',
      textoEnlace: 'Ver AGENTS.md',
    },
    {
      titulo: 'Escribo skills, no solo prompts',
      detalle:
        'Tres skills propias fijan el criterio de maquetación y el de cada vertiente del portafolio: qué se puede afirmar, qué evidencia exige cada proyecto y cómo se comprueba. Están versionadas para Claude Code y para OpenCode, así que no dependen de un proveedor.',
      enlace: 'https://github.com/yamiddevofic/yamiddev/tree/main/.claude/skills',
      textoEnlace: 'Ver las skills',
    },
    {
      titulo: 'Queda trazado quién escribió qué',
      detalle:
        'Los commits hechos con ayuda de un agente llevan su co-autoría en el mensaje. Se ve en el historial, sin tener que creerme.',
      enlace: 'https://github.com/yamiddevofic/yamiddev/commits/main/',
      textoEnlace: 'Ver el historial',
    },
    {
      titulo: 'El agente no decide si algo funciona',
      detalle:
        'Lo decide la suite de 117 pruebas y la medición en el navegador sobre el build. Un cambio visual no se da por bueno porque se vea bien en una captura: se comprueban las propiedades calculadas.',
      enlace: 'https://github.com/yamiddevofic/yamiddev/tree/main/frontend/tests',
      textoEnlace: 'Ver las pruebas',
    },
  ],
};

export type Proyecto = {
  nombre: string;
  /** Qué resuelve, en una línea. Sin adjetivos. */
  resumen: string;
  rol: string;
  estado: string;
  stack: string[];
  image?: [string, string];
  /** Las tres evidencias. `null` significa que aún no existe, no que se omita. */
  demo: string | null;
  repo: string | null;
  writeup: string | null;
  /** Solo true cuando las tres evidencias existen y están verificadas. */
  enHome: boolean;
};

export const PROYECTOS: Proyecto[] = [
  {
    nombre: 'yamid.dev',
    resumen:
      'Este sitio: estático con una función serverless para el formulario de contacto.',
    rol: 'Diseño, desarrollo y operación',
    estado: 'En producción',
    stack: ['Astro 7', 'React 18', 'Tailwind v4', 'Vercel', 'Cloudflare'],
    image: ['/images/portfolio.jpg', '/images/portfolio.png'],
    demo: 'https://www.yamid.dev',
    repo: 'https://github.com/yamiddevofic/yamiddev',
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
    image: ['/images/thinkincode-actual.png', '/images/thinkincode-actual.png'],
    demo: 'https://www.yamid.dev/curso/',
    repo: 'https://github.com/yamiddevofic/Think_In_Code',
    writeup: null,
    enHome: false,
  },
  {
    nombre: 'PlantaQR',
    resumen:
      'Catálogo de los árboles del parque de Chitagá. Cada individuo lleva un código QR que abre su ficha: familia, origen, usos y estado de conservación.',
    rol: 'Diseño, desarrollo y despliegue · idea del cliente',
    estado: 'En producción',
    stack: ['React', 'Vite', 'Express', 'MongoDB', 'Mongoose', 'MapLibre', 'Swagger', 'Vercel'],
    // La idea no es mia: la puso el estudiante que encargo el proyecto. Se dice
    // para no atribuirse lo que no se hizo; lo demas si salio de aqui.
    image: ['/images/plantaqr.png', '/images/plantaqr.png'],
    demo: 'https://plantas-qr.vercel.app',
    repo: 'https://github.com/yamiddevofic/plantas-qr',
    writeup: null,
    enHome: false,
  },
  {
    nombre: 'Marao',
    resumen:
      'Tienda en línea de lentes de contacto, pestañas y accesorios: 120 referencias con filtros combinables, carrito, pago en línea y panel de administración.',
    // El diseno lo hicieron el estudiante del SENA que trajo el encargo y el
    // propio negocio. Aqui solo se hizo el desarrollo y el despliegue, y asi
    // se dice: apuntarse el diseno seria quitarselo a quien lo hizo.
    rol: 'Desarrollo y despliegue · diseño del cliente',
    estado: 'En producción',
    stack: ['JavaScript', 'HTML', 'CSS', 'Supabase', 'Cloudflare Workers', 'ePayco'],
    image: ['/images/marao.png', '/images/marao.png'],
    demo: 'https://marao.co',
    repo: 'https://github.com/yamiddevofic/tienda-marao',
    writeup: null,
    enHome: false,
  },
  {
    nombre: 'Marvy Shopmarket',
    resumen:
      'Sistema de gestión de productos, inventario y ventas concebido para tiendas de barrio en Chitagá. No se encuentra desplegado.',
    rol: 'Diseño y desarrollo',
    estado: 'Iniciado en 2023 · sin actividad reciente',
    stack: ['React', 'Vite', 'Tailwind', 'Python', 'Flask', 'SQLAlchemy', 'MySQL', 'Docker', 'Nginx', 'Gunicorn'],
    image: ['/images/marvyshopmarket.png', '/images/marvyshopmarket-2.png'],
    demo: null,
    repo: 'https://github.com/yamiddevofic/Marvy_Shopmarket',
    writeup: null,
    enHome: false,
  },
  {
    nombre: 'Fino App',
    resumen: 'Aplicación móvil de gestión de finanzas personales.',
    rol: 'Desarrollo',
    estado: 'En desarrollo',
    stack: ['Flutter', 'Dart', 'Hive'],
    image: ['/images/finoapp.jpg', '/images/finoapp-2.jpg'],
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
