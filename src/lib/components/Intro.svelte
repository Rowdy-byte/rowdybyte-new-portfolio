<script lang="ts">
	import gsap from 'gsap';

	$effect(() => {
		// Create a timeline for sequence animation
		const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

		// Animate the container
		tl.from('.intro-container', {
			opacity: 0,
			y: 30,
			duration: 0.8
		});

		// Animate the heading
		tl.from(
			'h1',
			{
				opacity: 0,
				y: -20,
				duration: 0.6
			},
			'-=0.4'
		);

		// Animate the paragraph
		tl.from(
			'p',
			{
				opacity: 0,
				y: 20,
				duration: 0.7
			},
			'-=0.3'
		);

		// Animate the image
		tl.from(
			'.profile-image',
			{
				opacity: 0,
				x: 30,
				scale: 0.9,
				duration: 0.8
			},
			'-=0.5'
		);

		// Animate the button with bouncing effect
		tl.from(
			'.contact-button',
			{
				opacity: 0,
				y: -50,
				scale: 0.5,
				duration: 1,
				ease: 'elastic.out(1, 0.3)'
			},
			'-=0.2'
		);
	});
</script>

<section class="flex min-h-screen w-full items-center justify-center p-4">
	<div class="card-container perspective mx-auto w-full max-w-5xl">
		<div
			class="card-inner transform-style-3d relative min-h-[800px] w-full transition-transform duration-800"
		>
			<div
				class="intro-container card-front absolute h-full w-full overflow-hidden rounded-lg bg-gray-500/20 shadow-lg backdrop-blur-sm backface-hidden lg:flex lg:h-auto"
			>
				<div class="p-6 lg:flex lg:w-3/5 lg:flex-col lg:items-center lg:justify-center lg:p-8">
					<h1 class="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">Welcome!</h1>
					<p class="text-base leading-relaxed text-gray-100 sm:text-lg">
						My name is Rowdy. I'm a coding enthusiast from the Netherlands, passionate about
						building modern, performant apps with SvelteKit. I enjoy solving real-world problems
						with code, data visualization, always learning, always improving, and aiming to work
						remotely.
					</p>
					<button class="contact-button mt-8 rounded-full bg-gray-500 px-12 py-4 text-white">
						Contact Me
					</button>
				</div>
				<div class="flex items-end justify-center rounded-full lg:w-2/5 lg:pt-8">
					<img class="max-w-sm" src="/rowdy-bg-rm-six.png" alt="Rowdy's profile" />
				</div>
			</div>
		</div>
	</div>
</section>
