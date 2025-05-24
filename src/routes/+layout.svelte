<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import SideNav from '$lib/components/SideNav.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<NavBar />
<SideNav />
<main class="relative">
	{@render children()}
</main>

<style>
	/* main {
		font-family: 'GT Walsheim Pro Regular';
	} */
</style>
