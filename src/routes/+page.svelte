<script lang="ts">
	import Contact from '$lib/components/Contact.svelte';
	import HardSkills from '$lib/components/HardSkills.svelte';
	import Intro from '$lib/components/Intro.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Socials from '$lib/components/Socials.svelte';
	import SoftSkills from '$lib/components/SoftSkills.svelte';
	import Lightning2 from '$lib/components/Lightning2.svelte';
	import BuildWith from '$lib/components/BuildWith.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import StructuredData from '$lib/components/StructuredData.svelte';

	let { data } = $props();
	console.log('Page data:', data);
</script>

<SEO
	title="Full Stack Coding Enthusiast & UI/UX Designer"
	description="Rowdy Byte - Experienced full-stack developer from the Netherlands creating modern web applications with SvelteKit, TypeScript, and cutting-edge technologies. Remote work specialist passionate about solving real-world problems with code."
	keywords="full stack developer, web developer, SvelteKit, TypeScript, portfolio, Netherlands, remote work, freelance developer, UI/UX design"
/>

<StructuredData />

<!-- Use semantic HTML structure -->
<main>
	<header>
		<Intro blogPostsCount={data.posts.length} docsCount={data.headers.length} />
	</header>

	<section aria-labelledby="social-heading">
		<Socials />
	</section>

	<section aria-labelledby="technical-skills-heading">
		<HardSkills />
	</section>

	<section aria-labelledby="soft-skills-heading">
		<SoftSkills />
	</section>

	<section aria-labelledby="projects-heading">
		<Projects />
	</section>

	<section aria-labelledby="portfolio-heading">
		<Carousel />
	</section>

	<section aria-labelledby="tech-stack-heading">
		<BuildWith />
	</section>

	<section aria-labelledby="contact-heading">
		<Contact />
	</section>
</main>
