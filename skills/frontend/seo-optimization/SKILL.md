---
name: seo-optimization
description: Use when optimizing websites for search engines — meta tags, structured data (JSON-LD), core web vitals, sitemaps, robots.txt, canonical URLs, and link building
tags: [frontend, seo, performance]
version: 1.0.0
---

# SEO Optimization

## Domain Expertise

### Core Principles
- **Content is the foundation** — No amount of technical SEO can save mediocre content. Write for humans first, search engines second.
- **Core Web Vitals are ranking factors** — LCP < 2.5s, CLS < 0.1, INP < 200ms. Google uses these as direct ranking signals.
- **Crawl efficiency matters** — Search engines have a crawl budget. Every unnecessary crawl of a 404, redirect chain, or low-quality page wastes that budget.
- **Structured data unlocks rich results** — JSON-LD schema.org markup turns a plain search result into a rich snippet with stars, prices, and images.

### Key Patterns

1. **Meta Tags** — Every page needs a unique, descriptive title and meta description.

```html
<title>Cloud Cost Optimization Guide | Universal Skills</title>
<meta name="description" content="Learn to reduce cloud costs by 40%+ with right-sizing, spot instances, storage tiering, and FinOps practices. Practical guide with checklists.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://example.com/cloud-cost-optimization">
```

2. **JSON-LD Structured Data** — Help search engines understand your content.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Cloud Cost Optimization Guide",
  "description": "Learn to reduce cloud costs by 40%+",
  "author": { "@type": "Person", "name": "Author Name" },
  "datePublished": "2025-01-15",
  "dateModified": "2025-06-01"
}
</script>
```

3. **Technical SEO Checklist**
   - XML sitemap: `https://example.com/sitemap.xml` — lists all crawlable URLs
   - `robots.txt`: Allow indexing, point to sitemap
   - Canonical URLs: Prevent duplicate content penalties
   - `hreflang` tags: For multi-language sites
   - `404` page: Useful, on-brand, with navigation back to main content
   - Pagination: `rel="prev"` / `rel="next"` for paginated content

4. **Performance as SEO** — Optimize LCP (hero image preload, server response time), CLS (set image dimensions), INP (debounce handlers, code-split).

## Checklist

- [ ] Every page has unique `<title>` and `<meta name="description">`
- [ ] Canonical URL is set on every page (prevent duplicate content)
- [ ] XML sitemap is generated and submitted to Google Search Console
- [ ] `robots.txt` allows crawling of important pages, blocks admin/internal pages
- [ ] Core Web Vitals pass for mobile and desktop
- [ ] Structured data (JSON-LD) is present for key content types
- [ ] Open Graph / Twitter Card meta tags for social sharing
- [ ] 301 redirects for moved pages (never 302 for permanent moves)
- [ ] Internal linking is logical and uses descriptive anchor text

## Common Pitfalls

- **Blocking CSS/JS in robots.txt** — Google needs CSS and JS to render the page for indexing. Blocking them causes inaccurate indexing.
- **Missing alt text on images** — Alt text helps accessibility AND image search ranking.
- **Thin content pages** — Pages with <300 words of unique content are often de-indexed. Consolidate or improve them.
- **Ignoring mobile SEO** — Google indexes mobile-first. A bad mobile experience hurts all rankings.
