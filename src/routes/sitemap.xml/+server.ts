import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    const pages = [
        { url: '', priority: '1.0', changefreq: 'weekly' },
        { url: 'about', priority: '0.9', changefreq: 'monthly' }
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `    <url>
        <loc>https://www.rowdybyte.xyz/${page.url}</loc>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
        <lastmod>${new Date().toISOString()}</lastmod>
    </url>`).join('\n')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'max-age=3600, s-maxage=3600'
        }
    });
};
