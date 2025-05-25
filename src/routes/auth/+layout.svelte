<script lang="ts">
	let { children } = $props();
	import { page } from '$app/state';

	let path = $state();

	$effect(() => {
		path = page.url.pathname;
	});
</script>

<main class="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 font-walsheim">
	<nav class="mx-auto mt-8 flex max-w-md items-center justify-center gap-4 rounded-2xl bg-white p-4 shadow">
		{#if path === '/auth/lucia'}
			<a
				class="rounded bg-[#2c333c] px-6 py-2 font-bold text-white transition-all hover:bg-purple-500"
				href="/auth/lucia/posts"
			>
				Beheer Blog
			</a>
		{:else}
			<a
				class="rounded bg-[#2c333c] px-6 py-2 font-bold text-white transition-all hover:bg-purple-500"
				href="/auth/lucia"
			>
				Dashboard
			</a>
		{/if}
	</nav>
	<div class="mx-auto max-w-[650px] p-4">
		{@render children()}
	</div>
</main>
