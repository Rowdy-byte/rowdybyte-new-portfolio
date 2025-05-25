<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<main
	class="font-walsheim flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 px-4 py-16"
>
	<div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
		<h1 class="mb-8 text-center text-3xl font-bold text-[#1b1e28]">Login/Register</h1>
		<form method="post" action="?/login" use:enhance class="flex flex-col gap-6">
			<input
				name="username"
				placeholder="Gebruikersnaam"
				class="rounded border border-gray-200 bg-gray-100 p-3 text-[#1b1e28] focus:outline-none"
			/>

			<input
				type="password"
				name="password"
				placeholder="Wachtwoord"
				class="rounded border border-gray-200 bg-gray-100 p-3 text-[#1b1e28] focus:outline-none"
			/>

			<div class="flex gap-4">
				<button
					class="flex-1 rounded bg-[#2c333c] px-4 py-3 font-bold text-white transition-all hover:bg-purple-500"
					>Login</button
				>
				<button
					formaction="?/register"
					class="flex-1 rounded border border-gray-300 bg-gray-100 px-4 py-3 font-bold text-[#1b1e28] transition-all hover:bg-purple-500 hover:text-white"
					>Register</button
				>
			</div>
		</form>
		{#if form?.message}
			<p class="mt-4 text-center text-sm font-semibold text-red-600">{form.message}</p>
		{/if}
	</div>
</main>
