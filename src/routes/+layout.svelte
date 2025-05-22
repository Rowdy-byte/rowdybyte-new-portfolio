<script lang="ts">
	import SideNav from '$lib/components/SideNav.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<SideNav />
<main class="">
	{@render children()}
</main>
