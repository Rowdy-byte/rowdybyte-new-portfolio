<script lang="ts">
	import gsap from 'gsap';
	import Aurora from './Aurora.svelte';
	import { MoveRight } from 'lucide-svelte';

	let arrowRef: HTMLElement;

	function animateArrowIn() {
		gsap.to(arrowRef, { x: 12, opacity: 1, duration: 0.4, ease: 'power2.out' });
	}
	function animateArrowOut() {
		gsap.to(arrowRef, { x: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
	}

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

<section id="intro" class="intro flex h-screen w-full">
	<div class="card-inner relative w-full">
		<div
			class="intro-container card-front absolute h-full w-full overflow-hidden bg-gray-500/20 shadow-lg lg:flex lg:h-auto"
		>
			<Aurora />
			<div class="p-8 lg:flex lg:w-3/5 lg:flex-col lg:items-center lg:justify-center lg:p-8">
				<h1 class="heading mb-4 text-5xl font-black tracking-tight text-gray-800 sm:text-7xl">
					Welcome!
				</h1>
				<p class="max-w-2xl text-base leading-relaxed sm:text-lg">
					My name is Rowdy. I'm a coding enthusiast from the Netherlands, passionate about building
					modern, performant apps with SvelteKit. I enjoy solving real-world problems with code,
					data visualization, always learning, always improving, and aiming to work remotely.
				</p>
				<p class="mt-8 font-light italic">-Rowdy</p>
				<button
					class="contact-button mt-8 flex items-center gap-2 rounded-full bg-[#1d232a] px-12 py-4 text-white hover:scale-105 hover:cursor-pointer"
					onmouseenter={animateArrowIn}
					onmouseleave={animateArrowOut}
				>
					Contact Me
					<span
						bind:this={arrowRef}
						style="opacity:0; transform:translateX(0); display:inline-flex; align-items:center;"
					>
						<MoveRight size={22} />
					</span>
				</button>
			</div>
			<div class="flex items-end justify-center rounded-full lg:w-2/5 lg:pt-8">
				<img class="profile-image max-w-sm" src="/rowdy-bg-rm-six.png" alt="Rowdy's profile" />
			</div>
		</div>
	</div>
</section>

<style>
	.intro {
		font-family: 'GT Walsheim Pro Regular';
	}

	.heading {
		font-family: 'GT Walsheim Pro';
	}
</style>
