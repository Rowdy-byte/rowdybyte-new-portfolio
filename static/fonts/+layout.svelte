<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';

	import '../website-globals.scss';
	import '../scrollbar.scss';
	import '../app.css';
	import '../about.scss';

	import Navbar from '$lib/components/Navbar.svelte';
	import type { PageData } from './$types';

	$effect(() => {});

	let { children } = $props<{ children: Snippet; data: PageData }>();

	let pathname = $state();

	$effect(() => {
		pathname = $page.url.pathname;
	});
</script>

<Navbar />

<main class="relative h-screen">
	{@render children()}
</main>
