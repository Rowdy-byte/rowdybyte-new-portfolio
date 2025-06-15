<script lang="ts">
	const personStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Rowdy Verbeek',
		jobTitle: 'Full Stack Developer',
		description:
			'Experienced full-stack developer from the Netherlands specializing in SvelteKit, TypeScript, and modern web technologies',
		url: 'https://rowdybyte.xyz',
		image: 'https://rowdybyte.xyz/rowdy-bg-rm-six.png',
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
			'Tailwind CSS'
		],
		hasOccupation: {
			'@type': 'Occupation',
			name: 'Full Stack Developer',
			occupationLocation: {
				'@type': 'Country',
				name: 'Netherlands'
			}
		},
		worksFor: {
			'@type': 'Organization',
			name: 'Freelance / Remote Work'
		}
	};

	const websiteStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Rowdy Byte Portfolio',
		url: 'https://rowdybyte.xyz',
		description:
			'Portfolio website showcasing full-stack development projects, skills, and professional experience',
		author: {
			'@type': 'Person',
			name: 'Rowdy Verbeek'
		},
		mainEntity: {
			'@type': 'Person',
			name: 'Rowdy Verbeek'
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
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(personStructuredData)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(websiteStructuredData)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(professionalServiceData)}</script>`}
</svelte:head>
