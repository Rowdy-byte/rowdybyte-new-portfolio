import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    return {
        meta: {
            title: 'About Rowdy Verbeek - Full Stack Developer Portfolio',
            description: 'Learn about Rowdy Verbeek (Rowdy Byte), a full-stack developer from the Netherlands specializing in SvelteKit, TypeScript, and modern web technologies.',
            keywords: 'Rowdy Verbeek, Rowdy Byte, about, biography, full stack developer, web developer, Netherlands, SvelteKit, TypeScript'
        }
    };
};
