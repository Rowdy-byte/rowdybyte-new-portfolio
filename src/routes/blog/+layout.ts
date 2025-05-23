import type { LayoutLoad } from './$types';

type Article = {
    slug: string;

};

export const load: LayoutLoad = async () => {


    const headers: { slug: string }[] = [];

    const path = import.meta.glob('./*.md', { eager: true });

    for (const header in path) {
        const file = path[header] as object;
        const slug = header.split('/').at(-1)?.replace(/[.-]/g, ' ').replace('md', '').trim();

        if (file && typeof file === 'object' && 'metadata' in file && slug) {
            const metadata = file.metadata as Omit<Article, 'slug'>;
            const article: Article = { ...metadata, slug };
            headers.push(article);
        }
    }

    return { headers };
};
