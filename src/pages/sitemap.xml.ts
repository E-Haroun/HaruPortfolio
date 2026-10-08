import type { APIRoute } from 'astro';

// Two pages: a hand-written sitemap beats a dependency.
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const fr = new URL(`${base}/`, site).href;
  const en = new URL(`${base}/en/`, site).href;
  const alternates = `<xhtml:link rel="alternate" hreflang="fr" href="${fr}"/><xhtml:link rel="alternate" hreflang="en" href="${en}"/>`;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[fr, en].map((loc) => `  <url><loc>${loc}</loc>${alternates}</url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
