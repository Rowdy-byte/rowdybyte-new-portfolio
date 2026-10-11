<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { ArrowUpRight, BookOpenText, Mail, MailCheck, Search, Upload } from 'lucide-svelte';

	let { data } = $props();
	let query = $state('');
	let busy = $state(false);
	let mailingId = $state<number | null>(null);
	let statusMessage = $state('');
	let errorMessage = $state('');
	const filteredPosts = $derived(
		data.posts.filter((post) => post.title.toLowerCase().includes(query.trim().toLowerCase()))
	);
	const mailedCount = $derived(data.posts.filter((post) => post.mailed).length);

	async function importPosts() {
		busy = true;
		statusMessage = '';
		errorMessage = '';
		try {
			const response = await fetch('/auth/lucia/import-posts', { method: 'POST' });
			if (!response.ok) throw new Error('Importeren is niet gelukt. Probeer het opnieuw.');
			const result = await response.json();
			statusMessage = `${result.inserted} blogposts geïmporteerd.`;
			await invalidateAll();
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'Er ging iets mis bij het importeren.';
		} finally {
			busy = false;
		}
	}

	async function mail(postId: number) {
		mailingId = postId;
		statusMessage = '';
		errorMessage = '';
		try {
			const response = await fetch(`/auth/lucia/mail-post/${postId}`, { method: 'POST' });
			if (!response.ok) throw new Error('De nieuwsbrief kon niet worden verstuurd.');
			statusMessage = 'De nieuwsbrief is verstuurd naar je abonnees.';
			await invalidateAll();
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'Er ging iets mis bij het versturen.';
		} finally {
			mailingId = null;
		}
	}
</script>

<div class="space-y-7">
	<section class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
		<div>
			<p class="mb-2 font-proto text-xs uppercase tracking-[0.2em] text-[#42D9E8]">Publiceren</p>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Blogposts</h2>
			<p class="mt-2 text-sm text-slate-400">Bekijk je publicaties en deel ze met je nieuwsbrieflezers.</p>
		</div>
		<button onclick={importPosts} disabled={busy} class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#20262F] px-4 py-3 text-sm font-semibold transition hover:border-[#9B7BFF]/50 hover:bg-white/5 disabled:cursor-wait disabled:opacity-60">
			<Upload size={17} /> {busy ? 'Importeren…' : 'Importeer Markdown'}
		</button>
	</section>

	{#if statusMessage}<p role="status" class="rounded-xl border border-[#42D9E8]/20 bg-[#42D9E8]/10 px-4 py-3 text-sm text-[#8DEAF2]">{statusMessage}</p>{/if}
	{#if errorMessage}<p role="alert" class="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">{errorMessage}</p>{/if}

	<section class="grid gap-4 sm:grid-cols-2">
		<div class="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#20262F] p-5"><span class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#9B7BFF]/10 text-[#B29BFF]"><BookOpenText size={21} /></span><div><p class="text-xs text-slate-400">Totaal aantal</p><p class="text-2xl font-bold">{data.posts.length}</p></div></div>
		<div class="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#20262F] p-5"><span class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#42D9E8]/10 text-[#42D9E8]"><MailCheck size={21} /></span><div><p class="text-xs text-slate-400">Nieuwsbrief verstuurd</p><p class="text-2xl font-bold">{mailedCount}<span class="ml-1 text-base font-medium text-slate-500">/ {data.posts.length}</span></p></div></div>
	</section>

	<section class="overflow-hidden rounded-2xl border border-white/10 bg-[#20262F]">
		<div class="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
			<div><h3 class="font-bold">Alle blogposts</h3><p class="mt-1 text-xs text-slate-500">{filteredPosts.length} {filteredPosts.length === 1 ? 'resultaat' : 'resultaten'}</p></div>
			<label class="flex items-center gap-2 rounded-xl border border-white/10 bg-[#171B21] px-3 py-2 text-slate-400 focus-within:border-[#9B7BFF]/60">
				<Search size={16} />
				<input bind:value={query} type="search" placeholder="Zoek op titel…" aria-label="Zoek blogposts op titel" class="w-full border-0 bg-transparent p-0 text-sm text-white placeholder:text-slate-500 focus:ring-0 sm:w-52" />
			</label>
		</div>

		{#if filteredPosts.length}
			<ul class="divide-y divide-white/5">
				{#each filteredPosts as post}
					<li class="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
						<div class="min-w-0">
							<p class="truncate font-semibold">{post.title}</p>
							<p class="mt-1 text-xs text-slate-500">/{post.slug} <span class="px-1">·</span> {new Date(post.createdAt).toLocaleDateString('nl-NL', { dateStyle: 'medium' })}</p>
						</div>
						<div class="flex flex-wrap items-center gap-3">
							{#if post.mailed}
								<span class="inline-flex items-center gap-1.5 rounded-full bg-[#42D9E8]/10 px-2.5 py-1 text-xs font-semibold text-[#42D9E8]"><MailCheck size={14} /> Verstuurd</span>
							{:else}
								<span class="rounded-full bg-[#F6B956]/10 px-2.5 py-1 text-xs font-semibold text-[#F6B956]">Niet verstuurd</span>
								<button onclick={() => mail(post.id)} disabled={mailingId !== null} class="inline-flex items-center gap-2 rounded-lg bg-[#9B7BFF] px-3 py-2 text-xs font-bold text-[#171B21] transition hover:bg-[#B29BFF] disabled:cursor-wait disabled:opacity-60"><Mail size={14} /> {mailingId === post.id ? 'Bezig…' : 'Mail abonnees'}</button>
							{/if}
							<a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" aria-label={`Bekijk ${post.title}`} class="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"><ArrowUpRight size={16} /></a>
						</div>
					</li>
				{/each}
			</ul>
		{:else}
			<div class="px-6 py-14 text-center"><p class="font-semibold">{query ? 'Geen blogposts gevonden' : 'Nog geen blogposts'}</p><p class="mt-1 text-sm text-slate-400">{query ? 'Probeer een andere zoekterm.' : 'Importeer je Markdown-bestanden om je blog te vullen.'}</p></div>
		{/if}
	</section>
</div>
