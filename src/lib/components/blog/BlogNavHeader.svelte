<script lang="ts">
	import { getSidebarIsOpen } from '$lib/state.svelte';

	let { title } = $props();
</script>

<header class="relative flex justify-center bg-gray-200 p-2">
	<section>
		<h1 class="font-walsheim text-[#1b1e28]">{title}</h1>
	</section>
</header>
