<script lang="ts">
	import { page } from '$app/state';
	import { BookOpenText, LayoutDashboard, LogOut, Users } from 'lucide-svelte';

	let { children } = $props();

	const navigation = [
		{ label: 'Dashboard', href: '/auth/lucia', icon: LayoutDashboard },
		{ label: 'Blogposts', href: '/auth/lucia/posts', icon: BookOpenText },
		{ label: 'Abonnees', href: '/auth/lucia/subscribers', icon: Users }
	];

	const isLogin = $derived(page.url.pathname === '/auth/lucia/login');
	const activeHref = $derived(
		page.url.pathname.startsWith('/auth/lucia/posts')
			? '/auth/lucia/posts'
			: page.url.pathname.startsWith('/auth/lucia/subscribers')
				? '/auth/lucia/subscribers'
				: '/auth/lucia'
	);
</script>

{#if isLogin}
	{@render children()}
{:else}
	<div class="min-h-screen bg-[#171B21] font-walsheim text-[#F3F5F7]">
		<aside class="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-white/10 bg-[#20262F] px-5 py-6 md:flex">
			<a href="/auth/lucia" class="mb-10 flex items-center gap-3 rounded-xl px-2 py-1" aria-label="Rowdy Byte admin home">
				<span class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#9B7BFF] to-[#42D9E8] text-sm font-black text-[#171B21]">RB</span>
				<span>
					<span class="block text-sm font-bold tracking-wide">ROWDY BYTE</span>
					<span class="block font-proto text-[10px] uppercase tracking-[0.18em] text-slate-400">Content studio</span>
				</span>
			</a>

			<p class="mb-3 px-3 font-proto text-[10px] uppercase tracking-[0.2em] text-slate-500">Beheer</p>
			<nav aria-label="Admin navigatie" class="flex flex-col gap-1">
				{#each navigation as item}
					{@const Icon = item.icon}
					<a
						href={item.href}
						aria-current={activeHref === item.href ? 'page' : undefined}
						class={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${activeHref === item.href ? 'bg-[#9B7BFF]/15 font-semibold text-[#C7B5FF]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
					>
						<Icon size={18} strokeWidth={1.8} />
						{item.label}
					</a>
				{/each}
			</nav>

			<div class="mt-auto space-y-2 border-t border-white/10 pt-4">
				<a href="/" class="block rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">← Terug naar website</a>
				<form method="post" action="/auth/lucia?/logout">
					<button class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">
						<LogOut size={16} /> Uitloggen
					</button>
				</form>
			</div>
		</aside>

		<div class="min-h-screen md:pl-64">
			<header class="sticky top-0 z-10 border-b border-white/10 bg-[#171B21]/90 px-5 py-4 backdrop-blur md:px-10">
				<div class="mx-auto flex max-w-6xl items-center justify-between gap-4">
					<div class="flex items-center gap-3">
						<span class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#9B7BFF] to-[#42D9E8] text-xs font-black text-[#171B21] md:hidden">RB</span>
						<div>
							<p class="font-proto text-[10px] uppercase tracking-[0.18em] text-slate-500">Rowdy Byte / Admin</p>
							<h1 class="text-lg font-bold">{navigation.find((item) => item.href === activeHref)?.label ?? 'Dashboard'}</h1>
						</div>
					</div>
					<a href="/" class="text-sm text-slate-400 transition hover:text-white md:hidden">Website ↗</a>
					<div class="hidden items-center gap-2 rounded-full border border-white/10 bg-[#20262F] px-3 py-1.5 text-xs text-slate-300 sm:flex">
						<span class="h-2 w-2 rounded-full bg-[#42D9E8]"></span> Ingelogd
					</div>
				</div>
				<nav aria-label="Admin navigatie" class="mx-auto mt-4 flex max-w-6xl gap-2 overflow-x-auto md:hidden">
					{#each navigation as item}
						<a href={item.href} aria-current={activeHref === item.href ? 'page' : undefined} class={`whitespace-nowrap rounded-lg px-3 py-2 text-sm ${activeHref === item.href ? 'bg-[#9B7BFF]/15 text-[#C7B5FF]' : 'text-slate-400 hover:bg-white/5'}`}>{item.label}</a>
					{/each}
				</nav>
			</header>

			<main class="mx-auto max-w-6xl px-5 py-8 md:px-10 md:py-10">
				{@render children()}
			</main>
		</div>
	</div>
{/if}
