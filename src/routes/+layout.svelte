<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import SideNav from '$lib/components/SideNav.svelte';
	import '../app.css';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { tick } from 'svelte';

	let { children } = $props();
	let pageContainer: HTMLElement;

	$effect(() => {
		// Animate in on first load
		gsap.fromTo(
			pageContainer,
			{ opacity: 0, y: 40 },
			{ opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
		);
	});

	beforeNavigate(() => {
		// Animate out before navigation
		if (pageContainer) {
			gsap.to(pageContainer, {
				opacity: 0,
				y: -40,
				duration: 0.4,
				ease: 'power2.in'
			});
		}
	});

	afterNavigate(async () => {
		await tick();
		if (pageContainer) {
			gsap.fromTo(
				pageContainer,
				{ opacity: 0, y: 40 },
				{ opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
			);
		}
	});
</script>

<NavBar />
<SideNav />
<main bind:this={pageContainer} class="min-h-screen">
	{@render children()}
</main>
