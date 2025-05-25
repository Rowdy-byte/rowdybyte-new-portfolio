<script lang="ts">
	import { NotebookPen, BookOpenText, LockKeyhole } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { page } from '$app/state';

	let pathname = $state();

	const navLinks = [
		{ label: 'Blog', href: '/blog', icon: NotebookPen },
		{ label: 'Documentation', href: '/docs', icon: BookOpenText },
		{ label: 'Admin', href: '/admin', icon: LockKeyhole }
	];

	let open = $state(false);
	let navRef: HTMLElement;
	let linkRefs: HTMLElement[] = $state([]);

	function openNav() {
		open = true;
	}

	function closeNav() {
		open = false;
	}

	$effect(() => {
		if (navRef) {
			gsap.set(navRef, { y: -120, opacity: 0, pointerEvents: 'none', width: '100vw', left: 0 });
		}
	});

	$effect(() => {
		if (navRef) {
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
	});

	$effect(() => {
		if (open && navRef) {
			// Animate nav links in
			gsap.fromTo(
				linkRefs.filter(Boolean),
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', overwrite: true }
			);
		} else if (!open && navRef) {
			// Instantly hide links on close
			gsap.set(linkRefs.filter(Boolean), { opacity: 0, y: 30 });
		}
	});

	$effect(() => {
		pathname = page.url.pathname;
	});
</script>

<!-- Hamburger button (center left) -->
<button
	class=" z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-gray-500/40 shadow-lg backdrop-blur-md transition-all hover:cursor-pointer hover:bg-gray-500/60 focus:outline-none"
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

<nav
	bind:this={navRef}
	class="fixed top-0 left-0 z-[70] flex flex-col gap-4 border-b border-gray-400/20 bg-[#1d232a] p-4 shadow-xl"
	style="display: flex; width: 100vw; left: 0;"
>
	<!-- Close button -->
	<button
		class="absolute top-2 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-500/40 hover:bg-gray-500/60 focus:outline-none"
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

	{#each navLinks as link, i}
		{@const Icon = link.icon}
		<a
			href={link.href}
			class="flex items-center rounded-xl px-3 py-2 text-white/80 transition-all duration-200 hover:text-purple-500"
			title={link.label}
			bind:this={linkRefs[i]}
			onclick={closeNav}
		>
			<Icon size={24} class="mb-1" aria-hidden="true" />
			<span class="text-md pl-2 font-semibold tracking-wide">{link.label}</span>
		</a>
	{/each}
</nav>
