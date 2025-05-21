<script lang="ts">
	import gsap from 'gsap';

	const softSkillsTags = [
		'adoptability',
		'touch typing',
		'perseverance',
		'problem solving',
		'self improvement',
		'remote work',
		'curiosity',
		'documenting',
		'organized',
		'analitic'
	];

	let badgeRefs: HTMLElement[] = $state([]);
	let sectionRef: HTMLElement;
	let tubeRefs: HTMLElement[] = $state([]);

	function setBadgeRef(node: HTMLElement, index: number) {
		badgeRefs[index] = node;
		return {};
	}
	function setTubeRef(node: HTMLElement, index: number) {
		tubeRefs[index] = node;
		return {};
	}

	let hasAnimated = false;

	function animateBadges() {
		if (!hasAnimated && badgeRefs.length === softSkillsTags.length && badgeRefs.every(Boolean)) {
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

<!-- Colored tubeings above the content (vertical, 10 tubes, thinner, 3x longer, skewed, responsive, no glow) -->
<div
	class="mx-auto mb-8 flex w-full max-w-full flex-row items-center justify-center gap-1 px-1 sm:max-w-3xl sm:gap-2 sm:px-2"
	style="height: 180px;"
>
	<div
		class="flex h-full w-full max-w-xs skew-x-[-18deg] justify-center gap-1 sm:max-w-3xl sm:gap-2"
	>
		{#each [['from-pink-500', 'to-yellow-400', 'shadow-pink-400'], ['from-blue-400', 'to-green-400', 'shadow-blue-400'], ['from-purple-500', 'to-pink-400', 'shadow-purple-400'], ['from-yellow-400', 'to-red-400', 'shadow-yellow-400'], ['from-green-400', 'to-blue-500', 'shadow-green-400'], ['from-red-400', 'to-orange-400', 'shadow-red-400'], ['from-indigo-400', 'to-purple-500', 'shadow-indigo-400'], ['from-teal-400', 'to-cyan-400', 'shadow-teal-400'], ['from-pink-300', 'to-fuchsia-500', 'shadow-pink-300'], ['from-yellow-300', 'to-lime-400', 'shadow-yellow-300']] as colors, i}
			<div
				use:setTubeRef={i}
				class={`w-0.5 flex-1 rounded-full bg-gradient-to-b ${colors[0]} ${colors[1]} transition-shadow duration-300 sm:w-1`}
				class:hover={`shadow-[0_0_32px_8px] ${colors[2]}`}
			></div>
		{/each}
	</div>
</div>

<div class="flex min-h-screen w-full flex-col items-center justify-center px-2 py-8">
	<section
		bind:this={sectionRef}
		class="flex w-full max-w-3xl flex-col items-center justify-center"
	>
		<h2 class="mb-8 text-center text-4xl font-bold sm:text-5xl">Soft Skills</h2>
		<div class="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-4">
			{#each softSkillsTags as skill, i}
				<span
					use:setBadgeRef={i}
					class="rounded-full bg-gray-500 px-4 py-2 text-center text-sm font-medium tracking-wider break-words text-white lowercase shadow transition-all duration-200 hover:-translate-y-1 hover:transform hover:shadow-lg sm:px-6 sm:py-3 sm:text-base"
				>
					{skill}
				</span>
			{/each}
		</div>
	</section>
</div>
