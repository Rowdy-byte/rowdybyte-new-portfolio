<script lang="ts">
	let { data } = $props();
	let success = $state(data?.success ?? false);
	let error = $state(data?.message ?? '');
	let email = $state(data?.email ?? '');
</script>

<main class="mx-auto flex max-w-[800px] flex-col p-4 pb-20 pt-40">
	{#if success}
		<h1 class="text-2xl font-bold text-purple-600">Je bent afgemeld</h1>
		<p class="mt-4 text-sm text-gray-600">
			{@html email} is verwijderd uit onze mailinglijst.
		</p>
	{:else}
		<h1 class="text-2xl font-bold text-red-600">Afmelden mislukt</h1>
		<p class="mt-4 text-sm text-gray-600">{error}</p>
	{/if}
</main>
