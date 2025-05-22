<script lang="ts">
	import { NotebookPen, Globe, Laptop, Brain, TrendingUp, Folder, Mail } from 'lucide-svelte';
	import { onMount, tick } from 'svelte';
	import gsap from 'gsap';

	const navLinks = [
		{ label: 'Blog', href: '/blog', icon: NotebookPen },
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
			gsap.set(navRef, { y: -120, opacity: 0, pointerEvents: 'none', width: '100vw', left: 0 });
		}
	});

	$: if (navRef) {
		if (open) {
			gsap.to(navRef, {
				y: 0,
				opacity: 1,
				width: '100vw',
				left: 0,
				duration: 0.4,
				pointerEvents: 'auto',
				ease: 'power2.out',
				overwrite: true
			});
		} else {
			gsap.to(navRef, {
				y: -120,
				opacity: 0,
				width: '100vw',
				left: 0,
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
	class=" z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-gray-500/40 shadow-lg backdrop-blur-md transition-all hover:bg-gray-500/60 focus:outline-none"
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
	class="fixed top-0 left-0 z-[70] flex flex-col gap-4 border-b border-gray-400/20 bg-[#1d232a] p-4 shadow-xl"
	style="display: flex; width: 100vw; left: 0;"
>
	<!-- Close button -->
	<button
		class="absolute top-2 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-500/40 hover:bg-gray-500/60 focus:outline-none"
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
			class="flex items-center justify-center rounded-xl px-3 py-2 text-white/80 transition-all duration-200 hover:bg-gray-200 hover:text-[#1d232a]"
			title={link.label}
		>
			<svelte:component this={link.icon} size={30} class="mb-1" aria-hidden="true" />
			<span class="text-md pl-2 font-semibold tracking-wide">{link.label}</span>
		</a>
	{/each}
</nav>
