<script lang="ts">
	import gsap from 'gsap';
	import Aurora from './Aurora.svelte';
	import { MoveRight } from 'lucide-svelte';
	import Stat from './Stat.svelte';
	import Stars from './Stars.svelte';

	let { blogPostsCount, docsCount } = $props();

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

<section id="intro" class="intro z-50 flex h-screen w-full">
	<div class="card-inner w-full">
		<div class="intro-container w-full overflow-hidden bg-[#2c333c] shadow-lg lg:flex lg:h-auto">
			<Aurora />
			<div
				class="flex flex-col gap-4 p-8 lg:flex lg:w-3/5 lg:flex-col lg:justify-center lg:p-8 lg:pl-20 xl:pl-24"
			>
				<h1
					class="heading mt-8 mb-4 text-5xl font-black tracking-wide sm:text-7xl lg:items-center lg:justify-center"
				>
					Welcome!
				</h1>
				<div class=" max-w-2xl text-base sm:text-lg">
					My name is Rowdy. I'm a coding enthusiast from the Netherlands, passionate about building
					modern, performant apps with SvelteKit. I enjoy solving real-world problems with code,
					data visualization, always learning, always improving, and aiming to work remotely.
				</div>
				<!-- <p class="mt-8 font-light italic">-Rowdy</p> -->
				<div class=" flex flex-col md:flex-row md:gap-8">
					<a
						href="#contact"
						class="contact contact-button mt-8 flex max-w-60 items-center gap-2 rounded-full bg-[#1d232a] px-14 py-3 text-white hover:scale-105 hover:cursor-pointer"
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
					</a>
					<div class="flex gap-8">
						<Stat header="Blogposts" paragraph={blogPostsCount} />
						<Stat header="Documents" paragraph={docsCount} />
					</div>
					<div>
						<Stars />
					</div>
				</div>
			</div>
			<div class="flex items-end justify-center lg:w-2/5 lg:pt-8">
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

	.contact {
		font-family: 'Workbench';
	}
</style>
