<script lang="ts">
	import gsap from 'gsap';

	interface Project {
		id: string;
		url: string;
		title: string;
		titleAccent?: string;
		titleAccentColor?: string;
		titleAccentClass?: string;
		titleColor?: string;
		titleGradient?: string;
		description: string;
		headingClass: string;
		paragraphClass: string;
	}

	let card1: HTMLElement;
	let cardRefs: HTMLElement[] = [];
	let contentRefs: HTMLElement[] = [];

	const projects: Project[] = [
		{
			id: 'serialmapper',
			url: 'https://serialmapper-prisma.vercel.app/',
			title: 'SN',
			titleAccent: 'mapper',
			titleAccentColor: 'text-orange-500',
			description:
				'SerialMapper is a SvelteKit-based app that streamlines bulk product intake by importing Excel serials, validating data, and visualizing efficiency gains—perfect for warehouses and logistics teams handling high-volume entries.',
			headingClass: 'serialmapper-heading',
			paragraphClass: 'serialmapper-paragraph'
		},
		{
			id: 'swaentje',
			url: 'https://swaentje.vercel.app/',
			title: "'t Swaentje",
			description: "'t Swaentje is a simple yet effective flyer to reach more customers.",
			headingClass: 'swaentje-heading',
			paragraphClass: 'swaentje-paragraph'
		},
		{
			id: 'fancy-counter',
			url: 'https://fancy-counter-three-murex.vercel.app/',
			title: 'Fancy Counter',
			titleColor: 'text-[#bef227]',
			description:
				'Fancy Counter is a React-based interactive counter application with smooth animations, featuring increment/decrement functionality and visual feedback. This project was built to practice React fundamentals including state management, component structure, and UI interactions.',
			headingClass: 'fancy-counter-heading',
			paragraphClass: 'fancy-counter-paragraph'
		},
		{
			id: 'word-analytics',
			url: 'https://word-analytics-nu.vercel.app/',
			title: 'WORD',
			titleAccent: 'ANALYTICS',
			titleAccentClass: 'word-analytics-span font-thin',
			titleGradient: 'bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent',
			description:
				'Word Analytics is a web application that provides insights into word usage and frequency analysis. Users can input text, and the app will generate statistics on word count, unique words, and more. This project was built to practice React fundamentals including state management, component structure, and UI interactions.',
			headingClass: 'word-analytics-heading',
			paragraphClass: 'word-analytics-paragraph'
		}
	];

	function animateCardIn(card: HTMLElement) {
		gsap.to(card, {
			scale: 1.04,
			boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
			duration: 0.35,
			ease: 'power2.out'
		});
	}

	function animateCardOut(card: HTMLElement) {
		gsap.to(card, {
			scale: 1,
			boxShadow: '0 4px 16px 0 rgba(0,0,0,0.12)',
			duration: 0.3,
			ease: 'power2.in'
		});
	}

	function animateCardContentIn(content: HTMLElement) {
		gsap.to(content, {
			scale: 1.04,
			y: -8,
			duration: 0.35,
			ease: 'power2.out'
		});
	}

	function animateCardContentOut(content: HTMLElement) {
		gsap.to(content, {
			scale: 1,
			y: 0,
			duration: 0.3,
			ease: 'power2.in'
		});
	}

	$effect(() => {
		const allCardRefs = [card1, ...cardRefs];

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const el = entry.target as HTMLElement;
						gsap.fromTo(
							el,
							{ y: 60, opacity: 0, scale: 0.92 },
							{
								y: 0,
								opacity: 1,
								scale: 1,
								duration: 0.7,
								ease: 'back.out(1.7)'
							}
						);
						observer.unobserve(el);
					}
				});
			},
			{ threshold: 0.15 }
		);

		allCardRefs.forEach((el) => {
			if (el) observer.observe(el);
		});
	});
</script>

{#snippet projectCard(project: Project, index: number)}
	<a
		bind:this={cardRefs[index]}
		href={project.url}
		class=" rounded-lg bg-gradient-to-br from-[#2c333c] to-[#1e252b] p-8 opacity-0 transition-all hover:-translate-y-1"
		target="_blank"
		rel="noopener noreferrer"
		onmouseenter={() => {
			animateCardIn(cardRefs[index]);
			animateCardContentIn(contentRefs[index]);
		}}
		onmouseleave={() => {
			animateCardOut(cardRefs[index]);
			animateCardContentOut(contentRefs[index]);
		}}
	>
		<div bind:this={contentRefs[index]} class=" transition-transform duration-300">
			<p
				class="{project.headingClass} text-center text-3xl font-bold {project.titleColor ||
					''} {project.titleGradient || ''}"
			>
				{#if project.titleGradient}
					<span class={project.titleGradient}>
						{project.title}{#if project.titleAccent}<span class={project.titleAccentClass}
								>{project.titleAccent}</span
							>{/if}
					</span>
				{:else}
					{project.title}{#if project.titleAccent}<span class={project.titleAccentColor || ''}
							>{project.titleAccent}</span
						>{/if}
				{/if}
			</p>
			<p class="{project.paragraphClass} mt-4 text-center text-base tracking-wider">
				{project.description}
			</p>
		</div>
	</a>
{/snippet}

<div class="flex min-h-[150vh] w-full flex-col items-center justify-center px-2 py-8">
	<section id="projects" class="flex w-full max-w-4xl flex-col items-center justify-center">
		<h1
			bind:this={card1}
			class="font-ginto mb-18 text-center text-5xl font-black tracking-wide text-white sm:text-7xl md:text-8xl"
		>
			Projects
		</h1>

		<div class="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
			{#each projects as project, index}
				{@render projectCard(project, index)}
			{/each}
		</div>
	</section>
</div>

<style>
	.heading {
		font-family: 'GT Walsheim Pro', sans-serif;
	}

	.word-analytics-heading {
		font-family: 'Inter';
	}

	.fancy-counter-heading {
		font-family: 'Inter';
	}

	.swaentje-heading {
		font-family: 'Rouge Script';
	}
</style>
