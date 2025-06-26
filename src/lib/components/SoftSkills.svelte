<script lang="ts">
	import gsap from 'gsap';
	import {
		Brain,
		Users,
		MessageCircle,
		Lightbulb,
		Target,
		Zap,
		Keyboard,
		TrendingUp,
		FileText,
		FolderOpen
	} from 'lucide-svelte';

	const softSkills = [
		{
			name: 'Adaptability',
			description: 'Quickly adjusting to new technologies and changing requirements',
			icon: Zap,
			color: '#06b6d4'
		},
		{
			name: 'Touch Typing',
			description: 'Fast and accurate typing without looking at the keyboard',
			icon: Keyboard,
			color: '#10b981'
		},
		{
			name: 'Perseverance',
			description: 'Persistence in overcoming challenges and debugging complex issues',
			icon: Target,
			color: '#f59e0b'
		},
		{
			name: 'Problem Solving',
			description: 'Breaking down complex problems into manageable solutions',
			icon: Lightbulb,
			color: '#ef4444'
		},
		{
			name: 'Self Improvement',
			description: 'Continuously learning new skills and improving existing ones',
			icon: TrendingUp,
			color: '#8b5cf6'
		},
		{
			name: 'Curiosity',
			description: 'Always eager to explore new technologies and methodologies',
			icon: Brain,
			color: '#3b82f6'
		},
		{
			name: 'Documenting',
			description: 'Creating clear documentation and maintaining code comments',
			icon: FileText,
			color: '#84cc16'
		},
		{
			name: 'Organized',
			description: 'Maintaining structured code, files, and project workflows',
			icon: FolderOpen,
			color: '#f97316'
		},
		{
			name: 'Analytical',
			description: 'Systematic approach to understanding and solving technical problems',
			icon: Users,
			color: '#ec4899'
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

<main
	bind:this={sectionRef}
	class="mx-auto flex min-h-[150vh] w-full max-w-5xl flex-col items-center justify-center gap-12 rounded-lg py-8"
>
	<div class="text-center">
		<h1
			bind:this={headingRef}
			id="softskills"
			class="font-ginto mb-4 text-5xl font-black tracking-wide text-white sm:text-7xl md:text-8xl"
		>
			Soft Skills
		</h1>
		<p class="font-walsheim-regular mx-auto max-w-2xl text-base text-gray-300 sm:text-lg">
			Personal qualities and interpersonal skills that drive effective collaboration and success.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
		{#each softSkills as skill, i}
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
					class="font-walsheim-regular text-center text-sm text-gray-400 group-hover:text-gray-300"
				>
					{skill.description}
				</p>
			</div>
		{/each}
	</div>
</main>

<style>
	/* main {
		background: linear-gradient(135deg, #1e252b 0%, #2c333c 100%);
	} */
</style>
