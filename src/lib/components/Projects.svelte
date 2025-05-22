<script lang="ts">
	import gsap from 'gsap';

	let card1: HTMLElement;
	let card2: HTMLElement;
	let card3: HTMLElement;
	let card4: HTMLElement;
	let card5: HTMLElement;
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
	<section class="flex w-full max-w-5xl flex-col items-center justify-center">
		<h2 bind:this={card1} class="mb-14 text-center text-4xl font-bold sm:text-7xl">Projects</h2>

		<div class="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
			<a
				bind:this={card2}
				href="https://serialmapper-prisma.vercel.app/"
				class="rounded-2xl bg-gray-500/20 p-8 opacity-0 shadow-lg transition-all hover:-translate-y-1"
				target="_blank"
				rel="noopener noreferrer"
			>
				<p class="font-inter text-center text-3xl font-bold">SerialMapper</p>
				<p class="mt-4 text-center text-base">
					SerialMapper is a SvelteKit-based app that streamlines bulk product intake by importing
					Excel serials, validating data, and visualizing efficiency gains—perfect for warehouses
					and logistics teams handling high-volume entries.
				</p>
			</a>

			<a
				bind:this={card3}
				href="https://swaentje.vercel.app/"
				class="rounded-2xl bg-gray-500/20 p-8 opacity-0 shadow-lg transition-all hover:-translate-y-1"
				target="_blank"
				rel="noopener noreferrer"
			>
				<p class="font-rouge text-center text-3xl font-bold">'t Swaentje</p>
				<p class="mt-4 text-center text-base">
					't Swaentje is a simple yet effective flyer to reach more customers.
				</p>
			</a>

			<a
				bind:this={card4}
				href="https://fancy-counter-three-murex.vercel.app/"
				class="rounded-2xl bg-gray-500/20 p-8 opacity-0 shadow-lg transition-all hover:-translate-y-1"
				target="_blank"
				rel="noopener noreferrer"
			>
				<p class="font-inter text-center text-3xl font-bold">Fancy Counter</p>
				<p class="mt-4 text-center text-base">
					Fancy Counter is a React-based interactive counter application with smooth animations,
					featuring increment/decrement functionality and visual feedback. This project was built to
					practice React fundamentals including state management, component structure, and UI
					interactions.
				</p>
			</a>
			<a
				bind:this={card5}
				href="https://word-analytics-nu.vercel.app/"
				class="rounded-2xl bg-gray-500/20 p-8 opacity-0 shadow-lg transition-all hover:-translate-y-1"
				target="_blank"
				rel="noopener noreferrer"
			>
				<p class="font-inter text-center text-3xl font-bold">
					WORD<span class="font-thin">ANALYTICS</span>
				</p>
				<p class="mt-4 text-center text-base">
					Word Analytics is a web application that provides insights into word usage and frequency
					analysis. Users can input text, and the app will generate statistics on word count, unique
					words, and more. This project was built to practice React fundamentals including state
					management, component structure, and UI interactions.
				</p>
			</a>
		</div>
	</section>
</div>
