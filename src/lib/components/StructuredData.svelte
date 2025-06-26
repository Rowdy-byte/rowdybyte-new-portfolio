<script lang="ts">
	const personStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': 'https://rowdybyte.xyz/#person',
		name: 'Rowdy Verbeek',
		alternateName: ['Rowdy Byte', 'Rowdy-byte'],
		givenName: 'Rowdy',
		familyName: 'Verbeek',
		jobTitle: 'Full Stack Developer',
		description:
			'Rowdy Verbeek (Rowdy Byte) - Experienced full-stack developer from the Netherlands specializing in SvelteKit, TypeScript, and modern web technologies',
		url: 'https://rowdybyte.xyz',
		mainEntityOfPage: 'https://rowdybyte.xyz',
		image: {
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
			'Responsive Design'
		],
		hasOccupation: {
			'@type': 'Occupation',
			name: 'Full Stack Developer',
			occupationLocation: {
				'@type': 'Country',
				name: 'Netherlands'
			},
			skills: 'JavaScript, TypeScript, SvelteKit, React, Node.js, PostgreSQL, UI/UX Design'
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
		}
	};

	const websiteStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': 'https://rowdybyte.xyz/#website',
		name: 'Rowdy Verbeek Portfolio - Rowdy Byte',
		alternateName: 'Rowdy Byte Portfolio',
		url: 'https://rowdybyte.xyz',
		description:
			"Portfolio website showcasing Rowdy Verbeek's full-stack development projects, skills, and professional experience. Specializing in SvelteKit, TypeScript, and modern web technologies.",
		author: {
			'@type': 'Person',
			'@id': 'https://rowdybyte.xyz/#person',
			name: 'Rowdy Verbeek'
		},
		mainEntity: {
			'@type': 'Person',
			'@id': 'https://rowdybyte.xyz/#person'
		},
		publisher: {
			'@type': 'Person',
			'@id': 'https://rowdybyte.xyz/#person'
		},
		inLanguage: 'en',
		copyrightHolder: {
			'@type': 'Person',
			'@id': 'https://rowdybyte.xyz/#person'
		},
		creator: {
			'@type': 'Person',
			'@id': 'https://rowdybyte.xyz/#person'
		},
		potentialAction: {
			'@type': 'SearchAction',
			target: 'https://rowdybyte.xyz/?search={search_term_string}',
			'query-input': 'required name=search_term_string'
		}
	};

	const professionalServiceData = {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		name: 'Rowdy Byte Development Services',
		description: 'Full-stack web development services specializing in modern web technologies',
		provider: {
			'@type': 'Person',
			name: 'Rowdy Verbeek'
		},
		serviceType: 'Web Development',
		areaServed: 'Worldwide',
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Development Services',
			itemListElement: [
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Frontend Development',
						description: 'Modern frontend development with SvelteKit, React, and TypeScript'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Backend Development',
						description: 'Server-side development with Node.js, databases, and API design'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Full Stack Development',
						description: 'Complete web application development from conception to deployment'
					}
				}
			]
		}
	};

	// Add BreadcrumbList for better navigation understanding
	const breadcrumbData = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: 'https://rowdybyte.xyz'
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Portfolio',
				item: 'https://rowdybyte.xyz#projects'
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: 'Skills',
				item: 'https://rowdybyte.xyz#hardskills'
			},
			{
				'@type': 'ListItem',
				position: 4,
				name: 'Contact',
				item: 'https://rowdybyte.xyz#contact'
			}
		]
	};

	// Add Organization data for professional presence
	const organizationData = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': 'https://rowdybyte.xyz/#organization',
		name: 'Rowdy Byte',
		alternateName: 'Rowdy Verbeek Development',
		url: 'https://rowdybyte.xyz',
		logo: {
			'@type': 'ImageObject',
			url: 'https://rowdybyte.xyz/rowdy-bg-rm-six.png'
		},
		sameAs: [
			'https://github.com/Rowdy-byte',
			'https://www.linkedin.com/in/rowdy-byte/',
			'https://x.com/RowdyByte'
		],
		founder: {
			'@type': 'Person',
			'@id': 'https://rowdybyte.xyz/#person'
		},
		description:
			'Full-stack web development services by Rowdy Verbeek, specializing in modern web technologies and exceptional user experiences.'
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(personStructuredData)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(websiteStructuredData)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(professionalServiceData)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbData)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(organizationData)}</script>`}
</svelte:head>
