<script lang="ts">
	import { Home, Globe, Laptop, Brain, TrendingUp, Folder, Mail } from 'lucide-svelte';
	import { onMount, tick } from 'svelte';
	import gsap from 'gsap';

	const navLinks = [
		{ label: 'Intro', href: '#intro', icon: Home },
		{ label: 'Socials', href: '#socials', icon: Globe },
		{ label: 'Hard Skills', href: '#hardskills', icon: Laptop },
		{ label: 'Soft Skills', href: '#softskills', icon: Brain },
		{ label: 'Improvements', href: '#improvements', icon: TrendingUp },
		{ label: 'Projects', href: '#projects', icon: Folder },
		{ label: 'Contact', href: '#contact', icon: Mail }
	];

	let open = false;
	let navRef: HTMLElement;

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

	onMount(() => {
		if (navRef) {
			gsap.set(navRef, { x: -120, opacity: 0, pointerEvents: 'none' });
		}
	});

	$: if (navRef) {
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
</script>

<!-- Hamburger button (center left) -->
<button
	class="fixed top-1/2 left-4 z-[60] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-gray-500/40 shadow-lg backdrop-blur-md transition-all hover:bg-gray-500/60 focus:outline-none"
	aria-label="Open navigation"
	on:click={openNav}
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

<nav
	bind:this={navRef}
	class="fixed top-1/2 left-4 z-50 flex -translate-y-1/2 flex-col gap-4 rounded-2xl border border-gray-400/20 bg-gray-500/30 bg-clip-padding p-4 shadow-xl backdrop-blur-md backdrop-saturate-150"
	style="display: flex;"
>
	<!-- Close button -->
	<button
		class="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-500/40 hover:bg-gray-500/60 focus:outline-none"
		aria-label="Close navigation"
		on:click={closeNav}
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
			on:click={(e) => scrollToSection(e, link.href)}
			class="flex flex-col items-center justify-center rounded-xl px-3 py-2 text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-[#1d232a]"
			title={link.label}
		>
			<svelte:component this={link.icon} size={22} class="mb-1" aria-hidden="true" />
			<span class="text-xs font-semibold tracking-wide">{link.label}</span>
		</a>
	{/each}
</nav>
