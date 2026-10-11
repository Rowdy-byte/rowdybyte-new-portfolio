<script lang="ts">
	import { enhance } from '$app/forms';
	import { LockKeyhole } from 'lucide-svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<main class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#171B21] px-4 py-12 font-walsheim text-[#F3F5F7]">
	<div aria-hidden="true" class="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#9B7BFF]/10 blur-3xl"></div>
	<div class="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#20262F] p-7 shadow-2xl sm:p-9">
		<a href="/" class="mb-8 inline-flex items-center gap-3">
			<span class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#9B7BFF] to-[#42D9E8] text-sm font-black text-[#171B21]">RB</span>
			<span><span class="block text-sm font-bold tracking-wide">ROWDY BYTE</span><span class="block font-proto text-[10px] uppercase tracking-[0.18em] text-slate-500">Content studio</span></span>
		</a>
		<div class="mb-7">
			<span class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#9B7BFF]/10 text-[#B29BFF]"><LockKeyhole size={20} /></span>
			<h1 class="text-2xl font-bold">Welkom terug</h1>
			<p class="mt-2 text-sm text-slate-400">Log in om je websitecontent te beheren.</p>
		</div>

		<form method="post" action="?/login" use:enhance class="space-y-4">
			<label class="block space-y-2 text-sm font-medium">
				<span>Gebruikersnaam</span>
				<input name="username" autocomplete="username" required placeholder="Gebruikersnaam" class="w-full rounded-xl border border-white/10 bg-[#171B21] px-4 py-3 text-white placeholder:text-slate-600 focus:border-[#9B7BFF] focus:outline-none focus:ring-2 focus:ring-[#9B7BFF]/20" />
			</label>
			<label class="block space-y-2 text-sm font-medium">
				<span>Wachtwoord</span>
				<input type="password" name="password" autocomplete="current-password" required placeholder="Wachtwoord" class="w-full rounded-xl border border-white/10 bg-[#171B21] px-4 py-3 text-white placeholder:text-slate-600 focus:border-[#9B7BFF] focus:outline-none focus:ring-2 focus:ring-[#9B7BFF]/20" />
			</label>
			{#if form?.message}<p role="alert" class="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">{form.message}</p>{/if}
			<button class="w-full rounded-xl bg-[#9B7BFF] px-4 py-3 font-bold text-[#171B21] transition hover:bg-[#B29BFF]">Inloggen</button>
		</form>
	</div>
</main>
