import { type Project } from '@/data/portfolioData';
import { type BlogArticleContent } from '@/data/blogArticles';

export const SITE_CONFIG = {
  domain: 'aniket-meshram.pages.dev',
  baseUrl: 'https://aniket-meshram.pages.dev',
  author: 'Aniket Meshram',
  titleSuffix: ' | Aniket Meshram',
  defaultTitle: 'Aniket Meshram | Software Engineer & Full-Stack Developer',
  defaultDescription:
    'Official portfolio of Aniket Meshram, a Software Engineer & Full-Stack Developer based in Amravati, India. Specialized in high-performance web systems, Next.js, and Spring Boot.',
  defaultImage: 'https://aniket-meshram.pages.dev/avatar-transparent.png',
  defaultKeywords:
    'Aniket Meshram, Software Engineer, Full-Stack Developer, Next.js, React 19, Spring Boot, Java, TypeScript, Distributed Systems, Web Development Portfolio, Amravati Maharashtra India',
  socials: {
    github: 'https://github.com/Aniket-Meshram-dev',
    linkedin: 'https://www.linkedin.com/in/aniket-meshram-dev/',
    leetcode: 'https://leetcode.com/u/Aniket_meshram_/',
    instagram: 'https://www.instagram.com/aniket_m_2_4',
  },
};

export interface PageSEOMeta {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  keywords?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Standard Page Metadata Maps (Under 60 chars for title, under 160 chars for description)
 */
export const ROUTE_SEO_MAP: Record<string, PageSEOMeta> = {
  '/': {
    title: 'Aniket Meshram | Software Engineer & Full-Stack Developer',
    description:
      'Official portfolio of Aniket Meshram, Software Engineer & Full-Stack Developer specializing in high-performance web systems, Next.js 16, and Spring Boot.',
    canonicalPath: '/',
    ogType: 'website',
  },
  '/projects': {
    title: 'Production Projects Archive | Aniket Meshram',
    description:
      'Explore scalable production platforms, autonomous AI cascades, sub-200ms POS engines, and crypto trading terminals engineered by Aniket Meshram.',
    canonicalPath: '/projects',
    ogType: 'website',
  },
  '/blog': {
    title: 'Architecture Journal & Articles | Aniket Meshram',
    description:
      'Technical deep-dives on architecting sub-200ms POS systems, atomic multi-branch inventory, STOMP WebSockets, and distributed application design.',
    canonicalPath: '/blog',
    ogType: 'website',
  },
  '/wall': {
    title: 'The Interactive Wall & Guestbook | Aniket Meshram',
    description:
      'Leave notes, grab and toss anime vinyl stickers, and test interactive physics on Aniket Meshram’s community interactive canvas.',
    canonicalPath: '/wall',
    ogType: 'website',
  },
  '/contact': {
    title: 'Contact & Inquiries | Aniket Meshram',
    description:
      'Get in touch with Aniket Meshram for full-stack engineering roles, distributed systems architecture projects, or technical consulting.',
    canonicalPath: '/contact',
    ogType: 'website',
  },
  '/privacy': {
    title: 'Privacy Policy | Aniket Meshram Portfolio',
    description:
      'Privacy policy for the portfolio of Aniket Meshram. No personal tracking or data collection is performed on this site.',
    canonicalPath: '/privacy',
    ogType: 'website',
  },
  '/terms': {
    title: 'Terms of Use | Aniket Meshram Portfolio',
    description:
      'Terms of use and intellectual property notices for Aniket Meshram’s personal engineering portfolio.',
    canonicalPath: '/terms',
    ogType: 'website',
  },
};

/**
 * Generate BreadcrumbList JSON-LD Schema
 */
export function generateBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.baseUrl}${item.path.startsWith('/') ? item.path : `/${item.path}`}`,
    })),
  };
}

/**
 * Generate SoftwareApplication / CreativeWork Schema for Project Details
 */
export function generateProjectSchema(project: Project) {
  const fullUrl = `${SITE_CONFIG.baseUrl}/projects/${project.slug}`;
  const rawImage = project.image || SITE_CONFIG.defaultImage;
  const imageUrl = rawImage.startsWith('http')
    ? rawImage
    : `${SITE_CONFIG.baseUrl}${rawImage.startsWith('/') ? rawImage : `/${rawImage}`}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    headline: project.category,
    description: project.longDescription || project.description,
    url: fullUrl,
    image: imageUrl,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform (Web, Cloud, Cloudflare Pages)',
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.baseUrl,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    softwareRequirements: project.tags.join(', '),
  };
}

/**
 * Generate TechArticle / BlogPosting Schema
 */
export function generateBlogPostingSchema(article: BlogArticleContent) {
  const fullUrl = `${SITE_CONFIG.baseUrl}/blog`;

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.excerpt,
    url: fullUrl,
    datePublished: '2026-01-15',
    dateModified: '2026-09-19',
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.baseUrl,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.baseUrl,
    },
    keywords: article.tags.join(', '),
    articleSection: article.category,
  };
}
