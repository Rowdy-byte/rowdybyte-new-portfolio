<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	let {
		width = 'w-16',
		height = 'h-full',
		animate = true,
		flickerDuration = 3,
		colors = ['#a855f7', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b'],
		className = ''
	} = $props();

	let lightningRef: HTMLElement;

	onMount(() => {
		if (animate && lightningRef) {
			// Initial scale animation
			gsap.fromTo(
				lightningRef,
				{
					opacity: 0,
					scaleY: 0,
					transformOrigin: 'top'
				},
				{
					opacity: 0.6,
					scaleY: 1,
					duration: 0.6,
					ease: 'power2.out'
				}
			);
		}
	});

	// Generate gradient stops from colors array
	function generateGradientStops(colors: string[]) {
		return colors
			.map((color, index) => {
				const offset = (index / (colors.length - 1)) * 100;
				return `<stop offset="${offset}%" style="stop-color:${color};stop-opacity:1" />`;
			})
			.join('');
	}
</script>

<div
	bind:this={lightningRef}
	class="lightning-container pointer-events-none absolute inset-0 z-20 flex items-center justify-center {className}"
>
	<!-- Main Lightning SVG -->
	<svg
		viewBox="0 0 100 800"
		class="{height} {width} fill-gradient"
		preserveAspectRatio="xMidYMid meet"
	>
		<defs>
			<linearGradient id="lightningGradient" x1="0%" y1="0%" x2="0%" y2="100%">
				{@html generateGradientStops(colors)}
			</linearGradient>
			<filter id="lightningGlow">
				<feGaussianBlur stdDeviation="3" result="coloredBlur" />
				<feMerge>
					<feMergeNode in="coloredBlur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>
		<path
			d="M45 0 L35 200 L55 200 L25 400 L45 400 L15 600 L35 600 L5 800 L25 650 L15 650 L35 450 L25 450 L45 250 L35 250 L55 50 L45 0 Z"
			fill="url(#lightningGradient)"
			filter="url(#lightningGlow)"
			class="lightning-bolt"
		/>
	</svg>
</div>

<style>
	.lightning-bolt {
		animation: lightning-flicker var(--flicker-duration, 3s) ease-in-out infinite;
	}

	@keyframes lightning-flicker {
		0%,
		100% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
	}

	/* Dynamic animation duration */
	.lightning-container {
		--flicker-duration: v-bind(flickerDuration + 's');
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.lightning-container svg {
			width: 2rem;
		}
	}
</style>
