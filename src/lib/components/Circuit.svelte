<script lang="ts">
	import gsap from 'gsap';

	let paths;
	let svgElement;

	$effect(() => {
		svgElement = document.getElementById('circuit');
		paths = svgElement?.querySelectorAll('path');
		paths?.forEach((path, i) => {
			const length = path.getTotalLength();

			gsap.set(path, {
				strokeDasharray: length,
				strokeDashoffset: length,
				// delay: 0.5,
				strokeWidth: 2,
				stroke: '#10b981',
				ease: 'power1.inOut'
			});

			gsap.to(path, {
				strokeDashoffset: 0,
				stroke: '#a855f7',
				duration: 10,
				delay: i * 0.01,
				strokeWidth: 2,
				ease: 'power1.inOut',
				repeat: -1
			});
		});
	});
</script>

<main class="relative h-screen">
	<figure class="absolute -top-[60px] right-[px] -z-50 hidden md:block xl:block">
		<svg
			version="1.1"
			id="circuit"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			x="500px"
			y="500px"
			width="500%"
			viewBox="0 0 4500 4500"
			enable-background="new 0 0 4500 4500"
			xml:space="preserve"
		>
			<defs>
				<filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
					<feDropShadow dx="20" dy="20" stdDeviation="10" flood-color="#a855f7" />
				</filter>
			</defs>
			<!-- All the path elements remain the same -->
			<!-- I removed the 'use:animate' directive from the path element that had it -->
			<path
				fill="none"
				opacity="1.000000"
				stroke="#000000"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="5.000000"
				d="
M2008.000000,2886.000000 
    C2028.781006,2903.132080 2042.765503,2927.622070 2067.853760,2940.289307 
    C2074.718750,2943.755615 2076.114746,2952.171631 2076.029053,2960.000244 
    C2075.912109,2970.665771 2076.005615,2981.333252 2075.998047,2992.000000 
    C2075.991943,3000.656494 2072.474854,3005.075684 2064.486328,3010.691895 
    C2042.951416,3025.831543 2025.006592,3045.640625 2005.848145,3063.840088 
    C1994.914917,3074.225830 1986.743164,3087.864502 1972.000000,3094.000000 
"
			/>
			<!-- Rest of the paths remain the same -->
		</svg>
	</figure>
</main>
