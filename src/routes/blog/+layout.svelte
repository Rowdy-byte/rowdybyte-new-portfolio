<script lang="ts">
	import Blognav from '$lib/components/blog/Blognav.svelte';
	import type { PageData } from '../$types';
	import type { Snippet } from 'svelte';

	let { children, data } = $props();

	console.log('data', data);
</script>

<main class="relative h-screen">
	<nav>
		<Blognav {data} />
	</nav>
	{@render children()}
</main>

<style>
	main {
		font-family: 'GT Walsheim Pro Regular';
	}
</style>
