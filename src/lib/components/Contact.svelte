<script lang="ts">
	import { tick } from 'svelte';
	import { enhance } from '$app/forms';
	import gsap from 'gsap';
	import Pipes from './Pipes.svelte';

	let name = $state<string>('');
	let email = $state<string>('');
	let message = $state<string>('');
	let submitted = $state<boolean>(false);
	let errors: Record<string, string[]> = $state<Record<string, string[]>>({});

	let sectionRef: HTMLElement;
	let formRef: HTMLFormElement;
	let messageRef = $state<HTMLElement | null>(null);

	// Function for enhance
	const enhanceForm = () => {
		return async ({
			result
		}: {
			formData: FormData;
			formElement: HTMLFormElement;
			action: URL;
			result: { type: string; data?: any };
		}) => {
			if (result.type === 'failure') {
				submitted = false;
				errors = result.data?.errors ?? {};
			} else if (result.type === 'success') {
				submitted = true;
				errors = {};
				formRef.reset();
				await tick();
				if (messageRef) {
					gsap.fromTo(
						messageRef,
						{ opacity: 0, y: 20 },
						{ opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
					);
					setTimeout(() => {
						gsap.to(messageRef, {
							opacity: 0,
							y: -20,
							duration: 0.5,
							ease: 'power2.in',
							onComplete: () => {
								submitted = false;
							}
						});
					}, 5000);
				}
			}
		};
	};

	$effect(() => {
		const tl = gsap.timeline({ paused: true });
		tl.from(sectionRef, { opacity: 0, y: 60, duration: 0.7, ease: 'power2.out' });
		tl.from(
			sectionRef.querySelector('h2'),
			{ opacity: 0, y: -30, duration: 0.5, ease: 'power2.out' },
			'-=0.4'
		);
		tl.from(
			sectionRef.querySelectorAll('form > div'),
			{ opacity: 0, y: 30, stagger: 0.08, duration: 0.5, ease: 'power2.out' },
			'-=0.3'
		);
		tl.from(
			sectionRef.querySelector('form > button'),
			{ opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
			'-=0.35'
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
	<Pipes />
	<section
		id="contact"
		bind:this={sectionRef}
		class="flex w-full max-w-4xl flex-col items-center justify-center"
	>
		<h2 class="mb-18 text-center text-7xl font-bold md:text-8xl">Contact</h2>
		<p class="mb-18 max-w-2xl text-lg">
			<span class=" font-bold text-[#f59e0b]">Let's get in touch!</span> Have a question, an idea, or
			want to collaborate on a project? Send me a message using the form. I'll get back to you as soon
			as possible!
		</p>

		<form
			bind:this={formRef}
			use:enhance={enhanceForm}
			class="flex w-full max-w-4xl flex-col gap-6 rounded-2xl bg-[#2c333c] p-4 shadow-lg md:p-8"
			method="POST"
			autocomplete="off"
		>
			<div class="flex flex-col gap-2">
				<label for="name" class="text-base font-semibold">Name</label>
				<input
					name="name"
					type="text"
					bind:value={name}
					class="rounded-lg border-none bg-[#1d232a] px-4 py-3 text-white placeholder-gray-400 transition-all outline-none focus:outline-none"
					placeholder="Your name"
				/>
				{#if errors.name}
					<p class="text-sm text-red-500">{errors.name[0]}</p>
				{/if}
			</div>

			<div class="flex flex-col gap-2">
				<label for="email" class="text-base font-semibold">Email</label>
				<input
					name="email"
					type="email"
					bind:value={email}
					class="rounded-lg border-none bg-[#1d232a] px-4 py-3 text-white placeholder-gray-400 transition-all outline-none"
					placeholder="you@email.com"
				/>
				{#if errors.email}
					<p class="text-sm text-red-500">{errors.email[0]}</p>
				{/if}
			</div>

			<div class="flex flex-col gap-2">
				<label for="message" class="text-base font-semibold">Message</label>
				<textarea
					name="message"
					bind:value={message}
					class="min-h-[120px] rounded-lg border-none bg-[#1d232a] px-4 py-3 text-white placeholder-gray-400 transition-all outline-none"
					placeholder="How can I help you?"
				></textarea>
				{#if errors.message}
					<p class="text-sm text-red-500">{errors.message[0]}</p>
				{/if}
			</div>
			<div class="flex gap-2">
				<button
					type="submit"
					class="mt-4 w-1/2 rounded-full bg-[#1d232a] px-8 py-3 text-lg font-semibold text-white shadow transition-all hover:cursor-pointer hover:shadow-lg active:scale-95"
					disabled={submitted}
				>
					Send
				</button>
				{#if submitted}
					<p bind:this={messageRef} class=" text-center text-lg font-semibold text-green-400">
						Thank you! Your message has been sent successfully.
					</p>
				{/if}
			</div>
		</form>
	</section>
</div>
