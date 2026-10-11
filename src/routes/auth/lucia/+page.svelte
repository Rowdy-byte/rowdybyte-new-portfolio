<script lang="ts">
	import { ArrowUpRight, BookOpenText, Mail, Plus } from 'lucide-svelte';

	let { data } = $props();
	const postCount = $derived(data.allPosts.length);
	const mailedCount = $derived(data.allPosts.filter((post) => post.mailed).length);
	const recentPosts = $derived([...data.allPosts].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 5));
	const dateLabel = new Intl.DateTimeFormat('nl-NL', { dateStyle: 'long' }).format(new Date());
</script>

<div class="space-y-8">
	<section class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
		<div>
			<p class="mb-2 font-proto text-xs uppercase tracking-[0.2em] text-[#42D9E8]">Overzicht · {dateLabel}</p>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Goedemorgen, {data.user.username}.</h2>
			<p class="mt-2 max-w-xl text-sm text-slate-400">Beheer je publicaties en houd je nieuwsbrief op koers.</p>
		</div>
		<a href="/auth/lucia/posts" class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#9B7BFF] px-4 py-3 text-sm font-bold text-[#171B21] transition hover:bg-[#B29BFF]">
			<Plus size={17} /> Naar blogbeheer
		</a>
	</section>

	<section aria-label="Statistieken" class="grid gap-4 sm:grid-cols-3">
		<div class="rounded-2xl border border-white/10 bg-[#20262F] p-5">
			<div class="flex items-center justify-between text-slate-400"><span class="text-sm">Blogposts</span><BookOpenText size={18} class="text-[#9B7BFF]" /></div>
			<p class="mt-4 text-3xl font-bold">{postCount}</p>
			<p class="mt-1 text-xs text-slate-500">Totaal in je bibliotheek</p>
		</div>
		<div class="rounded-2xl border border-white/10 bg-[#20262F] p-5">
			<div class="flex items-center justify-between text-slate-400"><span class="text-sm">Abonnees</span><Mail size={18} class="text-[#42D9E8]" /></div>
			<p class="mt-4 text-3xl font-bold">{data.subscriberCount}</p>
			<p class="mt-1 text-xs text-slate-500">Ingeschreven op de nieuwsbrief</p>
		</div>
		<div class="rounded-2xl border border-white/10 bg-[#20262F] p-5">
			<div class="flex items-center justify-between text-slate-400"><span class="text-sm">Mail verzonden</span><span class="text-xs text-[#F6B956]">{postCount ? Math.round((mailedCount / postCount) * 100) : 0}%</span></div>
			<p class="mt-4 text-3xl font-bold">{mailedCount}<span class="ml-1 text-base font-medium text-slate-500">/ {postCount}</span></p>
			<p class="mt-1 text-xs text-slate-500">Posts gedeeld met abonnees</p>
		</div>
	</section>

	<section class="overflow-hidden rounded-2xl border border-white/10 bg-[#20262F]">
		<div class="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
			<div><h3 class="font-bold">Recente blogposts</h3><p class="mt-1 text-xs text-slate-500">De laatste toevoegingen aan je blog</p></div>
			<a href="/auth/lucia/posts" class="inline-flex items-center gap-1 text-sm font-semibold text-[#C7B5FF] hover:text-white">Alles bekijken <ArrowUpRight size={15} /></a>
		</div>
		{#if recentPosts.length}
			<ul class="divide-y divide-white/5">
				{#each recentPosts as post}
					<li class="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
						<div class="min-w-0"><p class="truncate font-semibold">{post.title}</p><p class="mt-1 text-xs text-slate-500">{new Date(post.createdAt).toLocaleDateString('nl-NL', { dateStyle: 'medium' })}</p></div>
						<span class={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${post.mailed ? 'bg-[#42D9E8]/10 text-[#42D9E8]' : 'bg-[#F6B956]/10 text-[#F6B956]'}`}>{post.mailed ? 'Nieuwsbrief verstuurd' : 'Nog niet verstuurd'}</span>
					</li>
				{/each}
			</ul>
		{:else}
			<div class="px-6 py-12 text-center"><p class="font-semibold">Nog geen blogposts</p><p class="mt-1 text-sm text-slate-400">Importeer je Markdown-posts via Blogposts beheren.</p><a href="/auth/lucia/posts" class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#C7B5FF]">Open blogbeheer <ArrowUpRight size={15} /></a></div>
		{/if}
	</section>
</div>
