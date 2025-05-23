<script lang="ts">
	// No script needed for static SVG pipes
</script>

<!-- Pipes SVG background -->
<svg
	class="pointer-events-none absolute inset-0 -z-10 h-full w-full select-none"
	viewBox="0 0 1920 1080"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	preserveAspectRatio="none"
>
	<defs>
		<linearGradient
			id="pipe-gradient"
			x1="0"
			y1="0"
			x2="1920"
			y2="1080"
			gradientUnits="userSpaceOnUse"
		>
			<stop stop-color="#f59e0b" />
			<stop offset="0.5" stop-color="#38bdf8" />
			<stop offset="1" stop-color="#a21caf" />
		</linearGradient>
		<filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
			<feGaussianBlur stdDeviation="8" result="coloredBlur" />
			<feMerge>
				<feMergeNode in="coloredBlur" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>
	<!-- 10 pipes with 90-degree bends -->
	<polyline
		points="100,100 900,100 900,300 1800,300"
		stroke="url(#pipe-gradient)"
		stroke-width="16"
		fill="none"
		filter="url(#glow)"
		opacity="0.7"
	/>
	<polyline
		points="200,200 1200,200 1200,500 1700,500"
		stroke="url(#pipe-gradient)"
		stroke-width="14"
		fill="none"
		filter="url(#glow)"
		opacity="0.6"
	/>
	<polyline
		points="300,300 300,700 1000,700 1000,900 1800,900"
		stroke="url(#pipe-gradient)"
		stroke-width="12"
		fill="none"
		filter="url(#glow)"
		opacity="0.5"
	/>
	<polyline
		points="400,400 400,800 1500,800"
		stroke="url(#pipe-gradient)"
		stroke-width="10"
		fill="none"
		filter="url(#glow)"
		opacity="0.5"
	/>
	<polyline
		points="500,500 500,950 1700,950"
		stroke="url(#pipe-gradient)"
		stroke-width="10"
		fill="none"
		filter="url(#glow)"
		opacity="0.4"
	/>
	<polyline
		points="600,600 600,1000 1200,1000 1200,1050 1800,1050"
		stroke="url(#pipe-gradient)"
		stroke-width="8"
		fill="none"
		filter="url(#glow)"
		opacity="0.4"
	/>
	<polyline
		points="700,150 700,600 1600,600"
		stroke="url(#pipe-gradient)"
		stroke-width="12"
		fill="none"
		filter="url(#glow)"
		opacity="0.5"
	/>
	<polyline
		points="800,250 800,850 1400,850"
		stroke="url(#pipe-gradient)"
		stroke-width="10"
		fill="none"
		filter="url(#glow)"
		opacity="0.5"
	/>
	<polyline
		points="900,350 900,950 1300,950"
		stroke="url(#pipe-gradient)"
		stroke-width="8"
		fill="none"
		filter="url(#glow)"
		opacity="0.4"
	/>
	<polyline
		points="1000,450 1000,1050 1500,1050"
		stroke="url(#pipe-gradient)"
		stroke-width="8"
		fill="none"
		filter="url(#glow)"
		opacity="0.4"
	/>
</svg>
