<script lang="ts">
	let {
		animate = true,
		colors = ['#BF00FF', '#8A2BE2', '#4169E1', '#00BFFF', '#FFFFFF'],
		className = ''
	} = $props();
</script>

<!-- Lightning Pipes SVG background -->
<svg
	class="pointer-events-none absolute inset-0 -z-10 h-full w-full select-none {className}"
	viewBox="0 0 1920 1080"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	preserveAspectRatio="none"
>
	<defs>
		<!-- Lightning gradient -->
		<linearGradient
			id="lightning-gradient"
			x1="0"
			y1="0"
			x2="1920"
			y2="1080"
			gradientUnits="userSpaceOnUse"
		>
			<stop stop-color={colors[0]} />
			<stop offset="0.25" stop-color={colors[1]} />
			<stop offset="0.5" stop-color={colors[2]} />
			<stop offset="0.75" stop-color={colors[3]} />
			<stop offset="1" stop-color={colors[4]} />
		</linearGradient>

		<!-- Lightning glow filter -->
		<filter id="lightning-glow" x="-50%" y="-50%" width="200%" height="200%">
			<feGaussianBlur stdDeviation="12" result="coloredBlur" />
			<feMerge>
				<feMergeNode in="coloredBlur" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>

		<!-- Electric blur filter -->
		<filter id="electric-blur" x="-50%" y="-50%" width="200%" height="200%">
			<feGaussianBlur stdDeviation="4" result="blur" />
			<feMerge>
				<feMergeNode in="blur" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>

	<!-- Lightning-like zigzag patterns -->
	<!-- Main central lightning bolt -->
	<polyline
		points="100,100 180,150 120,200 200,250 140,300 220,350 160,400 240,450 180,500 260,550 200,600 280,650 220,700 300,750 240,800 320,850 1800,850"
		stroke="url(#lightning-gradient)"
		stroke-width="12"
		fill="none"
		filter="url(#lightning-glow)"
		opacity="0.9"
		class={animate ? 'lightning-flicker-1' : ''}
	/>

	<!-- Secondary lightning branches -->
	<polyline
		points="200,50 250,80 220,120 280,150 240,190 300,220 260,260 340,290 1600,290"
		stroke="url(#lightning-gradient)"
		stroke-width="8"
		fill="none"
		filter="url(#electric-blur)"
		opacity="0.7"
		class={animate ? 'lightning-flicker-2' : ''}
	/>

	<polyline
		points="150,900 200,920 170,960 230,980 190,1020 250,1040 1500,1040"
		stroke="url(#lightning-gradient)"
		stroke-width="6"
		fill="none"
		filter="url(#electric-blur)"
		opacity="0.6"
		class={animate ? 'lightning-flicker-3' : ''}
	/>

	<!-- Vertical lightning strikes -->
	<polyline
		points="300,0 320,60 280,120 340,180 300,240 360,300 320,360 380,420 340,480 400,540 360,600"
		stroke="url(#lightning-gradient)"
		stroke-width="4"
		fill="none"
		filter="url(#electric-blur)"
		opacity="0.5"
		class={animate ? 'lightning-flicker-4' : ''}
	/>

	<polyline
		points="800,200 820,260 780,320 840,380 800,440 860,500 820,560 880,620 840,680 900,740"
		stroke="url(#lightning-gradient)"
		stroke-width="3"
		fill="none"
		filter="url(#electric-blur)"
		opacity="0.4"
		class={animate ? 'lightning-flicker-5' : ''}
	/>

	<!-- Diagonal lightning streaks -->
	<polyline
		points="1200,100 1180,150 1220,200 1160,250 1200,300 1140,350 1180,400 1120,450 1800,950"
		stroke="url(#lightning-gradient)"
		stroke-width="5"
		fill="none"
		filter="url(#electric-blur)"
		opacity="0.6"
		class={animate ? 'lightning-flicker-6' : ''}
	/>

	<!-- Small electric arcs -->
	<polyline
		points="600,300 620,320 580,340 640,360 600,380 660,400"
		stroke="url(#lightning-gradient)"
		stroke-width="2"
		fill="none"
		filter="url(#electric-blur)"
		opacity="0.3"
		class={animate ? 'lightning-flicker-7' : ''}
	/>

	<polyline
		points="1000,600 1020,620 980,640 1040,660 1000,680 1060,700"
		stroke="url(#lightning-gradient)"
		stroke-width="2"
		fill="none"
		filter="url(#electric-blur)"
		opacity="0.3"
		class={animate ? 'lightning-flicker-8' : ''}
	/>

	<!-- Additional branching lightning -->
	<polyline
		points="500,400 520,440 480,480 540,520 500,560 560,600 520,640 580,680 1400,680"
		stroke="url(#lightning-gradient)"
		stroke-width="4"
		fill="none"
		filter="url(#electric-blur)"
		opacity="0.5"
		class={animate ? 'lightning-flicker-9' : ''}
	/>

	<polyline
		points="1400,200 1420,240 1380,280 1440,320 1400,360 1460,400 1420,440 1480,480 1440,520 1500,560"
		stroke="url(#lightning-gradient)"
		stroke-width="3"
		fill="none"
		filter="url(#electric-blur)"
		opacity="0.4"
		class={animate ? 'lightning-flicker-10' : ''}
	/>
