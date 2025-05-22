<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import gsap from 'gsap';

	export const tubeGlowColors: string[] = [
		'#ec4899', // pink-500
		'#38bdf8', // blue-400
		'#a21caf', // purple-500
		'#facc15', // yellow-400
		'#4ade80', // green-400
		'#f87171', // red-400
		'#818cf8', // indigo-400
		'#2dd4bf', // teal-400
		'#f9a8d4', // pink-300
		'#fde68a' // yellow-300
	];

	let tubeRefs: HTMLElement[] = [];
	let containerRef: HTMLElement;
	let hasGlowed = false;
	let listeners: Array<() => void> = [];

	const tubeGradients = [
		['from-pink-500', 'to-yellow-400'],
		['from-blue-400', 'to-green-400'],
		['from-purple-500', 'to-pink-400'],
		['from-yellow-400', 'to-red-400'],
		['from-green-400', 'to-blue-500'],
		['from-red-400', 'to-orange-400'],
		['from-indigo-400', 'to-purple-500'],
		['from-teal-400', 'to-cyan-400'],
		['from-pink-300', 'to-fuchsia-500'],
		['from-yellow-300', 'to-lime-400']
	];

	const colorMap: Record<string, string> = {
		'from-pink-500': '#ec4899',
		'from-blue-400': '#38bdf8',
		'from-purple-500': '#a21caf',
		'from-yellow-400': '#facc15',
		'from-green-400': '#4ade80',
		'from-red-400': '#f87171',
		'from-indigo-400': '#818cf8',
		'from-teal-400': '#2dd4bf',
		'from-pink-300': '#f9a8d4',
		'from-yellow-300': '#fde68a'
	};

	function glowTubesOnce() {
		if (hasGlowed || tubeRefs.length !== 10 || !tubeRefs.every(Boolean)) return;
		hasGlowed = true;
		tubeRefs.forEach((el, i) => {
			const fromClass = tubeGradients[i][0];
			const glow = colorMap[fromClass] || '#fff';
			gsap.fromTo(
				el,
				{ boxShadow: 'none' },
				{
					boxShadow: `0 0 32px 8px ${glow}`,
					duration: 0.5,
					ease: 'power2.out',
					delay: i * 0.07,
					onComplete: () => {
						gsap.to(el, {
							boxShadow: 'none',
							duration: 0.5,
							ease: 'power2.in'
						});
					}
				}
			);
		});
	}

	onMount(async () => {
		await tick();
		listeners.forEach((off) => off());
		listeners = [];
		if (tubeRefs.length === 10 && tubeRefs.every(Boolean)) {
			tubeRefs.forEach((el, i) => {
				const fromClass = tubeGradients[i][0];
				const glow = colorMap[fromClass] || '#fff';
				let tween: gsap.core.Tween | null = null;
				const onEnter = () => {
					tween = gsap.to(el, {
						boxShadow: `0 0 32px 8px ${glow}`,
						duration: 0.3,
						ease: 'power2.out'
					});
				};
				const onLeave = () => {
					tween && tween.kill();
					gsap.to(el, {
						boxShadow: 'none',
						duration: 0.3,
						ease: 'power2.in'
					});
				};
				el.addEventListener('mouseenter', onEnter);
				el.addEventListener('mouseleave', onLeave);
				listeners.push(() => {
					el.removeEventListener('mouseenter', onEnter);
					el.removeEventListener('mouseleave', onLeave);
				});
			});
		}

		// IntersectionObserver for scroll-in-view glow
		let observer: IntersectionObserver | null = null;
		if (containerRef) {
			observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						glowTubesOnce();
					}
				},
				{ threshold: 0.2 }
			);
			observer.observe(containerRef);
			listeners.push(() => observer && observer.disconnect());
		}
	});

	onDestroy(() => {
		listeners.forEach((off) => off());
		listeners = [];
	});
</script>

<!-- Tubes visual -->
<div
	bind:this={containerRef}
	class="mx-auto mb-8 flex max-w-3xl flex-row items-center justify-center gap-1 px-1 sm:gap-2 sm:px-2"
	style="height: 180px;"
>
	<div class="flex h-full w-full skew-x-[-18deg] justify-center gap-1 sm:gap-2">
		{#each tubeGradients as colors, i}
			<!-- Tapered tube heights: middle is longest, sides are shortest -->
			<div
				bind:this={tubeRefs[i]}
				class={`w-0.5 flex-1 rounded-full bg-gradient-to-b ${colors[0]} ${colors[1]} transition-shadow duration-300 sm:w-1`}
				style="height: {[
					'70px', // 0 (leftmost)
					'90px', // 1
					'110px', // 2
					'130px', // 3
					'150px', // 4
					'180px', // 5 (center, longest)
					'150px', // 6
					'130px', // 7
					'110px', // 8
					'90px' // 9 (rightmost)
				][i]}; align-self: flex-end;"
			></div>
		{/each}
	</div>
</div>
