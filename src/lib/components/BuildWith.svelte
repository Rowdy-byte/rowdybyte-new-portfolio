<script lang="ts">
	import gsap from 'gsap';

	const techStack = [
		{
			name: 'SvelteKit',
			icon: 'sveltekit',
			description: 'Full-stack framework for modern web apps',
			color: '#ff3e00'
		},
		{
			name: 'TypeScript',
			icon: 'typescript',
			description: 'Type-safe JavaScript with enhanced developer experience',
			color: '#3178c6'
		},
		{
			name: 'Tailwind CSS',
			icon: 'tailwind',
			description: 'Utility-first CSS framework for rapid UI development',
			color: '#06b6d4'
		},
		{
			name: 'GSAP',
			icon: 'gsap',
			description: 'Professional-grade animation library for smooth interactions',
			color: '#88ce02'
		},
		{
			name: 'Vercel',
			icon: 'vercel',
			description: 'Edge-optimized deployment platform with global CDN',
			color: '#ffffff'
		},
		{
			name: 'Vite',
			icon: 'vite',
			description: 'Lightning-fast build tool with hot module replacement',
			color: '#646cff'
		}
	];

	const icons: Record<string, string> = {
		sveltekit: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#ff3e00" rx="60"/><g clip-path="url(#skillIconsSvelte0)"><path fill="#fff" d="M193.034 61.797c-16.627-23.95-49.729-30.966-73.525-15.865L77.559 72.78c-11.44 7.17-19.372 18.915-21.66 32.186c-1.984 11.136-.306 22.576 5.033 32.492c-3.66 5.491-6.102 11.593-7.17 18c-2.44 13.576.764 27.61 8.696 38.745c16.78 23.95 49.728 30.966 73.525 15.865l41.949-26.695c11.441-7.17 19.373-18.915 21.661-32.187c1.983-11.135.305-22.576-5.034-32.491c3.661-5.492 6.102-11.593 7.17-18c2.593-13.729-.61-27.763-8.695-38.898"/><path fill="#ff3e00" d="M115.39 196.491a33.25 33.25 0 0 1-35.695-13.271c-4.881-6.712-6.712-15.101-5.34-23.339c.306-1.373.611-2.593.916-3.966l.763-2.44L78.169 155a55.6 55.6 0 0 0 16.475 8.237l1.525.458l-.152 1.525c-.153 2.136.458 4.424 1.678 6.255c2.441 3.508 6.712 5.186 10.83 4.118c.916-.305 1.831-.61 2.594-1.068l41.796-26.695c2.136-1.372 3.509-3.355 3.966-5.796s-.152-5.034-1.525-7.017c-2.441-3.509-6.712-5.034-10.831-3.966c-.915.305-1.83.61-2.593 1.068l-16.017 10.22c-2.593 1.678-5.491 2.898-8.542 3.661a33.25 33.25 0 0 1-35.695-13.271c-4.729-6.712-6.712-15.102-5.186-23.339c1.372-7.932 6.254-15.102 13.118-19.373l41.949-26.695c2.593-1.678 5.492-2.898 8.543-3.814a33.25 33.25 0 0 1 35.695 13.272c4.881 6.712 6.711 15.101 5.339 23.339c-.306 1.373-.611 2.593-1.068 3.966l-.763 2.44l-2.136-1.525a55.6 55.6 0 0 0-16.474-8.237l-1.526-.458l.153-1.525c.153-2.136-.458-4.424-1.678-6.255c-2.441-3.508-6.712-5.034-10.83-3.966c-.916.305-1.831.61-2.594 1.068l-41.796 26.695c-2.136 1.373-3.509 3.356-3.966 5.797s.152 5.034 1.525 7.017c2.441 3.508 6.712 5.033 10.831 3.966c.915-.305 1.83-.611 2.593-1.068l16.017-10.22c2.593-1.678 5.491-2.899 8.542-3.814a33.25 33.25 0 0 1 35.695 13.271c4.881 6.712 6.712 15.102 5.339 23.339c-1.373 7.932-6.254 15.102-13.119 19.373l-41.949 26.695c-2.593 1.678-5.491 2.898-8.542 3.813"/></g><defs><clipPath id="skillIconsSvelte0"><path fill="#fff" d="M53 38h149.644v180H53z"/></clipPath></defs></g></svg>`,
		typescript: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#007acc" rx="60"/><path fill="#fff" d="m56.611 128.849l-.081 10.484h33.32v94.679h23.569v-94.679h33.32v-10.281c0-5.689-.121-10.443-.284-10.565c-.122-.162-20.399-.244-44.983-.203l-44.739.122zm149.956-10.741c6.501 1.626 11.459 4.511 16.01 9.224c2.357 2.52 5.851 7.112 6.136 8.209c.081.325-11.053 7.802-17.798 11.987c-.244.163-1.22-.894-2.317-2.519c-3.291-4.795-6.745-6.868-12.028-7.233c-7.761-.529-12.759 3.535-12.718 10.321c0 1.991.284 3.169 1.097 4.795c1.706 3.535 4.876 5.648 14.832 9.955c18.326 7.884 26.168 13.085 31.045 20.48c5.445 8.249 6.664 21.415 2.966 31.208c-4.063 10.646-14.141 17.879-28.323 20.277c-4.388.772-14.791.65-19.504-.203c-10.281-1.829-20.033-6.908-26.047-13.572c-2.357-2.601-6.949-9.387-6.664-9.875c.121-.162 1.178-.812 2.356-1.503c1.138-.65 5.446-3.129 9.509-5.486l7.355-4.267l1.544 2.276c2.154 3.291 6.867 7.802 9.712 9.305c8.167 4.308 19.383 3.698 24.909-1.259c2.357-2.154 3.332-4.389 3.332-7.68c0-2.967-.366-4.267-1.91-6.502c-1.991-2.844-6.054-5.242-17.595-10.24c-13.206-5.689-18.895-9.224-24.096-14.832c-3.007-3.25-5.852-8.452-7.03-12.8c-.975-3.616-1.219-12.678-.447-16.335c2.722-12.759 12.353-21.658 26.25-24.3c4.511-.853 14.994-.528 19.424.569"/></g></svg>`,
		tailwind: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#242938" rx="60"/><path fill="url(#skillIconsTailwindcssDark0)" fill-rule="evenodd" d="M83 110q9-36 45-36c36 0 40.5 27 58.5 31.5q18 4.502 31.5-13.5q-9 36-45 36c-36 0-40.5-27-58.5-31.5Q96.5 92 83 110m-45 54q9-36 45-36c36 0 40.5 27 58.5 31.5q18 4.502 31.5-13.5q-9 36-45 36c-36 0-40.5-27-58.5-31.5q-18-4.502-31.5 13.5" clip-rule="evenodd"/><defs><linearGradient id="skillIconsTailwindcssDark0" x1="86.5" x2="163.5" y1="74" y2="185.5" gradientUnits="userSpaceOnUse"><stop stop-color="#32b1c1"/><stop offset="1" stop-color="#14c6b7"/></linearGradient></defs></g></svg>`,
		gsap: `<svg viewBox="0 0 24 24" class="w-8 h-8"><path fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 3.433-2.104 4.797C13.803 14.54 12.01 15.36 10.076 15.36c-1.935 0-3.728-.82-4.489-2.403C4.828 11.374 5.02 9.644 6.228 8.28 7.437 6.915 9.23 6.096 11.165 6.096c1.934 0 3.728.819 4.488 2.403.339.706.339 1.448 0 2.154-.17.354-.408.678-.705.956-.296.278-.65.501-1.042.657-.784.312-1.65.312-2.434 0-.392-.156-.746-.379-1.042-.657-.297-.278-.535-.602-.705-.956-.17-.354-.17-.735 0-1.089.085-.177.204-.338.35-.473.146-.135.32-.24.51-.309.38-.138.793-.138 1.173 0 .19.069.364.174.51.309.146.135.265.296.35.473.085.177.085.368 0 .545-.043.088-.102.168-.173.235-.071.067-.156.119-.248.153-.184.068-.384.068-.568 0-.092-.034-.177-.086-.248-.153-.071-.067-.13-.147-.173-.235-.043-.088-.043-.184 0-.272.021-.044.051-.084.088-.117.037-.033.081-.059.129-.076.096-.034.2-.034.296 0 .048.017.092.043.129.076.037.033.067.073.088.117.021.044.021.092 0 .136-.011.022-.025.042-.042.058-.017.016-.037.029-.059.038-.044.018-.092.018-.136 0-.022-.009-.042-.022-.059-.038-.017-.016-.031-.036-.042-.058-.011-.022-.011-.046 0-.068.005-.011.013-.021.021-.029.008-.008.018-.014.029-.019.022-.01.046-.01.068 0 .011.005.021.011.029.019.008.008.016.018.021.029.005.011.005.023 0 .034-.003.006-.006.011-.011.015-.005.004-.011.007-.017.009-.012.005-.025.005-.037 0-.006-.002-.012-.005-.017-.009-.005-.004-.008-.009-.011-.015-.003-.006-.003-.012 0-.018.001-.003.003-.006.005-.008.002-.002.005-.003.008-.004.006-.002.013-.002.019 0 .003.001.006.002.008.004.002.002.004.005.005.008.001.003.001.006 0 .009 0 .003-.001.006-.002.008-.001.002-.003.004-.005.005-.004.002-.008.002-.012 0-.002 0-.004-.001-.006-.002-.002-.001-.004-.003-.005-.005-.001-.002-.002-.005-.002-.008 0-.003 0-.006.002-.008.001-.002.003-.004.005-.005.002-.001.004-.002.006-.002.004-.001.008-.001.012 0"/></svg>`,
		vercel: `<svg viewBox="0 0 24 24" class="w-8 h-8"><path fill="currentColor" d="M12 2L22 20H2L12 2z"/></svg>`,
		vite: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#242938" rx="60"/><path fill="url(#skillIconsViteDark0)" d="m227.088 57.602l-93.832 167.787c-1.938 3.465-6.915 3.485-8.881.038L28.682 57.617c-2.142-3.756 1.07-8.306 5.328-7.545l93.932 16.79a5.1 5.1 0 0 0 1.812-.004l91.968-16.763c4.243-.773 7.47 3.742 5.366 7.507"/><path fill="url(#skillIconsViteDark1)" d="m172.687 28.05l-69.438 13.605a2.55 2.55 0 0 0-2.055 2.352l-4.272 72.141a2.55 2.55 0 0 0 3.118 2.635l19.333-4.461c1.809-.417 3.443 1.176 3.072 2.995l-5.744 28.126c-.387 1.893 1.391 3.511 3.239 2.95l11.941-3.628c1.851-.562 3.63 1.061 3.238 2.956l-9.128 44.179c-.571 2.764 3.105 4.271 4.638 1.901l1.024-1.582l56.582-112.92c.948-1.89-.686-4.046-2.763-3.646l-19.899 3.841c-1.87.36-3.461-1.381-2.934-3.21l12.989-45.026c.528-1.832-1.069-3.575-2.941-3.209"/><defs><linearGradient id="skillIconsViteDark0" x1="26.346" x2="143.127" y1="44.075" y2="202.673" gradientUnits="userSpaceOnUse"><stop stop-color="#41d1ff"/><stop offset="1" stop-color="#bd34fe"/></linearGradient><linearGradient id="skillIconsViteDark1" x1="122.551" x2="143.676" y1="31.743" y2="176.66" gradientUnits="userSpaceOnUse"><stop stop-color="#ffea83"/><stop offset=".083" stop-color="#ffdd35"/><stop offset="1" stop-color="#ffa800"/></linearGradient></defs></g></svg>`
	};

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

	// Function to animate the tech cards
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
	class="flex min-h-screen w-full flex-col items-center justify-center gap-12 py-8"
>
	<div class="text-center">
		<h1
			bind:this={headingRef}
			class="font-ginto mb-4 text-5xl font-black tracking-wide text-white sm:text-7xl md:text-8xl"
		>
			Built With
		</h1>
		<p class="font-walsheim-regular mx-auto max-w-2xl text-base text-gray-300 sm:text-lg">
			This portfolio was crafted using modern technologies and tools that I'm passionate about.
		</p>
	</div>

	<div id="builtwith" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
		{#each techStack as tech, i}
			<div
				bind:this={cardRefs[i]}
				class="group flex min-h-[200px] w-80 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#2c333c] to-[#1e252b] p-6 opacity-0 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				style="--tech-color: {tech.color}"
			>
				<div
					class="mb-4 rounded-full bg-white/10 p-4 transition-all duration-300 group-hover:bg-white/20"
					style="color: var(--tech-color)"
				>
					{@html icons[tech.icon]}
				</div>
				<h3 class="font-ginto mb-2 text-center text-lg font-semibold text-white sm:text-xl">
					{tech.name}
				</h3>
				<p
					class="font-walsheim-regular text-center text-sm text-gray-400 group-hover:text-gray-300"
				>
					{tech.description}
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
