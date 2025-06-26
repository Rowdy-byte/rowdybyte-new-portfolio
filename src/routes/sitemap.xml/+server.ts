import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    const pages = [
        { url: '', priority: '1.0', changefreq: 'monthly' },
        { url: 'about', priority: '0.9', changefreq: 'monthly' },
        { url: '#intro', priority: '0.9', changefreq: 'monthly' },
        { url: '#socials', priority: '0.8', changefreq: 'monthly' },
        { url: '#hardskills', priority: '0.8', changefreq: 'monthly' },
        { url: '#softskills', priority: '0.8', changefreq: 'monthly' },
        { url: '#projects', priority: '0.9', changefreq: 'weekly' },
        { url: '#builtwith', priority: '0.7', changefreq: 'monthly' },
        { url: '#contact', priority: '0.8', changefreq: 'monthly' },
        { url: 'blog', priority: '0.9', changefreq: 'weekly' },
        { url: 'docs', priority: '0.8', changefreq: 'weekly' },
        { url: 'auth', priority: '0.5', changefreq: 'monthly' }
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${pages.map(page => `
	<url>
		<loc>https://rowdybyte.xyz/${page.url}</loc>
		<changefreq>${page.changefreq}</changefreq>
		<priority>${page.priority}</priority>
		<lastmod>${new Date().toISOString()}</lastmod>
	</url>
	`).join('')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=3600'
        }
    });
};
