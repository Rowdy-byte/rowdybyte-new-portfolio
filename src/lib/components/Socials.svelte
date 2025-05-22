<script lang="ts">
	import gsap from 'gsap';

	const socials = [
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/in/your-profile',
			icon: 'linkedin',
			gradient: 'from-gray-600 to-gray-600'
		},
		{
			name: 'X',
			url: 'https://x.com/your-profile',
			icon: 'x',
			gradient: 'from-gray-500 to-gray-600'
		},
		{
			name: 'GitHub',
			url: 'https://github.com/your-profile',
			icon: 'github',
			gradient: 'from-gray-500 to-gray-600'
		}
	];

	const icons: Record<string, string> = {
		linkedin: `<svg fill="currentColor" viewBox="0 0 24 24" class="w-10 h-10"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v5.62z"/></svg>`,
		x: `<svg fill="currentColor" viewBox="0 0 24 24" class="w-10 h-10"><path d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"/></svg>`,
		github: `<svg fill="currentColor" viewBox="0 0 24 24" class="w-10 h-10"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.39-3.87-1.39-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.23 2.73.12 3.02.74.8 1.19 1.83 1.19 3.09 0 4.43-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2v3.26c0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>`
	};

	let sectionRef: HTMLElement;
	let cardRefs: HTMLElement[] = [];

	$effect(() => {
		let hasAnimated = false;
		const observer = new window.IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !hasAnimated) {
					hasAnimated = true;
					const visibleCards = cardRefs.filter(Boolean);
					gsap.fromTo(
						visibleCards,
						{ opacity: 0, y: 40, scale: 0.85 },
						{ opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.7)' }
					);
					observer.disconnect();
				}
			},
			{ threshold: 0.3 }
		);
		if (sectionRef) observer.observe(sectionRef);
	});
</script>

<div
	bind:this={sectionRef}
	class="flex min-h-screen w-full flex-col items-center justify-center gap-6 py-8 sm:gap-8"
	style="min-height: 100vh;"
>
	<h1 id="socials" class="mb-14 text-center text-4xl font-bold sm:text-7xl">Socials</h1>
	<div class="flex flex-row flex-wrap items-center justify-center gap-6 md:flex-row">
		{#each socials as social, i}
			<a
				bind:this={cardRefs[i]}
				href={social.url}
				target="_blank"
				rel="noopener noreferrer"
				class="group flex h-32 w-32 flex-col items-center justify-center rounded-full bg-gray-500/20 p-1 opacity-0 transition-transform duration-200 hover:scale-105 sm:h-40 sm:w-40"
			>
				<div class="flex h-full w-full flex-col items-center justify-center rounded-full">
					<span class="mb-2" aria-label={social.name}>
						{@html icons[social.icon]}
					</span>
					<span class="text-lg font-semibold capitalize drop-shadow sm:text-xl">{social.name}</span>
				</div>
			</a>
		{/each}
	</div>
</div>
