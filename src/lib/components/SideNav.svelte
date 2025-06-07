<script lang="ts">
	import {
		Home,
		Globe,
		Laptop,
		Brain,
		TrendingUp,
		FlaskConical,
		Folder,
		Mail,
		Wrench // Nieuw icoon voor Built With
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { page } from '$app/state';

	const navLinks = [
		{ label: 'Intro', href: '#intro', icon: Home },
		{ label: 'Socials', href: '#socials', icon: Globe },
		{ label: 'Hard Skills', href: '#hardskills', icon: Laptop },
		{ label: 'Soft Skills', href: '#softskills', icon: Brain },
		{ label: 'Improvements', href: '#improvements', icon: TrendingUp },
		{ label: 'Projects', href: '#projects', icon: Folder },
		{ label: 'Built With', href: '#builtwith', icon: Wrench }, // Nieuwe entry
		{ label: 'Contact', href: '#contact', icon: Mail }
	];

	let open = $state(false);
	let navRef: HTMLElement;
	let triggerButtonRef = $state<HTMLElement>();
	let pathname = $state();

	function scrollToSection(e: MouseEvent, href: string) {
		e.preventDefault();
		const id = href.replace('#', '');
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
		open = false;
	}

	function openNav() {
		open = true;
	}

	function closeNav() {
		open = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (open && navRef && triggerButtonRef) {
			const target = event.target as Node;
			if (!navRef.contains(target) && !triggerButtonRef.contains(target)) {
				closeNav();
			}
		}
	}

	$effect(() => {
		if (navRef) {
			gsap.set(navRef, { x: -120, opacity: 0, pointerEvents: 'none' });
		}
	});

	$effect(() => {
		pathname = page.url.pathname;
	});

	$effect(() => {
		if (navRef) {
			if (open) {
				gsap.to(navRef, {
					x: 0,
					opacity: 1,
					duration: 0.4,
					pointerEvents: 'auto',
					ease: 'power2.out',
					overwrite: true
				});
			} else {
				gsap.to(navRef, {
					x: -120,
					opacity: 0,
					duration: 0.3,
					pointerEvents: 'none',
					ease: 'power2.in',
					overwrite: true
				});
			}
		}
	});
</script>

<svelte:window on:mousedown={handleClickOutside} />

{#if pathname === '/'}
	<button
		bind:this={triggerButtonRef}
		class="fixed top-1/2 left-4 z-[60] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-gray-500/40 shadow-lg backdrop-blur-md transition-all hover:cursor-pointer hover:bg-gray-500/60 focus:outline-none"
		aria-label="Open navigation"
		onclick={openNav}
		style:display={open ? 'none' : 'flex'}
	>
		<svg
			class="h-7 w-7 text-white"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
		</svg>
	</button>
{/if}

<nav
	bind:this={navRef}
	class="fixed top-1/2 left-4 z-50 flex -translate-y-1/2 flex-col gap-4 rounded-2xl border-2 border-gray-400/20 bg-[#1d232a] bg-clip-padding p-4 shadow-xl backdrop-blur-md backdrop-saturate-150"
	style="display: flex;"
>
	<!-- Close button -->
	<button
		class="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-500/40 hover:bg-gray-500/60 focus:outline-none"
		aria-label="Close navigation"
		onclick={closeNav}
	>
		<svg
			class="h-5 w-5 text-white"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
	</button>

	{#each navLinks as link}
		<a
			href={link.href}
			onclick={(e) => scrollToSection(e, link.href)}
			class="flex flex-col items-center justify-center rounded-xl px-3 py-2 text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-[#1d232a]"
			title={link.label}
		>
			{#if link.icon}
				<link.icon size={22} class="mb-1" aria-hidden="true" />
			{/if}
			<span class="text-xs font-semibold tracking-wide">{link.label}</span>
		</a>
	{/each}
</nav>

<style>
	nav {
		font-family: GT Walsheim Pro Regular;
	}
</style>
