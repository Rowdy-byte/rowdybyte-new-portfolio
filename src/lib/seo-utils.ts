// Enhanced SEO utilities for better Google discoverability
export const createPersonSchema = (additionalData = {}) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://rowdybyte.xyz/#rowdy-verbeek',
    name: 'Rowdy Verbeek',
    alternateName: ['Rowdy Byte', 'Rowdy-byte'],
    givenName: 'Rowdy',
    familyName: 'Verbeek',
    jobTitle: 'Full Stack Developer',
    description: 'Rowdy Verbeek (Rowdy Byte) - Experienced full-stack developer from the Netherlands specializing in SvelteKit, TypeScript, and modern web technologies',
    url: 'https://rowdybyte.xyz',
    mainEntityOfPage: 'https://rowdybyte.xyz',
    image: {
        '@type': 'ImageObject',
        url: 'https://rowdybyte.xyz/rowdy-bg-rm-six.png',
        width: 1200,
        height: 630,
        caption: 'Rowdy Verbeek - Full Stack Developer Portfolio'
    },
    sameAs: [
        'https://github.com/Rowdy-byte',
        'https://www.linkedin.com/in/rowdy-byte/',
        'https://x.com/RowdyByte'
    ],
    knowsAbout: [
        'JavaScript',
        'TypeScript',
        'SvelteKit',
        'React',
        'Node.js',
        'Full Stack Development',
        'UI/UX Design',
        'Web Development',
        'PostgreSQL',
        'GSAP Animation',
        'Tailwind CSS',
        'Frontend Development',
        'Backend Development',
        'Database Design',
        'API Development',
        'Responsive Design',
        'Web Performance Optimization',
        'SEO'
    ],
    hasOccupation: {
        '@type': 'Occupation',
        name: 'Full Stack Developer',
        occupationLocation: {
            '@type': 'Country',
            name: 'Netherlands'
        },
        skills: 'JavaScript, TypeScript, SvelteKit, React, Node.js, PostgreSQL, UI/UX Design',
        responsibilities: 'Full-stack web application development, UI/UX design, database architecture, API development'
    },
    worksFor: {
        '@type': 'Organization',
        name: 'Freelance / Remote Work'
    },
    nationality: {
        '@type': 'Country',
        name: 'Netherlands'
    },
    alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Self-taught Developer'
    },
    ...additionalData
});

export const createWebsiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://rowdybyte.xyz/#website',
    name: 'Rowdy Verbeek Portfolio - Full Stack Developer',
    alternateName: ['Rowdy Byte Portfolio', 'Rowdy Verbeek Developer Portfolio'],
    url: 'https://rowdybyte.xyz',
    description: 'Portfolio website showcasing Rowdy Verbeek\'s full-stack development projects, skills, and professional experience. Specializing in SvelteKit, TypeScript, and modern web technologies.',
    author: {
        '@type': 'Person',
        '@id': 'https://rowdybyte.xyz/#rowdy-verbeek'
    },
    publisher: {
        '@type': 'Person',
        '@id': 'https://rowdybyte.xyz/#rowdy-verbeek'
    },
    mainEntity: {
        '@type': 'Person',
        '@id': 'https://rowdybyte.xyz/#rowdy-verbeek'
    },
    inLanguage: 'en',
    copyrightHolder: {
        '@type': 'Person',
        '@id': 'https://rowdybyte.xyz/#rowdy-verbeek'
    },
    creator: {
        '@type': 'Person',
        '@id': 'https://rowdybyte.xyz/#rowdy-verbeek'
    },
    keywords: 'Rowdy Verbeek, Rowdy Byte, full stack developer, web developer, SvelteKit, TypeScript, portfolio, Netherlands',
    about: {
        '@type': 'Thing',
        name: 'Full Stack Web Development',
        description: 'Professional web development services and portfolio showcase'
    }
});

export const createBreadcrumbSchema = (items: { name: string; url: string }[] = []) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Rowdy Verbeek',
            item: 'https://rowdybyte.xyz'
        },
        ...items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 2,
            name: item.name,
            item: item.url
        }))
    ]
});

export const createOrganizationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://rowdybyte.xyz/#organization',
    name: 'Rowdy Byte',
    alternateName: ['Rowdy Verbeek Development', 'Rowdy Byte Development'],
    url: 'https://rowdybyte.xyz',
    logo: {
        '@type': 'ImageObject',
        url: 'https://rowdybyte.xyz/rowdy-bg-rm-six.png',
        width: 1200,
        height: 630
    },
    sameAs: [
        'https://github.com/Rowdy-byte',
        'https://www.linkedin.com/in/rowdy-byte/',
        'https://x.com/RowdyByte'
    ],
    founder: {
        '@type': 'Person',
        '@id': 'https://rowdybyte.xyz/#rowdy-verbeek'
    },
    description: 'Full-stack web development services by Rowdy Verbeek, specializing in modern web technologies and exceptional user experiences.',
    knowsAbout: [
        'Web Development',
        'Full Stack Development',
        'SvelteKit',
        'TypeScript',
        'UI/UX Design'
    ],
    areaServed: 'Worldwide',
    serviceType: 'Web Development Services'
});

// SEO keywords specifically targeting "Rowdy Verbeek" searches
export const rowdyVerbeekKeywords = [
    'Rowdy Verbeek',
    'Rowdy Verbeek developer',
    'Rowdy Verbeek full stack',
    'Rowdy Verbeek portfolio',
    'Rowdy Verbeek Netherlands',
    'Rowdy Verbeek SvelteKit',
    'Rowdy Verbeek TypeScript',
    'Rowdy Verbeek web developer',
    'Rowdy Byte',
    'Rowdy Byte developer',
    'Rowdy-byte GitHub'
];

export const generateMetaTags = (pageTitle = '', pageDescription = '', additionalKeywords = []) => {
    const title = pageTitle
        ? `${pageTitle} | Rowdy Verbeek (Rowdy Byte) - Full Stack Developer`
        : 'Rowdy Verbeek (Rowdy Byte) - Full Stack Developer & UI/UX Designer';

    const description = pageDescription ||
        'Rowdy Verbeek, also known as Rowdy Byte, is a junior full-stack coding enthusiast from the Netherlands specializing in SvelteKit, TypeScript, and modern web technologies.';

    const keywords = [
        ...rowdyVerbeekKeywords,
        ...additionalKeywords
    ].join(', ');

    return {
        title,
        description,
        keywords
    };
};
