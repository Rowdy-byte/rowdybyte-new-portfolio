<script lang="ts">
	let { children } = $props();
</script>

<main class="relative h-screen">
	{@render children()}
</main>

<style>
	main {
		font-family: 'GT Walsheim Pro Regular';
	}
</style>
