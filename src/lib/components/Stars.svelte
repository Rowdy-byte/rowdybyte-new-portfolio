<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	let starsContainer: HTMLElement;
	let stars: HTMLElement[] = [];

	// Generate random star positions
	function generateStars() {
		const starCount = 50;
		const starsData = [];

		for (let i = 0; i < starCount; i++) {
			starsData.push({
				id: i,
				x: Math.random() * 100,
				y: Math.random() * 100,
				size: Math.random() * 3 + 1, // 1-4px
				delay: Math.random() * 3 // 0-3s delay
			});
		}

		return starsData;
	}

	const starsData = generateStars();

	onMount(() => {
		// Animate each star with random blinking
		stars.forEach((star, index) => {
			if (star) {
				const data = starsData[index];

				// Set initial opacity to 0
				gsap.set(star, { opacity: 0 });

				// Create blinking animation
				gsap.to(star, {
					opacity: 1,
					duration: 0.5,
					delay: data.delay,
					repeat: -1,
					yoyo: true,
					ease: 'power2.inOut',
					repeatDelay: Math.random() * 2 + 1 // 1-3s between blinks
				});
			}
		});
	});

	function setStarRef(element: HTMLElement, index: number) {
		stars[index] = element;
		return {};
	}
</script>

<div class="stars-container pointer-events-none fixed inset-0 z-0" bind:this={starsContainer}>
	{#each starsData as star, index}
		<div
			use:setStarRef={index}
			class="star absolute"
			style="
                left: {star.x}%; 
                top: {star.y}%; 
                width: {star.size}px; 
                height: {star.size}px;
            "
		></div>
	{/each}
</div>

<style>
	.stars-container {
		overflow: hidden;
	}

	.star {
		background: #888;
		border-radius: 50%;
		opacity: 0;
		filter: blur(0.5px);
		box-shadow: 0 0 2px rgba(136, 136, 136, 0.5);
	}

	/* Add subtle glow effect */
	.star::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 150%;
		height: 150%;
		background: radial-gradient(circle, rgba(136, 136, 136, 0.3) 0%, transparent 70%);
		border-radius: 50%;
		z-index: -1;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.star {
			filter: blur(0.3px);
		}
	}
</style>
