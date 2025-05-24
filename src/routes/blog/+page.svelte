<script lang="ts">
	import { enhance } from '$app/forms';
	import { Mail } from 'lucide-svelte';
	import { quintInOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	let { form } = $props();

	console.log('form', form);

	let success = $state(form?.success ?? false);
	let error = $state(form?.error ?? false);
</script>

<main
	class="font-walsheim absolute top-1/2 left-1/2 max-w-[600px] -translate-x-1/2 -translate-y-1/2 transform gap-4"
>
	<section>
		<h1
			class="font-walsheim mx-auto mb-14 max-w-fit px-5 text-center text-4xl font-bold md:text-6xl"
		>
			Rowdy's Blog
		</h1>
		<p class="side font-walsheim mb-8 max-w-[600px] text-center text-lg tracking-wide"></p>

		<p class="side font-walsheim max-w-[600px] text-center text-2xl tracking-wide">
			Black & White non-tech Blog!
		</p>
	</section>
	<section class="mt-8">
		<form method="POST" action="?/subscribe" use:enhance class="flex flex-col items-center">
			<h2 class="text-center">Schrijf je in voor nieuwe blogposts:</h2>
			<div class="relative my-2 flex w-full items-center">
				<div class="absolute left-2 flex items-center justify-center">
					<Mail color={'#6b7280'} />
				</div>
				<input
					type="email"
					name="email"
					id="email"
					autocomplete="off"
					required
					placeholder="jouw@email.nl"
					class="w-full border border-gray-200 bg-gray-200 p-2 pl-10 font-normal text-gray-500 outline-none"
				/>
			</div>
			<button type="submit" class="rounded px-4 py-2 font-bold text-white hover:text-purple-500"
				>Inschrijven</button
			>

			{#if form?.success}
				<p class="mt-2 text-center text-xs text-green-600">
					Je bent ingeschreven! Check your spam folder!
				</p>
			{:else if form?.error}
				<p class="mt-2 text-center text-xs text-red-600">
					Je bent al ingeschreven! Check your spam folder!
				</p>
			{/if}
		</form>
	</section>
</main>
