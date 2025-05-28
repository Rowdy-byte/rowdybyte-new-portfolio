<script lang="ts">
	import { getSidebarIsOpen } from '$lib/state.svelte';

	let { title } = $props();
</script>

<header
	class="h-ful relative flex w-full justify-center bg-gradient-to-r from-[#5de4c7] to-purple-500 p-2"
>
	<section>
		<h1 class="text-[#1b1e28]">{title}</h1>
	</section>
</header>
