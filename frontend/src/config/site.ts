export const SITE = {
  name: "Yamid Dev",
  url: "https://www.yamid.dev",
  defaultTitle: "Yamid Dev | Desarrollador Web Full Stack",
  defaultDescription:
    "Desarrollador Web Full Stack especializado en JavaScript, React, Python y mas. Creando soluciones web innovadoras y eficientes.",
  author: "Yamid Horacio Rodriguez",
  image: "/dev.jpg",
  icon: "/dev.jpg",
  themeColor: "#1a202c",
  locale: "es_ES",
  twitter: {
    site: "@yamiddevofic",
    creator: "@yamiddevofic",
  },
  socialLinks: [
    "https://github.com/yamiddevofic",
    "https://twitter.com/yamiddevofic",
    "https://linkedin.com/in/yamiddevofic",
  ],
  keywords: [
    "yamiddev",
    "yamiddevofic",
    "desarrollador web",
    "full stack",
    "javascript",
    "react",
    "python",
    "astro",
    "tailwind",
    "programador",
    "yamid dev",
    "yamid rodriguez",
  ],
} as const;

export const normalizeOrigin = (origin: string | URL) =>
  String(origin).replace(/\/+$/, "");
