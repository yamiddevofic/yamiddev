import { SITE, normalizeOrigin } from "@/config/site";

export type PageType = "website" | "article" | "course" | "person";

export interface CourseDetails {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
}

export interface ArticleDetails {
  author: string;
  publishDate: string;
}

export interface SeoOptions {
  title?: string;
  description?: string;
  image?: string;
  icon?: string;
  canonical?: string;
  noindex?: boolean;
  lang?: string;
  pageType?: PageType;
  keywords?: string[];
  courseDetails?: CourseDetails;
  articleDetails?: ArticleDetails;
}

export interface PageMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl: string;
  iconPath: string;
  iconUrl: string;
  keywords: string;
  robots: string;
  origin: string;
  locale: string;
}

const resolveAbsoluteUrl = (pathOrUrl: string, origin: string) =>
  new URL(pathOrUrl, `${origin}/`).toString();

export const createPageMeta = (
  options: SeoOptions,
  currentUrl: string,
  rawOrigin: string | URL
): PageMeta => {
  const origin = normalizeOrigin(rawOrigin);
  const title = options.title ? `${options.title} | ${SITE.name}` : SITE.defaultTitle;
  const description = options.description ?? SITE.defaultDescription;
  const imagePath = options.image ?? SITE.image;
  const iconPath = options.icon ?? SITE.icon;
  const keywords = [...new Set([...SITE.keywords, ...(options.keywords ?? [])])].join(", ");

  return {
    title,
    description,
    canonicalUrl: options.canonical ?? currentUrl,
    imageUrl: resolveAbsoluteUrl(imagePath, origin),
    iconPath,
    iconUrl: resolveAbsoluteUrl(iconPath, origin),
    keywords,
    robots: options.noindex ? "noindex, nofollow" : "index, follow",
    origin,
    locale: (options.lang ?? "es") === "es" ? SITE.locale : options.lang ?? "es",
  };
};

export const createStructuredData = (
  meta: PageMeta,
  options: Pick<SeoOptions, "title" | "pageType" | "courseDetails" | "articleDetails" | "lang">
) => {
  const schema: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE.name,
      url: meta.origin,
      inLanguage: options.lang ?? "es",
      potentialAction: {
        "@type": "SearchAction",
        target: `${meta.origin}/buscar?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: SITE.author,
      alternateName: ["yamiddev", "yamiddevofic"],
      url: meta.origin,
      image: meta.imageUrl,
      sameAs: SITE.socialLinks,
      jobTitle: "Desarrollador Web Full Stack",
      description: SITE.defaultDescription,
    },
  ];

  if (options.pageType === "course" && options.courseDetails) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "Course",
      name: options.courseDetails.name,
      description: options.courseDetails.description,
      provider: {
        "@type": "Organization",
        name: options.courseDetails.provider.name,
        sameAs: options.courseDetails.provider.url,
      },
    });
  }

  if (options.pageType === "article" && options.articleDetails) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: options.title,
      image: meta.imageUrl,
      author: {
        "@type": "Person",
        name: options.articleDetails.author,
        url: meta.origin,
      },
      publisher: {
        "@type": "Organization",
        name: SITE.name,
        logo: {
          "@type": "ImageObject",
          url: resolveAbsoluteUrl(SITE.image, meta.origin),
        },
      },
      datePublished: options.articleDetails.publishDate,
      description: meta.description,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": meta.canonicalUrl,
      },
    });
  }

  return schema;
};
