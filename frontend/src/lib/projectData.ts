import { Courses } from './coursesData';

/**
 * Proyectos de la vertiente comercial (/clientes).
 *
 * Los estados tienen que coincidir con los de empresasData: un mismo proyecto
 * no puede figurar "En desarrollo" en una pagina y "En produccion" en la otra,
 * que es lo que pasaba con este portafolio.
 */
const CLASES_PUBLICADAS = Courses.filter((c) => c.available).length;

export const Projects = [
  {
    id: 'portafolio-web-profesional',
    title: 'yamid.dev',
    description: 'Este sitio: presentación profesional, formulario de contacto, blog y la plataforma del curso Think in Code.',
    techStack: ['Astro', 'React', 'Tailwind'],
    image: ['/images/portfolio.jpg', '/images/portfolio.png'],
    imageSize: { width: 1366, height: 768 },
    time: 'En producción',
    demo: 'https://www.yamid.dev',
    url: 'https://github.com/yamiddevofic/yamiddev'
  },
  {
    id: 'think-in-code',
    title: 'Think in Code',
    description: 'Curso en línea, en video, de fundamentos de programación y pensamiento computacional para quienes empiezan desde cero.',
    techStack: ['React', 'Tailwind', 'Astro'],
    image: ['/images/thinkincode-actual.png', '/images/thinkincode-actual.png'],
    imageSize: { width: 1366, height: 768 },
    time: `${CLASES_PUBLICADAS} de ${Courses.length} clases publicadas`,
    demo: 'https://www.yamid.dev/curso/',
    // El repositorio Think_In_Code ya no existe: el curso vive en este.
    url: 'https://github.com/yamiddevofic/yamiddev/blob/main/frontend/src/components/organisms/Course.jsx'
  },
  {
    id: 'plantaqr',
    title: 'PlantaQR',
    description: 'Cada árbol del parque de Chitagá lleva un código QR. Al escanearlo se abre su ficha: familia, origen, usos y estado de conservación.',
    techStack: ['React', 'Vite', 'Express', 'MongoDB'],
    image: ['/images/plantaqr.png', '/images/plantaqr.png'],
    imageSize: { width: 1366, height: 768 },
    time: 'En producción',
    demo: 'https://plantas-qr.vercel.app',
    url: 'https://github.com/yamiddevofic/plantas-qr'
  },
  {
    id: 'marao',
    title: 'Marao',
    description: 'Tienda de lentes de contacto, pestañas y accesorios con 120 referencias. El cliente filtra, compra y paga en línea; el negocio actualiza su catálogo desde un panel propio.',
    techStack: ['JavaScript', 'Supabase', 'Cloudflare', 'ePayco'],
    image: ['/images/marao.png', '/images/marao.png'],
    imageSize: { width: 1366, height: 768 },
    time: 'En producción',
    demo: 'https://marao.co',
    url: 'https://github.com/yamiddevofic/tienda-marao'
  },
  {
    id: 'marvyshopmarket',
    title: 'Marvy Shopmarket',
    description: 'Sistema de gestión de productos, inventario, ventas y proveedores para tiendas de barrio. Aún no está disponible al público.',
    techStack: ['React', 'Tailwind', 'Python', 'Flask'],
    image: ['/images/marvyshopmarket.png', '/images/marvyshopmarket-2.png'],
    imageSize: { width: 1366, height: 612 },
    time: 'En desarrollo',
    url: 'https://github.com/yamiddevofic/Marvy_Shopmarket'
  },
  {
    id: 'fino-app',
    title: 'Fino App',
    description: 'Aplicación móvil para registrar ingresos, gastos y deudas personales.',
    techStack: ['Flutter', 'Dart', 'Hive'],
    image: ['/images/finoapp.jpg', '/images/finoapp-2.jpg'],
    imageSize: { width: 1365, height: 591 },
    time: 'En desarrollo',
    url: 'https://github.com/yamiddevofic/fino_app'
  },
];
