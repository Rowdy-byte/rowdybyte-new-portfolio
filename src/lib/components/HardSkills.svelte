<script lang="ts">
	import gsap from 'gsap';
	import { Code, Database, Palette, Globe, Server, Zap } from 'lucide-svelte';

	const hardSkills = [
		{
			name: 'Frontend Development',
			description: 'React, Svelte, Vue.js, TypeScript, HTML5, CSS3',
			icon: Code,
			color: '#3b82f6',
			level: 90
		},
		{
			name: 'Backend Development',
			description: 'Node.js, Python, Express, FastAPI, REST APIs',
			icon: Server,
			color: '#10b981',
			level: 85
		},
		{
			name: 'Database Management',
			description: 'PostgreSQL, MongoDB, Redis, SQL optimization',
			icon: Database,
			color: '#f59e0b',
			level: 80
		},
		{
			name: 'UI/UX Design',
			description: 'Figma, Adobe XD, Responsive design, Accessibility',
			icon: Palette,
			color: '#ef4444',
			level: 75
		},
		{
			name: 'Web Technologies',
			description: 'WebGL, PWA, WebAssembly, Modern browsers',
			icon: Globe,
			color: '#8b5cf6',
			level: 85
		},
		{
			name: 'Performance',
			description: 'Optimization, Bundling, Caching, Core Web Vitals',
			icon: Zap,
			color: '#06b6d4',
			level: 88
		}
	];

	let sectionRef: HTMLElement;
	let cardRefs: HTMLElement[] = [];
	let headingRef: HTMLElement;

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

	// Function to animate the skill cards
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

						// Animate progress bars
						animateProgressBars();
					}
				}
			);
		}
	}

	// Function to animate progress bars
	function animateProgressBars() {
		hardSkills.forEach((skill, index) => {
			const progressBar = document.querySelector(`#progress-${index}`);
			if (progressBar) {
				gsap.fromTo(
					progressBar,
					{ width: '0%' },
					{
						width: `${skill.level}%`,
						duration: 1.5,
						delay: index * 0.1,
						ease: 'power2.out'
					}
				);
			}
		});
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

<main
	bind:this={sectionRef}
	class="mx-auto flex min-h-[150vh] w-full max-w-5xl flex-col items-center justify-center gap-12 rounded-lg py-8"
>
	<div class="text-center">
		<h1
			bind:this={headingRef}
			class="font-ginto mb-4 text-5xl font-black tracking-wide text-white sm:text-7xl md:text-8xl"
		>
			Hard Skills
		</h1>
		<p class="font-walsheim-regular mx-auto max-w-2xl text-base text-gray-300 sm:text-lg">
			Technical expertise and programming capabilities that power modern web development.
		</p>
	</div>

	<div id="hardskills" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
		{#each hardSkills as skill, i}
			<div
				bind:this={cardRefs[i]}
				class="group flex min-h-[200px] w-80 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#2c333c] to-[#1e252b] p-6 opacity-0 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				style="--skill-color: {skill.color}"
			>
				<div
					class="mb-4 rounded-full bg-white/10 p-4 transition-all duration-300 group-hover:bg-white/20"
					style="color: var(--skill-color)"
				>
					<skill.icon size={32} class="transition-transform duration-300 group-hover:scale-110" />
				</div>
				<h3 class="font-ginto mb-2 text-center text-lg font-semibold text-white sm:text-xl">
					{skill.name}
				</h3>
				<p
					class="font-walsheim-regular mb-4 text-center text-sm text-gray-400 group-hover:text-gray-300"
				>
					{skill.description}
				</p>

				<!-- Progress Bar -->
				<div class="w-full">
					<div class="mb-1 flex justify-between text-xs text-gray-400">
						<span>Proficiency</span>
						<span>{skill.level}%</span>
					</div>
					<div class="h-2 w-full rounded-full bg-gray-700">
						<div
							id="progress-{i}"
							class="h-2 rounded-full transition-all duration-300"
							style="background-color: var(--skill-color); width: 0%;"
						></div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</main>

<style>
	/* main {
		background: linear-gradient(135deg, #1e252b 0%, #2c333c 100%);
	} */
</style>