</svg>

<style>
	/* Lightning flicker animations with different timings */
	.lightning-flicker-1 {
		animation: lightning-flash-1 2s ease-in-out infinite;
	}

	.lightning-flicker-2 {
		animation: lightning-flash-2 1.8s ease-in-out infinite 0.2s;
	}

	.lightning-flicker-3 {
		animation: lightning-flash-3 2.2s ease-in-out infinite 0.4s;
	}

	.lightning-flicker-4 {
		animation: lightning-flash-4 1.5s ease-in-out infinite 0.6s;
	}

	.lightning-flicker-5 {
		animation: lightning-flash-5 1.9s ease-in-out infinite 0.8s;
	}

	.lightning-flicker-6 {
		animation: lightning-flash-6 2.1s ease-in-out infinite 1s;
	}

	.lightning-flicker-7 {
		animation: lightning-flash-7 1.7s ease-in-out infinite 1.2s;
	}

	.lightning-flicker-8 {
		animation: lightning-flash-8 1.6s ease-in-out infinite 1.4s;
	}

	.lightning-flicker-9 {
		animation: lightning-flash-9 2.3s ease-in-out infinite 1.6s;
	}

	.lightning-flicker-10 {
		animation: lightning-flash-10 1.4s ease-in-out infinite 1.8s;
	}

	/* Different flash patterns for variety */
	@keyframes lightning-flash-1 {
		0%,
		90%,
		100% {
			opacity: 0.9;
		}
		95% {
			opacity: 0.3;
		}
	}

	@keyframes lightning-flash-2 {
		0%,
		85%,
		100% {
			opacity: 0.7;
		}
		90% {
			opacity: 1;
		}
	}

	@keyframes lightning-flash-3 {
		0%,
		80%,
		100% {
			opacity: 0.6;
		}
		85% {
			opacity: 0.2;
		}
	}

	@keyframes lightning-flash-4 {
		0%,
		75%,
		100% {
			opacity: 0.5;
		}
		80% {
			opacity: 0.9;
		}
	}

	@keyframes lightning-flash-5 {
		0%,
		70%,
		100% {
			opacity: 0.4;
		}
		75% {
			opacity: 0.8;
		}
	}

	@keyframes lightning-flash-6 {
		0%,
		88%,
		100% {
			opacity: 0.6;
		}
		92% {
			opacity: 0.3;
		}
	}

	@keyframes lightning-flash-7 {
		0%,
		82%,
		100% {
			opacity: 0.3;
		}
		87% {
			opacity: 0.7;
		}
	}

	@keyframes lightning-flash-8 {
		0%,
		78%,
		100% {
			opacity: 0.3;
		}
		83% {
			opacity: 0.6;
		}
	}

	@keyframes lightning-flash-9 {
		0%,
		86%,
		100% {
			opacity: 0.5;
		}
		91% {
			opacity: 0.2;
		}
	}

	@keyframes lightning-flash-10 {
		0%,
		84%,
		100% {
			opacity: 0.4;
		}
		89% {
			opacity: 0.8;
		}
	}
</style>
