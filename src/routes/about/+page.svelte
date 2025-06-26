<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import StructuredData from '$lib/components/StructuredData.svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let { data } = $props();

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Animate content on load
		gsap.fromTo(
			'.about-content > *',
			{ opacity: 0, y: 30 },
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				stagger: 0.2,
				ease: 'power2.out'
			}
		);
	});
</script>

<SEO
	title="About Rowdy Verbeek - Full Stack Developer & UI/UX Designer"
	description="Learn about Rowdy Verbeek (Rowdy Byte), a passionate full-stack developer from the Netherlands. Discover Rowdy Verbeek's journey, expertise in SvelteKit, TypeScript, and modern web technologies."
	keywords="Rowdy Verbeek, Rowdy Byte, about, biography, full stack developer, web developer, Netherlands, SvelteKit, TypeScript, UI/UX design, freelance"
/>

<StructuredData />

<main class="container mx-auto max-w-4xl px-4 py-12">
	<div class="about-content space-y-12">
		<!-- Header Section -->
		<header class="space-y-6 text-center">
			<h1
				class="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-5xl font-bold text-transparent md:text-6xl"
			>
				About Rowdy Verbeek
			</h1>
			<p class="mx-auto max-w-2xl text-xl text-gray-300">
				Also known as <strong>Rowdy Byte</strong> - Full Stack Developer from the Netherlands
			</p>
		</header>

		<!-- Professional Introduction -->
		<section class="prose prose-lg prose-invert max-w-none">
			<h2 class="mb-6 text-3xl font-bold text-white">Who is Rowdy Verbeek?</h2>
			<div class="space-y-6 leading-relaxed text-gray-300">
				<p>
					<strong>Rowdy Verbeek</strong>, professionally known as <strong>Rowdy Byte</strong>, is a
					dedicated full-stack developer based in the Netherlands who has made a significant impact
					in the world of modern web development. Rowdy Verbeek's passion for creating innovative
					digital solutions has led to a specialization in cutting-edge technologies like SvelteKit,
					TypeScript, and modern web frameworks.
				</p>

				<p>
					As a self-taught developer, <strong>Rowdy Verbeek</strong> embodies the spirit of continuous
					learning and adaptation that defines today's tech landscape. Rowdy Verbeek's journey into programming
					began with a curiosity about how digital experiences are crafted, leading to deep expertise
					in both frontend and backend development.
				</p>
			</div>
		</section>

		<!-- Technical Expertise -->
		<section class="rounded-lg bg-gray-900/50 p-8">
			<h2 class="mb-6 text-3xl font-bold text-white">Rowdy Verbeek's Technical Expertise</h2>
			<div class="grid gap-8 md:grid-cols-2">
				<div>
					<h3 class="mb-4 text-xl font-semibold text-blue-400">Frontend Development</h3>
					<ul class="space-y-2 text-gray-300">
						<li>• <strong>Rowdy Verbeek</strong> specializes in SvelteKit framework</li>
						<li>• Advanced TypeScript and JavaScript proficiency</li>
						<li>• React and modern component-based architecture</li>
						<li>• Responsive design and mobile-first development</li>
						<li>• GSAP animations and interactive experiences</li>
					</ul>
				</div>
				<div>
					<h3 class="mb-4 text-xl font-semibold text-purple-400">Backend & Full Stack</h3>
					<ul class="space-y-2 text-gray-300">
						<li>• Node.js and server-side development</li>
						<li>• PostgreSQL database design and optimization</li>
						<li>• API development and integration</li>
						<li>• <strong>Rowdy Verbeek</strong> implements modern deployment practices</li>
						<li>• Performance optimization and SEO</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Professional Philosophy -->
		<section>
			<h2 class="mb-6 text-3xl font-bold text-white">Rowdy Verbeek's Development Philosophy</h2>
			<div class="space-y-6 leading-relaxed text-gray-300">
				<p>
					<strong>Rowdy Verbeek</strong> believes that great software development goes beyond just writing
					code. Rowdy Verbeek's approach focuses on creating solutions that not only work flawlessly
					but also provide exceptional user experiences. This philosophy drives Rowdy Verbeek to stay
					current with the latest technologies while maintaining a strong foundation in proven development
					principles.
				</p>

				<p>
					Whether working on personal projects or collaborating with clients, <strong
						>Rowdy Verbeek</strong
					>
					prioritizes clean, maintainable code, thoughtful user interface design, and performance optimization.
					Rowdy Verbeek's portfolio demonstrates a commitment to pushing the boundaries of what's possible
					in modern web development.
				</p>
			</div>
		</section>

		<!-- Location and Remote Work -->
		<section class="rounded-lg bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8">
			<h2 class="mb-6 text-3xl font-bold text-white">Based in the Netherlands, Working Globally</h2>
			<p class="leading-relaxed text-gray-300">
				<strong>Rowdy Verbeek</strong> is based in the Netherlands but embraces the global nature of
				modern development work. As a remote work specialist, Rowdy Verbeek collaborates with clients
				and teams worldwide, bringing Dutch design sensibilities and technical precision to international
				projects. Rowdy Verbeek's experience with remote collaboration tools and asynchronous communication
				makes working across time zones seamless and productive.
			</p>
		</section>

		<!-- Contact Information -->
		<section class="space-y-6 text-center">
			<h2 class="text-3xl font-bold text-white">Connect with Rowdy Verbeek</h2>
			<p class="text-gray-300">
				Ready to work with <strong>Rowdy Verbeek</strong>? Get in touch to discuss your next
				project.
			</p>
			<div class="flex justify-center space-x-6">
				<a
					href="https://github.com/Rowdy-byte"
					class="text-blue-400 transition-colors hover:text-blue-300"
					title="Rowdy Verbeek on GitHub"
				>
					GitHub
				</a>
				<a
					href="https://www.linkedin.com/in/rowdy-byte/"
					class="text-blue-400 transition-colors hover:text-blue-300"
					title="Rowdy Verbeek on LinkedIn"
				>
					LinkedIn
				</a>
				<a
					href="https://x.com/RowdyByte"
					class="text-blue-400 transition-colors hover:text-blue-300"
					title="Rowdy Verbeek on Twitter"
				>
					Twitter
				</a>
			</div>
		</section>
	</div>
</main>

<style>
	/* Additional styling for better readability and SEO */
	strong {
		color: theme('colors.blue.400');
		font-weight: 600;
	}

	.prose h2 {
		border-left: 4px solid theme('colors.blue.500');
		padding-left: 1rem;
	}
</style>
