<script lang="ts">
	import { page } from '$app/state';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import { animate } from '$lib/animations/animate';
	import { openSidebarAnimation } from '$lib/animations/sidebar-animations';
	import gsap from 'gsap';
	import { getSidebarIsOpen } from '$lib/state.svelte';
	import SidebarDots from './SidebarDots.svelte';
	import BlogNavHeader from './BlogNavHeader.svelte';
	let submenuStates = $state<{ [key: string]: boolean }>({});
	let pathname = $state();

	$effect(() => {
		pathname = page.url.pathname;
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

<SidebarDots />

<aside>
	{#if getSidebarIsOpen().sidebarIsOpen}
		<section
			use:animate={openSidebarAnimation}
			class="sidebar font-walsheim fullscreen:left-40 fixed top-[55%] left-8 z-40 mr-2 -translate-y-1/2 transform overflow-hidden border bg-[#1b1e28] opacity-1 shadow-md 2xl:left-20"
		>
			<BlogNavHeader title="Blog Posts" />
			<section class=" px-4 py-4">
				{#each data.headers as { slug, headers }}
					<div class="flex justify-between">
						<a
							class="font-walsheim flex items-center text-gray-200"
							href={`/blog/${slug.replace(/ /g, '-').trim()}`}
						>
							<h3 class="font-walsheim">
								{slug.replace(/[0-9]/, '').replace(/\b\w/g, (match: string) => match.toUpperCase())}
							</h3>
						</a>
						<button onclick={() => toggleSubmenu(slug)} class="ml-2">
							{#if submenuStates[slug]}
								<ChevronUp size={20} class="text-gray-200" />
							{:else}
								<ChevronDown size={20} class="text-gray-200" />
							{/if}
						</button>
					</div>
					{#if submenuStates[slug]}
						{#if headers}
							{#each headers as subheader}
								{#if pathname === '/blog'}
									<a
										class=""
										href={`/blog/
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
										href={`/blog/${slug.replace(/ /g, '-').trim()}#${subheader.replace(/ /g, '-').toLowerCase()}`}
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
