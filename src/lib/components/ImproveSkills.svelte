<script lang="ts">
	import gsap from 'gsap';
	import { TrendingUp, Target, BookOpen, Cpu, Gamepad2, Heart } from 'lucide-svelte';

	const improvementSkills = [
		{
			name: 'Advanced Algorithms',
			description: 'Data structures, complexity analysis, and optimization techniques',
			icon: Cpu,
			color: '#3b82f6',
			progress: 65
		},
		{
			name: 'System Design',
			description: 'Scalable architecture patterns and distributed systems',
			icon: Target,
			color: '#10b981',
			progress: 55
		},
		{
			name: 'DevOps & CI/CD',
			description: 'Docker, Kubernetes, GitHub Actions, deployment automation',
			icon: TrendingUp,
			color: '#f59e0b',
			progress: 70
		},
		{
			name: 'Mobile Development',
			description: 'React Native, Flutter, progressive web apps',
			icon: Gamepad2,
			color: '#ef4444',
			progress: 40
		},
		{
			name: 'Machine Learning',
			description: 'TensorFlow, data science, AI integration in web apps',
			icon: BookOpen,
			color: '#8b5cf6',
			progress: 35
		},
		{
			name: 'Accessibility',
			description: 'WCAG guidelines, inclusive design, assistive technologies',
			icon: Heart,
			color: '#06b6d4',
			progress: 80
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
		improvementSkills.forEach((skill, index) => {
			const progressBar = document.querySelector(`#improve-progress-${index}`);
			if (progressBar) {
				gsap.fromTo(
					progressBar,
					{ width: '0%' },
					{
						width: `${skill.progress}%`,
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
			Improve
		</h1>
		<p class="font-walsheim-regular mx-auto max-w-2xl text-base text-gray-300 sm:text-lg">
			Skills and technologies I'm actively learning and improving to stay current with industry
			trends.
		</p>
	</div>

	<div id="improvements" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
		{#each improvementSkills as skill, i}
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

				<!-- Progress Bar with Learning Status -->
				<div class="w-full">
					<div class="mb-1 flex justify-between text-xs text-gray-400">
						<span>Learning Progress</span>
						<span>{skill.progress}%</span>
					</div>
					<div class="h-2 w-full rounded-full bg-gray-700">
						<div
							id="improve-progress-{i}"
							class="h-2 rounded-full transition-all duration-300"
							style="background-color: var(--skill-color); width: 0%;"
						></div>
					</div>
					<!-- Status indicator -->
					<div class="mt-2 text-center">
						<span
							class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
							style="background-color: {skill.color}20; color: var(--skill-color)"
						>
							{#if skill.progress < 50}
								🌱 Learning
							{:else if skill.progress < 80}
								📚 Progressing
							{:else}
								⭐ Advanced
							{/if}
						</span>
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
