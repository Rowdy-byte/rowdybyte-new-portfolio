<script lang="ts">
	import { Search, Users } from 'lucide-svelte';

	let { data } = $props();
	let query = $state('');
	const filteredSubscribers = $derived(
		data.allSubscriber.filter((subscriber) => subscriber.email.toLowerCase().includes(query.trim().toLowerCase()))
	);
</script>

<div class="space-y-7">
	<section>
		<p class="mb-2 font-proto text-xs uppercase tracking-[0.2em] text-[#42D9E8]">Nieuwsbrief</p>
		<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Abonnees</h2>
		<p class="mt-2 text-sm text-slate-400">Bekijk wie zich heeft ingeschreven voor je updates.</p>
	</section>

	<section class="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#20262F] p-5">
		<span class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#42D9E8]/10 text-[#42D9E8]"><Users size={21} /></span>
		<div><p class="text-xs text-slate-400">Actieve abonnees</p><p class="text-2xl font-bold">{data.allSubscriber.length}</p></div>
	</section>

	<section class="overflow-hidden rounded-2xl border border-white/10 bg-[#20262F]">
		<div class="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
			<div><h3 class="font-bold">Nieuwsbriefinschrijvingen</h3><p class="mt-1 text-xs text-slate-500">{filteredSubscribers.length} {filteredSubscribers.length === 1 ? 'resultaat' : 'resultaten'}</p></div>
			<label class="flex items-center gap-2 rounded-xl border border-white/10 bg-[#171B21] px-3 py-2 text-slate-400 focus-within:border-[#9B7BFF]/60">
				<Search size={16} />
				<input bind:value={query} type="search" placeholder="Zoek e-mailadres…" aria-label="Zoek abonnees op e-mailadres" class="w-full border-0 bg-transparent p-0 text-sm text-white placeholder:text-slate-500 focus:ring-0 sm:w-56" />
			</label>
		</div>

		{#if filteredSubscribers.length}
			<div class="overflow-x-auto">
				<table class="w-full min-w-[520px] text-left text-sm">
					<thead class="text-xs uppercase tracking-wide text-slate-500"><tr><th class="px-6 py-3 font-medium">E-mailadres</th><th class="px-6 py-3 font-medium">Ingeschreven op</th><th class="px-6 py-3 font-medium">Status</th></tr></thead>
					<tbody class="divide-y divide-white/5">
						{#each filteredSubscribers as subscriber}
							<tr class="transition hover:bg-white/[0.025]"><td class="px-6 py-4 font-medium text-slate-200">{subscriber.email}</td><td class="px-6 py-4 text-slate-400">{new Date(subscriber.subscribedAt).toLocaleDateString('nl-NL', { dateStyle: 'medium' })}</td><td class="px-6 py-4"><span class="rounded-full bg-[#42D9E8]/10 px-2.5 py-1 text-xs font-semibold text-[#42D9E8]">Actief</span></td></tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<div class="px-6 py-14 text-center"><p class="font-semibold">{query ? 'Geen abonnees gevonden' : 'Nog geen abonnees'}</p><p class="mt-1 text-sm text-slate-400">{query ? 'Controleer je zoekterm en probeer opnieuw.' : 'Nieuwe inschrijvingen verschijnen hier.'}</p></div>
		{/if}
	</section>
</div>
