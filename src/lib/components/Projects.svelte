<script lang="ts">
	import gsap from 'gsap';

	let card1: HTMLElement;
	let card2: HTMLElement;
	let card3: HTMLElement;
	let card4: HTMLElement;
	let card5: HTMLElement;

	let card2Content: HTMLElement;
	let card3Content: HTMLElement;
	let card4Content: HTMLElement;
	let card5Content: HTMLElement;

	function animateCardIn(card: HTMLElement) {
		gsap.to(card, {
			scale: 1.04,
			boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
			duration: 0.35,
			ease: 'power2.out'
		});
	}
	function animateCardOut(card: HTMLElement) {
		gsap.to(card, {
			scale: 1,
			boxShadow: '0 4px 16px 0 rgba(0,0,0,0.12)',
			duration: 0.3,
			ease: 'power2.in'
		});
	}

	function animateCardContentIn(content: HTMLElement) {
		gsap.to(content, {
			scale: 1.04,
			y: -8,
			duration: 0.35,
			ease: 'power2.out'
		});
	}
	function animateCardContentOut(content: HTMLElement) {
		gsap.to(content, {
			scale: 1,
			y: 0,
			duration: 0.3,
			ease: 'power2.in'
		});
	}

	$effect(() => {
		const cardRefs = [card1, card2, card3, card4, card5];

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const el = entry.target as HTMLElement;
						gsap.fromTo(
							el,
							{ y: 60, opacity: 0, scale: 0.92 },
							{
								y: 0,
								opacity: 1,
								scale: 1,
								duration: 0.7,
								ease: 'back.out(1.7)'
							}
						);
						observer.unobserve(el);
					}
				});
			},
			{ threshold: 0.15 }
		);

		cardRefs.forEach((el) => {
			if (el) observer.observe(el);
		});
	});
</script>

<div class="flex min-h-screen w-full flex-col items-center justify-center px-2 py-8">
	<section id="projects" class="flex w-full max-w-4xl flex-col items-center justify-center">
		<h2 bind:this={card1} class="mb-14 text-center text-4xl font-bold sm:text-7xl">Projects</h2>

		<div class="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
			<a
				bind:this={card2}
				href="https://serialmapper-prisma.vercel.app/"
				class="rounded-2xl bg-gray-500/20 p-8 opacity-0 shadow-lg transition-all hover:-translate-y-1"
				target="_blank"
				rel="noopener noreferrer"
				onmouseenter={() => {
					animateCardIn(card2);
					animateCardContentIn(card2Content);
				}}
				onmouseleave={() => {
					animateCardOut(card2);
					animateCardContentOut(card2Content);
				}}
			>
				<div bind:this={card2Content} class="transition-transform duration-300">
					<p class=" text-center text-2xl font-bold italic">
						SN<span class="text-md text-orange-500">mapper</span>
					</p>
					<p class="mt-4 text-center text-base tracking-wider">
						SerialMapper is a SvelteKit-based app that streamlines bulk product intake by importing
						Excel serials, validating data, and visualizing efficiency gains—perfect for warehouses
						and logistics teams handling high-volume entries.
					</p>
				</div>
			</a>

			<a
				bind:this={card3}
				href="https://swaentje.vercel.app/"
				class="rounded-2xl bg-gray-500/20 p-8 opacity-0 shadow-lg transition-all hover:-translate-y-1"
				target="_blank"
				rel="noopener noreferrer"
				onmouseenter={() => {
					animateCardIn(card3);
					animateCardContentIn(card3Content);
				}}
				onmouseleave={() => {
					animateCardOut(card3);
					animateCardContentOut(card3Content);
				}}
			>
				<div bind:this={card3Content} class="transition-transform duration-300">
					<p class="swaentje text-center text-3xl font-bold">'t Swaentje</p>
					<p class="mt-4 text-center text-base tracking-wider">
						't Swaentje is a simple yet effective flyer to reach more customers.
					</p>
				</div>
			</a>

			<a
				bind:this={card4}
				href="https://fancy-counter-three-murex.vercel.app/"
				class="rounded-2xl bg-gray-500/20 p-8 opacity-0 shadow-lg transition-all hover:-translate-y-1"
				target="_blank"
				rel="noopener noreferrer"
				onmouseenter={() => {
					animateCardIn(card4);
					animateCardContentIn(card4Content);
				}}
				onmouseleave={() => {
					animateCardOut(card4);
					animateCardContentOut(card4Content);
				}}
			>
				<div bind:this={card4Content} class="transition-transform duration-300">
					<p class="font-inter text-center text-3xl font-bold text-[#bef227]">Fancy Counter</p>
					<p class="mt-4 text-center text-base tracking-wider">
						Fancy Counter is a React-based interactive counter application with smooth animations,
						featuring increment/decrement functionality and visual feedback. This project was built
						to practice React fundamentals including state management, component structure, and UI
						interactions.
					</p>
				</div>
			</a>

			<a
				bind:this={card5}
				href="https://word-analytics-nu.vercel.app/"
				class="rounded-2xl bg-gray-500/20 p-8 opacity-0 shadow-lg transition-all hover:-translate-y-1"
				target="_blank"
				rel="noopener noreferrer"
				onmouseenter={() => {
					animateCardIn(card5);
					animateCardContentIn(card5Content);
				}}
				onmouseleave={() => {
					animateCardOut(card5);
					animateCardContentOut(card5Content);
				}}
			>
				<div bind:this={card5Content} class="transition-transform duration-300">
					<p class="word-analytics text-center text-3xl font-bold">
						WORD<span class="word-analytics-span font-thin">ANALYTICS</span>
					</p>
					<p class="mt-4 text-center text-base tracking-wider">
						Word Analytics is a web application that provides insights into word usage and frequency
						analysis. Users can input text, and the app will generate statistics on word count,
						unique words, and more. This project was built to practice React fundamentals including
						state management, component structure, and UI interactions.
					</p>
				</div>
			</a>
		</div>
	</section>
</div>

<style>
	.word-analytics {
		font-family: 'Inter';
	}

	.swaentje {
		font-family: 'Rouge Script';
	}
</style>
