<script lang="ts">
	let { data } = $props();
	let success = $state(data?.success ?? false);
	let error = $state(data?.message ?? '');
	let email = $state(data?.email ?? '');

	$effect(() => {
		success = data?.success ?? false;
		error = data?.message ?? '';
		email = data?.email ?? '';
	});
</script>

<main
	class="font-walsheim flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 px-4 py-16"
>
	<div class="flex w-full max-w-md flex-col items-center rounded-2xl bg-white p-8 shadow-xl">
		{#if success}
			<h1 class="animate-fade-in mb-2 text-2xl font-bold text-green-600">Je bent afgemeld</h1>
			<p class="animate-fade-in mt-4 text-center text-sm text-gray-600">
				{@html email} is verwijderd uit onze mailinglijst.
			</p>
		{:else}
			<h1 class="animate-fade-in mb-2 text-2xl font-bold text-red-600">Afmelden mislukt</h1>
			<p class="animate-fade-in mt-4 text-center text-sm text-gray-600">{error}</p>
		{/if}
	</div>
</main>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fade-in {
		animation: fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}
</style>
