<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';

	let name = '';
	let email = '';
	let message = '';
	let submitted = false;

	function handleSubmit(e: Event) {
		e.preventDefault();
		submitted = true;
		// Here you would handle sending the form data
	}

	let sectionRef: HTMLElement;
	let formRef: HTMLFormElement;

	onMount(() => {
		// GSAP scroll animation
		const tl = gsap.timeline({ paused: true });
		tl.from(sectionRef, { opacity: 0, y: 60, duration: 0.7, ease: 'power2.out' });
		tl.from(
			sectionRef.querySelector('h2'),
			{ opacity: 0, y: -30, duration: 0.5, ease: 'power2.out' },
			'-=0.4'
		);
		tl.from(
			sectionRef.querySelectorAll('form > div, form > button'),
			{ opacity: 0, y: 30, stagger: 0.08, duration: 0.5, ease: 'power2.out' },
			'-=0.3'
		);

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					tl.play();
					observer.disconnect();
				}
			},
			{ threshold: 0.2 }
		);
		if (sectionRef) observer.observe(sectionRef);
		return () => observer.disconnect();
	});
</script>

<div class="mx-2 flex min-h-screen flex-col items-center justify-center py-8">
	<section
		id="contact"
		bind:this={sectionRef}
		class="flex w-full max-w-4xl flex-col items-center justify-center"
	>
		<h2 class="mb-14 text-center text-4xl font-bold sm:text-7xl">Contact</h2>
		<p class="mb-14 max-w-2xl text-lg">
			<span class=" font-bold text-[#f59e0b]">Let's get in touch!</span> Have a question, an idea, or
			want to collaborate on a project? Send me a message using the form. I'll get back to you as soon
			as possible!
		</p>
		<form
			bind:this={formRef}
			class="flex w-full max-w-4xl flex-col gap-6 rounded-2xl bg-gray-500/20 p-8 shadow-lg"
			on:submit|preventDefault={handleSubmit}
			autocomplete="off"
		>
			<div class="flex flex-col gap-2">
				<label for="name" class="text-base font-semibold">Name</label>
				<input
					type="text"
					id="name"
					bind:value={name}
					class="rounded-lg border-none bg-[#1d232a] px-4 py-3 text-white placeholder-gray-400 transition-all outline-none focus:outline-none"
					placeholder="Your name"
					required
				/>
			</div>
			<div class="flex flex-col gap-2">
				<label for="email" class="text-base font-semibold">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					class="rounded-lg border-none bg-[#1d232a] px-4 py-3 text-white placeholder-gray-400 transition-all outline-none"
					placeholder="you@email.com"
					required
				/>
			</div>
			<div class="flex flex-col gap-2">
				<label for="message" class="text-base font-semibold">Message</label>
				<textarea
					id="message"
					bind:value={message}
					class="min-h-[120px] rounded-lg border-none bg-[#1d232a] px-4 py-3 text-white placeholder-gray-400 transition-all outline-none"
					placeholder="How can I help you?"
					required
				></textarea>
			</div>
			<button
				type="submit"
				class="mt-4 w-full rounded-full bg-[#1d232a] px-8 py-3 text-lg font-semibold text-white shadow transition-all hover:scale-105"
			>
				{submitted ? 'Thank you!' : 'Send Message'}
			</button>
		</form>
	</section>
</div>
