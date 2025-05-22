<script lang="ts">
	let name = '';
	let email = '';
	let message = '';
	let submitted = false;

	function handleSubmit(e: Event) {
		e.preventDefault();
		submitted = true;
		// Here you would handle sending the form data
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center py-8">
	<section id="contact" class="flex w-full max-w-5xl flex-col items-center justify-center">
		<h2 class="mb-14 text-center text-4xl font-bold sm:text-7xl">Contact</h2>
		<form
			class="flex w-full max-w-5xl flex-col gap-6 rounded-2xl bg-gray-500/20 p-8 shadow-lg"
			on:submit|preventDefault={handleSubmit}
			autocomplete="off"
		>
			<div class="flex flex-col gap-2">
				<label for="name" class="text-base font-semibold">Name</label>
				<input
					type="text"
					id="name"
					bind:value={name}
					class="rounded-lg bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all"
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
					class="rounded-lg bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all"
					placeholder="you@email.com"
					required
				/>
			</div>
			<div class="flex flex-col gap-2">
				<label for="message" class="text-base font-semibold">Message</label>
				<textarea
					id="message"
					bind:value={message}
					class="min-h-[120px] rounded-lg bg-gray-700/30 px-4 py-3 text-white placeholder-gray-400 transition-all"
					placeholder="How can I help you?"
					required
				></textarea>
			</div>
			<button
				type="submit"
				class="mt-4 w-full rounded-full bg-[#a6accd22] px-8 py-3 text-lg font-semibold text-white shadow transition-all hover:scale-105"
			>
				{submitted ? 'Thank you!' : 'Send Message'}
			</button>
		</form>
	</section>
</div>
