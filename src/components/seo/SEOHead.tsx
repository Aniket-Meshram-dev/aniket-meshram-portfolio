import React, { useEffect } from 'react';
import { SITE_CONFIG, type PageSEOMeta } from '@/utils/seoConfig';

interface SEOHeadProps extends Partial<PageSEOMeta> {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  keywords?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = SITE_CONFIG.defaultTitle,
  description = SITE_CONFIG.defaultDescription,
  canonicalPath = '/',
  ogImage = SITE_CONFIG.defaultImage,
  ogType = 'website',
  keywords = SITE_CONFIG.defaultKeywords,
  jsonLd,
}) => {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // 1. Update Document Title
    document.title = title;

    // Helper to set or update meta tag by name
    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to set or update link tag by rel
    const setLinkTag = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const canonicalUrl = `${SITE_CONFIG.baseUrl}${cleanPath === '/' ? '' : cleanPath}`;
    const fullImageUrl = ogImage.startsWith('http')
      ? ogImage
      : `${SITE_CONFIG.baseUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

    // 2. Primary Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'title', title);
    setLinkTag('canonical', canonicalUrl);

    // 3. Open Graph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', fullImageUrl);
    setMetaTag('property', 'og:type', ogType);

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullImageUrl);
    setMetaTag('name', 'twitter:url', canonicalUrl);

    // 5. Dynamic JSON-LD Structured Data
    const DYNAMIC_JSONLD_ID = 'dynamic-route-schema-jsonld';
    let scriptEl = document.getElementById(DYNAMIC_JSONLD_ID) as HTMLScriptElement | null;

    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = DYNAMIC_JSONLD_ID;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd, null, 2);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, canonicalPath, ogImage, ogType, keywords, jsonLd]);

  return null;
};
