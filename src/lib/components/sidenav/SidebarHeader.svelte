<script lang="ts">
	import { getSidebarIsOpen } from '$lib/state.svelte';

	let { title } = $props();
</script>

<header class="flex justify-center bg-gradient-to-r from-[#5de4c7] to-purple-500 p-2">
	<section>
		<h1 class="header text-[#1b1e28]">{title}</h1>
	</section>
</header>

<style>
	.header {
		font-family: 'GT Walsheim Pro';
	}
</style>
