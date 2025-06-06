<script lang="ts">
	let { header, paragraph } = $props();
</script>

<section class="mt-8 flex flex-col">
	<p class="text-lg font-bold">{paragraph}</p>
	<h1 class="text-sm">{header}</h1>
</section>

<!-- <style>
	p,
	h1 {
		font-family: 'ABC Ginto Nord';
	}
</style> -->
