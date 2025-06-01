<script lang="ts">
	let { header, paragraph } = $props();
</script>

<section class="mt-8 flex flex-col">
	<p class="font-bold">{paragraph}</p>
	<h1 class="text-sm">{header}</h1>
</section>
