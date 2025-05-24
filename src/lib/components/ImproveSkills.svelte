<script lang="ts">
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import Bubbles from './Bubbles.svelte';

	const improveSkillTags = [
		'animation',
		'accessibility',
		'advanced testing',
		'web performance',
		'web security',
		'architecture',
		'open source',
		'UX/UI',
		'AI integration',
		'cloud',
		'public speaking',
		'blogging'
	];

	let badgeRefs: HTMLElement[] = [];
	let sectionRef: HTMLElement;

	// Color palette for tag highlights
	const highlightColors = [
		'#f59e0b', // amber-500
		'#38bdf8', // sky-400
		'#a21caf', // purple-500
		'#f472b6', // pink-400
		'#4ade80', // green-400
		'#f87171', // red-400
		'#818cf8', // indigo-400
		'#fde68a', // yellow-300
		'#f9a8d4', // pink-300
		'#facc15', // yellow-400
		'#2dd4bf', // teal-400
		'#eab308' // yellow-500
	];

	function highlightTagsLoop() {
		if (!badgeRefs.length) return;
		let i = 0;
		function highlightNext() {
			const tag = badgeRefs[i % badgeRefs.length];
			const color = highlightColors[i % highlightColors.length];
			gsap.fromTo(
				tag,
				{
					borderColor: 'rgba(255,255,255,0.18)',
					color: '#fff',
					backgroundColor: 'rgba(166,172,205,0.13)',
					boxShadow: 'none',
					opacity: 1
				},
				{
					borderColor: color,
					color: color,
					backgroundColor: '#2c333c',
					boxShadow: `0 0 0 2px ${color}44`,
					duration: 0.7,
					ease: 'power1.inOut',
					onComplete: () => {
						gsap.to(tag, {
							borderColor: '#2c333c',
							color: '#fff',
							boxShadow: 'none',
							duration: 1.2,
							ease: 'power1.inOut',
							onComplete: () => {
								i = (i + 1) % badgeRefs.length;
								highlightNext();
							}
						});
					}
				}
			);
		}
		highlightNext();
	}

	function animateBadges() {
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
					highlightTagsLoop();
				}
			}
		);
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					animateBadges();
				}
			},
			{ threshold: 0.2 }
		);
		if (sectionRef) observer.observe(sectionRef);
		return () => observer.disconnect();
	});
</script>

<main class="relative flex min-h-screen w-full flex-col items-center justify-center px-2 py-8">
	<section
		id="improvements"
		bind:this={sectionRef}
		class="flex w-full max-w-3xl flex-col items-center justify-center"
	>
		<!-- <Bubbles /> -->
		<h2 class="heading mb-18 text-center text-7xl font-bold md:text-8xl">Improve Skills</h2>
		<div class="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-4">
			{#each improveSkillTags as skill, i}
				<span
					bind:this={badgeRefs[i]}
					class="rounded-full bg-[#2c333c] px-4 py-2 text-center text-lg font-medium tracking-wider break-words text-white lowercase shadow transition-all duration-200 hover:-translate-y-1 hover:transform hover:shadow-lg sm:px-6 sm:py-3 sm:text-base"
				>
					{skill}
				</span>
			{/each}
		</div>
	</section>
</main>

<style>
	main {
		font-family: 'GT Walsheim Pro Regular', sans-serif;
	}

	.heading {
		font-family: 'GT Walsheim Pro', sans-serif;
	}
</style>
