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
	import SEOContent from '$lib/components/SEOContent.svelte';

	let { data } = $props();
	console.log('Page data:', data);
</script>

<SEO
	title="Rowdy Verbeek (Rowdy Byte) - Full Stack Developer & UI/UX Designer"
	description="Rowdy Verbeek, also known as Rowdy Byte, is a junior full-stack coding enthusiast from the Netherlands specializing in SvelteKit, TypeScript, and modern web technologies. Creating beautiful, performant web applications and solving real-world problems with code."
	keywords="Rowdy Verbeek, Rowdy Byte, full stack developer, web developer, SvelteKit, TypeScript, portfolio, Netherlands, remote work, freelance developer, UI/UX design, Rowdy-byte"
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

	<!-- Hidden SEO content for better indexing -->
	<SEOContent />
</main>
