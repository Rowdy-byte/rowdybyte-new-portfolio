<script lang="ts">
	import gsap from 'gsap';
	import Bubbles from './Bubbles.svelte';

	const improveSkills = [
		'receiving feedback',
		'giving feedback',
		'teamwork',
		'being more consistent',
		'gaining more professional experience'
	];

	let badgeRefs: HTMLElement[] = $state([]);
	let sectionRef: HTMLElement;

	function setBadgeRef(node: HTMLElement, index: number) {
		badgeRefs[index] = node;
		return {};
	}

	let hasAnimated = false;

	function animateBadges() {
		if (!hasAnimated && badgeRefs.length === improveSkills.length && badgeRefs.every(Boolean)) {
			hasAnimated = true;
			gsap.fromTo(
				badgeRefs,
				{ y: 40, opacity: 0, scale: 0.8 },
				{
					y: 0,
					opacity: 1,
					scale: 1,
					stagger: 0.07,
					duration: 0.6,
					ease: 'back.out(2)',
					onComplete: () => {
						badgeRefs.forEach((el, i) => {
							gsap.to(el, {
								y: '-=16',
								repeat: -1,
								yoyo: true,
								duration: 0.4 + i * 0.07,
								ease: 'sine.inOut',
								delay: i * 0.07
							});
						});
					}
				}
			);
		}
	}

	$effect(() => {
		if (!sectionRef) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					animateBadges();
				}
			},
			{ threshold: 0.2 }
		);
		observer.observe(sectionRef);
		return () => observer.disconnect();
	});
</script>

<div class="relative flex min-h-screen w-full flex-col items-center justify-center px-2 py-8">
	<Bubbles />
	<section
		bind:this={sectionRef}
		class="flex w-full max-w-3xl flex-col items-center justify-center"
	>
		<h2 class="mb-14 text-center text-4xl font-bold sm:text-7xl">Improvements</h2>
		<div class="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-4">
			{#each improveSkills as skill, i}
				<span
					use:setBadgeRef={i}
					class="rounded-full bg-gray-500/20 px-4 py-2 text-center text-sm font-medium tracking-wider break-words text-white lowercase shadow transition-all duration-200 hover:-translate-y-1 hover:transform hover:shadow-lg sm:px-6 sm:py-3 sm:text-base"
				>
					{skill}
				</span>
			{/each}
		</div>
	</section>
</div>
