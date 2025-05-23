<script lang="ts">
	import type { PageData } from '../$types';
	import type { Snippet } from 'svelte';

	let { children, data } = $props<{ children: Snippet; data: PageData }>();

	console.log('data', data);
</script>

<main class="relative h-screen">
	<nav></nav>
	{@render children()}
</main>
