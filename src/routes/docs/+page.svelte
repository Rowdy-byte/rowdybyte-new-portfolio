<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { docsText } from '$lib/about-text';
</script>

<main
	transition:fade={{ delay: 250, duration: 300 }}
	class="absolute top-1/2 left-1/2 max-w-3xl -translate-x-1/2 -translate-y-1/2 transform"
>
	<h1
		transition:fly={{
			delay: 250,
			duration: 1000,
			x: 0,
			y: -1000,
			opacity: 0.5,
			easing: quintInOut
		}}
		class=" mx-auto mb-14 max-w-fit bg-gradient-to-r from-purple-500 to-[#5de4c7] bg-clip-text px-5 text-center text-4xl font-bold text-transparent md:text-6xl"
	>
		Documentation
	</h1>
	<p class="side font-walsheim text-md mb-8 max-w-[600px] text-center tracking-wide">
		{docsText}
	</p>

	<p class="side font-walsheim text-md max-w-[600px] text-center tracking-wide">
		Found any mistakes or have constructive feedback? Feel free to contact me!
		<a class="font-walsheim text-lg tracking-wide text-purple-500" href="/">here</a>
	</p>
</main>

<style>
	h1 {
		font-family: 'GT Walsheim Pro';
	}
</style>
