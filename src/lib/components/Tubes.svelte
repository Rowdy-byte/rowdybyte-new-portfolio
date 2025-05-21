<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	export let tubeGlowColors: string[] = [
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

	let tubeRefs: (HTMLElement | null)[] = Array(10).fill(null);

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

	onMount(() => {
		if (tubeRefs.length === 10 && tubeRefs.every(Boolean)) {
			tubeRefs.forEach((el, i) => {
				if (!el) return;

				const glow = tubeGlowColors[i % tubeGlowColors.length];
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
				// Cleanup
				return () => {
					el.removeEventListener('mouseenter', onEnter);
					el.removeEventListener('mouseleave', onLeave);
				};
			});
		}
	});
</script>

<!-- Tubes visual -->
<div
	class="mx-auto mb-8 flex w-full max-w-full flex-row items-center justify-center gap-1 px-1 sm:max-w-3xl sm:gap-2 sm:px-2"
	style="height: 180px;"
>
	<div
		class="flex h-full w-full max-w-xs skew-x-[-18deg] justify-center gap-1 sm:max-w-3xl sm:gap-2"
	>
		{#each tubeGradients as colors, i}
			<div
				bind:this={tubeRefs[i]}
				class={`w-0.5 flex-1 rounded-full bg-gradient-to-b ${colors[0]} ${colors[1]} transition-shadow duration-300 sm:w-1`}
			></div>
		{/each}
	</div>
</div>
