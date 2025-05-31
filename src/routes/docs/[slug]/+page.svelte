<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { page } from '$app/stores';

	import CopyCodeInjector from '../../../lib/components/CopyCodeInjector.svelte';

	let Content: ConstructorOfATypedSvelteComponent | undefined = $state();

	let { data } = $props();

	let slug = $state();
	let title = $state();

	function parseTitle(fileName: string): string {
		return fileName
			.replace(/.*\/\d+-|\.md/g, '')
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	const paths = import.meta.glob('../*.md', { eager: true });
	const filenames = Object.keys(paths);

	$effect(() => {
		slug = $page.params.slug;
		const matchingFile = filenames.find(
			(file) => file.split('/').pop()?.split('.').shift() === slug
		);

		if (matchingFile) {
			title = parseTitle(matchingFile);
		} else {
			title = 'Not Found';
		}

		if (data.content) {
			Content = data.content;
		}
	});
</script>

<main
	transition:fade={{ delay: 250, duration: 300 }}
	class="mx-auto flex max-w-3xl flex-col px-6 pt-40 pb-20"
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
		class="font-walsheim mx-auto mb-14 max-w-fit bg-gradient-to-r from-purple-500 to-[#5de4c7] bg-clip-text px-5 text-center text-4xl font-bold text-transparent md:text-6xl"
	>
		{title}
	</h1>

	{#if Content}
		<CopyCodeInjector>
			<Content />
		</CopyCodeInjector>
	{:else}
		<span class="h-screen w-full text-center">loading...</span>
	{/if}
</main>

<style>
	h1 {
		font-family: 'GT Walsheim Pro';
	}
</style>
