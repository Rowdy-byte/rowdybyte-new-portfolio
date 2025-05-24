<script lang="ts">
	import { onMount, tick } from 'svelte';
	import gsap from 'gsap';
	import Pipes from './Pipes.svelte';

	const images = [
		'/office/office1.jpg',

		'/notes/notes1.jpg',
		'/notes/notes2.jpg',
		'/notes/notes3.jpg',
		'/notes/notes4.jpg'
	];

	let current = 0;
	let imgRefs: (HTMLElement | null)[] = [];

	function setImgRef(el: HTMLElement, i: number) {
		imgRefs[i] = el;
		return {
			destroy: () => {
				imgRefs[i] = null;
			}
		};
	}

	function showImage(index: number, direction: 1 | -1) {
		const prev = current;
		current = (index + images.length) % images.length;
		tick().then(() => {
			const prevImg = imgRefs[prev];
			const nextImg = imgRefs[current];
			if (prevImg && nextImg) {
				gsap.to(prevImg, { x: direction * -100, opacity: 0, duration: 0.5, ease: 'power2.in' });
				gsap.fromTo(
					nextImg,
					{ x: direction * 100, opacity: 0 },
					{ x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
				);
			}
		});
	}

	function next() {
		showImage(current + 1, 1);
	}
	function prev() {
		showImage(current - 1, -1);
	}

	onMount(() => {
		// Initial fade in
		if (imgRefs[current]) {
			gsap.fromTo(
				imgRefs[current],
				{ opacity: 0, x: 60 },
				{ opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }
			);
		}
	});
</script>

<div class=" mx-auto flex h-screen max-w-4xl items-center justify-center">
	<Pipes />
	<div class="relative flex aspect-[16/9] w-full overflow-hidden">
		{#each images as img, i}
			<img
				use:setImgRef={i}
				src={img}
				alt=""
				class="absolute top-0 left-0 h-full w-full object-cover shadow grayscale transition-all duration-500"
				style="z-index: {i === current ? 10 : 1}; opacity: {i === current
					? 1
					: 0}; pointer-events: none;"
			/>
		{/each}
		<button
			class="absolute top-1/2 left-4 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gray-700/60 text-white shadow hover:bg-gray-900/80 focus:outline-none"
			on:click={prev}
			aria-label="Previous image"
		>
			<svg
				width="24"
				height="24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				viewBox="0 0 24 24"
				><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg
			>
		</button>
		<button
			class="absolute top-1/2 right-4 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gray-700/60 text-white shadow hover:bg-gray-900/80 focus:outline-none"
			on:click={next}
			aria-label="Next image"
		>
			<svg
				width="24"
				height="24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				viewBox="0 0 24 24"
				><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg
			>
		</button>
		<div class="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2">
			{#each images as _, i}
				<button
					class="h-2 w-2 rounded-full transition-all duration-200"
					class:bg-[#f59e0b]={i === current}
					class:bg-gray-300={i !== current}
					on:click={() => showImage(i, i > current ? 1 : -1)}
					aria-label={`Go to image ${i + 1}`}
				></button>
			{/each}
		</div>
	</div>
</div>
