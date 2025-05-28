<script lang="ts">
	import { page } from '$app/stores';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';

	import { animate } from '../../animate';
	import gsap from 'gsap';
	import { openSidebarAnimation } from '../../animations/sidebar-animations';
	import SidebarDots from '$lib/components/sidenav/SidebarDots.svelte';
	import { getSidebarIsOpen } from '$lib/state.svelte';
	import SidebarHeader from './SidebarHeader.svelte';

	let submenuStates = $state<{ [key: string]: boolean }>({});
	let pathname = $state();

	$effect(() => {
		pathname = $page.url.pathname;
	});

	const handleClick = () => {
		gsap.to('.sidebar', {
			rotation: 45,
			opacity: 0,
			duration: 0.5,
			onComplete: () => {
				getSidebarIsOpen().sidebarIsOpen === false;
			}
		});
	};

	let { data } = $props();

	const toggleSubmenu = (slug: string) => {
		submenuStates[slug] = !submenuStates[slug];
	};
</script>

<aside>
	<SidebarDots />

	{#if getSidebarIsOpen().sidebarIsOpen}
		<section
			use:animate={openSidebarAnimation}
			class="sidebar shadow-custom-sidebar fullscreen:left-40 fixed top-[55%] left-8 z-40 mr-2 -translate-y-1/2 transform overflow-hidden rounded-md bg-[#1b1e28] opacity-0 2xl:left-20"
		>
			<SidebarHeader title="Table of Contents" />
			<section class="rounded-md rounded-l-none px-4 py-4">
				{#each data.headers as { slug, headers }}
					<div class="flex justify-between">
						<a
							class="links flex items-center font-bold"
							href={`/docs/${slug.replace(/ /g, '-').trim()}`}
						>
							<h3 class="font-walsheim text-[#5de4c7]">
								{slug.replace(/[0-9]/, '').replace(/\b\w/g, (match: string) => match.toUpperCase())}
							</h3>
						</a>
						<button onclick={() => toggleSubmenu(slug)} class="ml-2">
							{#if submenuStates[slug]}
								<ChevronUp size={20} class="text-[#5de4c7]" />
							{:else}
								<ChevronDown size={20} class="text-[#5de4c7]" />
							{/if}
						</button>
					</div>
					{#if submenuStates[slug]}
						{#if headers}
							{#each headers as subheader}
								{#if pathname === '/docs'}
									<a
										class=""
										href={`/docs/
									${slug.replace(/ /g, '-').trim()}#${subheader.replace(/ /g, '-').toLowerCase()}`}
									>
										<p
											class="ml-9 tracking-normal text-slate-200 transition-all hover:scale-[1.05] hover:text-purple-500"
										>
											{subheader}
										</p>
									</a>
								{:else}
									<a
										class=""
										href={`/docs/${slug.replace(/ /g, '-').trim()}#${subheader.replace(/ /g, '-').toLowerCase()}`}
									>
										<p
											class="ml-9 tracking-normal text-slate-200 transition-all hover:scale-[1.05] hover:text-purple-500"
										>
											{subheader}
										</p>
									</a>
								{/if}
							{/each}
						{/if}
					{/if}
				{/each}
			</section>
		</section>
	{/if}
</aside>

<style>
	.sidebar {
		font-family: 'GT Walsheim Pro Regular';
	}
</style>
