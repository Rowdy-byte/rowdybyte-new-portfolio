<script lang="ts">
	let {
		title = 'Rowdy Byte - Full Stack Developer',
		description = 'Experienced full-stack developer from the Netherlands specializing in SvelteKit, TypeScript, and modern web technologies. Creating beautiful, performant web applications with exceptional user experiences.',
		image = 'https://rowdybyte.xyz/rowdy-bg-rm-six.png',
		url = 'https://rowdybyte.xyz',
		type = 'website',
		keywords = '',
		section = ''
	} = $props();

	const fullTitle = title.includes('Rowdy Byte') ? title : `${title} | Rowdy Byte`;
	const canonicalUrl = section ? `${url}#${section}` : url;
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	{#if keywords}
		<meta name="keywords" content={keywords} />
	{/if}

	<!-- Open Graph -->
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content={type} />

	<!-- Twitter -->
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	<!-- Canonical -->
	<link rel="canonical" href={canonicalUrl} />
</svelte:head>
