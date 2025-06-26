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

	let sectionRef: HTMLElement;
	let cardRefs: HTMLElement[] = [];
	let headingRef: HTMLElement;

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

	// Function to animate the heading letter by letter
	function animateHeading() {
		if (headingRef) {
			// Split text into individual characters
			const chars = headingRef.textContent!.split('');
			headingRef.innerHTML = chars
				.map((char) => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
				.join('');

			// Animate each character
			gsap.fromTo(
				'.char',
				{
					opacity: 0,
					y: 60,
					rotation: 20,
					scale: 0.3
				},
				{
					opacity: 1,
					y: 0,
					rotation: 0,
					scale: 1,
					duration: 0.7,
					stagger: 0.1,
					ease: 'back.out(1.9)'
				}
			);
		}
	}

	// Function to animate the project cards
	function animateCards() {
		if (cardRefs.length > 0) {
			const visibleCards = cardRefs.filter(Boolean);
			gsap.fromTo(
				visibleCards,
				{
					opacity: 0,
					y: 80,
					scale: 0.7,
					rotation: 5
				},
				{
					opacity: 1,
					y: 0,
					scale: 1,
					rotation: 0,
					duration: 0.8,
					stagger: 0.12,
					ease: 'back.out(1.7)',
					onComplete: () => {
						// Add floating animation after cards appear
						gsap.to(visibleCards, {
							y: '-=8',
							repeat: -1,
							yoyo: true,
							duration: 2.5,
							ease: 'sine.inOut',
							stagger: 0.4
						});
					}
				}
			);
		}
	}

	$effect(() => {
		let hasAnimated = false;
		const observer = new window.IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !hasAnimated) {
					hasAnimated = true;
					// First animate heading, then cards
					animateHeading();
					setTimeout(() => animateCards(), 900);
					observer.disconnect();
				}
			},
			{ threshold: 0.2 }
		);
		if (sectionRef) observer.observe(sectionRef);
		return () => observer.disconnect();
	});
</script>

{#snippet projectCard(project: Project, index: number)}
	<a
		bind:this={cardRefs[index]}
		href={project.url}
		class="group flex min-h-[280px] w-80 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#2c333c] to-[#1e252b] p-6 opacity-0 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
		target="_blank"
		rel="noopener noreferrer"
	>
		<h3 class="font-ginto mb-3 text-center text-xl font-semibold text-white sm:text-2xl {project.headingClass}">
			{#if project.titleGradient}
				<span class={project.titleGradient}>
					{project.title}{#if project.titleAccent}<span class={project.titleAccentClass}
							>{project.titleAccent}</span
						>{/if}
				</span>
			{:else}
				<span class={project.titleColor || 'text-white'}>
					{project.title}{#if project.titleAccent}<span class={project.titleAccentColor || ''}
							>{project.titleAccent}</span
						>{/if}
				</span>
			{/if}
		</h3>
		
		<p class="font-walsheim-regular text-center text-sm text-gray-400 group-hover:text-gray-300 {project.paragraphClass}">
			{project.description}
		</p>
	</a>
{/snippet}

<main
	bind:this={sectionRef}
	class="mx-auto flex min-h-[150vh] w-full max-w-5xl flex-col items-center justify-center gap-12 rounded-lg py-8"
>
	<div class="text-center">
		<h1
			bind:this={headingRef}
			id="projects"
			class="font-ginto mb-4 text-5xl font-black tracking-wide text-white sm:text-7xl md:text-8xl"
		>
			Projects
		</h1>
		<p class="font-walsheim-regular mx-auto max-w-2xl text-base text-gray-300 sm:text-lg">
			A collection of web applications showcasing modern development practices and creative solutions.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:gap-8">
		{#each projects as project, index}
			{@render projectCard(project, index)}
		{/each}
	</div>
</main>

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
