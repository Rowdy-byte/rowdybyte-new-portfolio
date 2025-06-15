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

	// Add skip link for accessibility
	function skipToMain() {
		const main = document.querySelector('main');
		if (main) {
			main.focus();
			main.scrollIntoView();
		}
	}

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

<!-- Skip link for accessibility -->
<a href="#main-content" class="skip-link" onclick={skipToMain}> Skip to main content </a>

<div bind:this={pageContainer} class="min-h-screen" id="main-content" tabindex="-1">
	{@render children()}
</div>

<style>
	.skip-link {
		position: absolute;
		top: -100px;
		left: 0;
		background: #2c333c;
		color: white;
		padding: 0.5rem 1rem;
		text-decoration: none;
		border-radius: 0 0 4px 0;
		z-index: 1000;
		transition: all 0.3s ease;
	}

	.skip-link:focus,
	.skip-link:hover {
		top: 0;
		outline: 2px solid #a855f7;
		outline-offset: 2px;
	}
</style>
