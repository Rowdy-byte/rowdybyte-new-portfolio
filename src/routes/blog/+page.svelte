<script lang="ts">
	import { enhance } from '$app/forms';
	import { Mail } from 'lucide-svelte';
	import gsap from 'gsap';
	import { tick } from 'svelte';

	let { data, form } = $props();

	// Ensure post type includes required properties
	type Post = {
		slug: string;
		title: string;
		date: string;
		description: string;
		coverImage?: string;
	};

	// Type assertion to inform TypeScript about the actual structure
	const posts = data.headers as Post[];
	let totalPages = $state(0);

	let currentPage = $state(1);
	const postsPerPage = $state(4);

	$effect(() => {
		totalPages = Math.ceil(posts.length / postsPerPage);
	});

	function setPage(page: number) {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
		}
	}

	let successMsgRef: HTMLElement | undefined = $state();
	let showSuccess = $state(false);

	$effect(() => {
		if (form?.success) {
			showSuccess = true;
			tick().then(() => {
				if (successMsgRef) {
					gsap.fromTo(
						successMsgRef,
						{ opacity: 0, y: 20 },
						{ opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
					);
					setTimeout(() => {
						if (successMsgRef) {
							gsap.to(successMsgRef, {
								opacity: 0,
								y: -20,
								duration: 0.5,
								ease: 'power2.in',
								onComplete: () => {
									showSuccess = false;
								}
							});
						}
					}, 5000);
				}
			});
		}
	});
</script>

<main
	class="font-walsheim mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 px-4 py-16"
>
	<h1 class="mb-10 text-center text-5xl font-bold sm:text-7xl">Rowdy's Blog</h1>

	<div class="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage) as post}
			<a
				href={`/blog/${post.slug.replace(/ /g, '-').trim()}`}
				class="group flex flex-col overflow-hidden rounded-2xl bg-gray-100 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl"
			>
				{#if post.coverImage}
					<img
						src={String(post.coverImage)}
						alt={post.title}
						class="h-48 w-full object-cover transition-all group-hover:scale-105"
					/>
				{/if}
				<div class="flex flex-1 flex-col justify-between p-6">
					<h2 class="mb-2 text-2xl font-bold text-[#1b1e28] group-hover:text-purple-500">
						{post.title}
					</h2>
					<p class="mb-2 text-sm text-gray-500">{post.date}</p>
					<p class="mb-4 line-clamp-3 text-base text-gray-700">{post.description}</p>
					<div class="mt-auto flex items-center justify-between">
						<span class="text-xs text-gray-400">Lees verder →</span>
					</div>
				</div>
			</a>
		{/each}
	</div>

	<!-- Pagination controls -->
	{#if totalPages > 1}
		<div class="mt-8 flex items-center justify-center gap-2">
			<button
				disabled={currentPage === 1}
				class="rounded bg-gray-200 px-3 py-1 font-bold text-[#1b1e28] disabled:opacity-50"
				onclick={() => setPage(currentPage - 1)}
			>
				Vorige
			</button>
			{#each Array(totalPages) as _, i}
				<button
					class="rounded border border-gray-200 bg-gray-100 px-3 py-1 font-bold text-[#1b1e28] transition-all hover:bg-purple-500 hover:text-white {currentPage ===
					i + 1
						? 'bg-purple-500 text-white'
						: ''}"
					onclick={() => setPage(i + 1)}
				>
					{i + 1}
				</button>
			{/each}
			<button
				disabled={currentPage === totalPages}
				class="rounded bg-gray-200 px-3 py-1 font-bold text-[#1b1e28] disabled:opacity-50"
				onclick={() => setPage(currentPage + 1)}
			>
				Volgende
			</button>
		</div>
	{/if}

	<section class="mt-12 w-full max-w-lg">
		<form method="POST" action="?/subscribe" class="flex flex-col items-center" use:enhance>
			<h2 class="mb-2 text-center text-lg font-semibold">Schrijf je in voor nieuwe blogposts:</h2>
			<div class="relative my-2 flex w-full items-center">
				<div class="absolute left-2 flex items-center justify-center">
					<Mail color={'#6b7280'} />
				</div>
				<input
					type="email"
					name="email"
					id="email"
					autocomplete="off"
					required
					placeholder="jouw@email.nl"
					class="w-full rounded-full border border-gray-200 bg-gray-200 p-2 px-4 py-3 pl-10 font-normal text-gray-500 outline-none"
				/>
			</div>
			<button
				type="submit"
				class="rounded-full bg-[#2c333c] px-4 py-3 font-bold text-white hover:text-purple-500"
				>Inschrijven</button
			>
			{#if showSuccess}
				<p bind:this={successMsgRef} class="mt-2 text-center text-xs text-green-600">
					Je bent ingeschreven! Check je spamfolder!
				</p>
			{:else if form?.error}
				<p class="mt-2 text-center text-xs text-red-600">
					Je bent al ingeschreven! Check je spamfolder!
				</p>
			{/if}
		</form>
	</section>
</main>
