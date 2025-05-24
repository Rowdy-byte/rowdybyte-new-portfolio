<script lang="ts">
	let { children } = $props();
	import { page } from '$app/state';

	let path = $state();

	$effect(() => {
		path = page.url.pathname;
	});
</script>

{@render children()}

<nav class="font-walsheim mx-auto max-w-[650px] p-4">
	{#if path === '/auth/lucia'}
		<a
			class="font-walsheim mb-6 bg-gray-500 px-4 py-2 text-white hover:bg-gray-700"
			href="/auth/lucia/posts"
		>
			Beheer Blog
		</a>
	{:else}
		<a
			class="font-walsheim mb-6 bg-gray-500 px-4 py-2 text-white hover:bg-gray-700"
			href="/auth/lucia"
		>
			Dashboard
		</a>
	{/if}
</nav>
