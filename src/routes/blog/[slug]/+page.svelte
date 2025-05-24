<script lang="ts">
	import { page } from '$app/state';
	import { Heart, Share2, Sun, Moon } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	let Content: ConstructorOfATypedSvelteComponent | undefined = $state();

	let { data } = $props();

	let slug = $state();
	let title = $state();
	let likes = $state(data.data.count ?? 0);
	let hasLiked = $state(false);
	let linkTitle = $state('');
	let url = $state('');
	let isDark = $state(false);

	function toggleTheme() {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}

	onMount(() => {
		const saved = localStorage.getItem('theme');
		if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			isDark = true;
			document.documentElement.classList.add('dark');
		} else {
			isDark = false;
			document.documentElement.classList.remove('dark');
		}
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
			if (!localStorage.getItem('theme')) {
				isDark = e.matches;
				if (isDark) {
					document.documentElement.classList.add('dark');
				} else {
					document.documentElement.classList.remove('dark');
				}
			}
		});
	});

	$effect(() => {
		slug = page.params.slug;
		if (data.content) {
			Content = data.content;
		}
	});

	$effect(() => {
		if (typeof window !== 'undefined') {
			linkTitle = document.title;
			url = window.location.href;
		}
	});

	$effect(() => {
		if (data.data.count !== undefined) {
			likes = data.data.count;
		}
	});

	$effect(() => {
		if (data.data.hasLiked !== undefined) {
			hasLiked = data.data.hasLiked;
		}
	});

	const share = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: linkTitle,
					url
				});
				console.log('Link gedeeld!');
			} catch (err) {
				console.error('Delen mislukt', err);
			}
		} else {
			await navigator.clipboard.writeText(url);
			alert('Link gekopieerd naar klembord 📋');
		}
	};
</script>

<svelte:head>
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.excerpt} />
	<meta property="og:url" content={url.toString()} />
	<meta property="og:image" content={data.meta.coverImage} />
</svelte:head>

<main
	class="font-walsheim flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 px-2 py-12 dark:from-[#181a20] dark:to-[#23262f]"
>
	<div
		class="mx-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl transition-colors duration-300 md:p-10 dark:bg-[#23262f] dark:text-gray-100"
	>
		<div class="mb-2 flex justify-end">
			<button
				class="rounded-full bg-gray-200 p-2 transition-colors hover:bg-purple-500 hover:text-white dark:bg-[#181a20] dark:hover:bg-purple-500 dark:hover:text-white"
				onclick={toggleTheme}
				aria-label="Toggle theme"
			>
				{#if isDark}
					<Sun size={20} />
				{:else}
					<Moon size={20} />
				{/if}
			</button>
		</div>
		{#if data.meta.coverImage}
			<img
				src={data.meta.coverImage}
				alt={data.meta.title}
				class="mb-6 h-64 w-full rounded-xl object-cover shadow"
			/>
		{/if}
		<h1 class="mb-2 text-3xl font-bold text-[#1b1e28] md:text-4xl dark:text-white">
			{data.meta.title}
		</h1>
		<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">{data.meta.date}</p>
		<div class="mb-4 flex flex-wrap gap-2">
			{#each data.meta.tags ?? [] as tag}
				<span
					class="rounded bg-gray-200 px-2 py-1 text-xs font-medium text-[#1b1e28] transition-all hover:bg-purple-500 hover:text-white dark:bg-[#181a20] dark:text-gray-200 dark:hover:bg-purple-500 dark:hover:text-white"
					>#{tag}</span
				>
			{/each}
		</div>
		<div
			class="prose prose-neutral dark:prose-invert max-w-none text-lg text-gray-800 dark:text-gray-100"
		>
			{#if Content}
				<Content />
			{/if}
		</div>
		<div class="mt-8 flex gap-4">
			<form method="POST" action="?/like" use:enhance>
				<button
					type="submit"
					name="like"
					class="flex items-center gap-2 rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold text-[#1b1e28] transition-all hover:bg-purple-500 hover:text-white dark:bg-[#181a20] dark:text-gray-100 dark:hover:bg-purple-500 dark:hover:text-white"
					onclick={() => {
						if (!hasLiked) {
							likes++;
							hasLiked = true;
						}
					}}
				>
					<Heart size={16} /> <span class="text-xs">{likes}</span>
				</button>
			</form>
			<button
				onclick={share}
				class="flex items-center gap-2 rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold text-[#1b1e28] transition-all hover:bg-purple-500 hover:text-white dark:bg-[#181a20] dark:text-gray-100 dark:hover:bg-purple-500 dark:hover:text-white"
			>
				<Share2 size={16} />
				<span>Delen</span>
			</button>
		</div>
		<!-- Comments section -->
		{#if data.data.comments && data.data.comments.length > 0}
			<div class="mt-10 space-y-4">
				<h3 class="text-md font-semibold">Reacties</h3>
				{#each data.data.comments as comment}
					<div class="rounded bg-gray-50 p-3 px-6 shadow dark:bg-[#181a20]">
						<p class="text-xs font-semibold text-[#1b1e28] dark:text-gray-200">
							{comment.name} zei:
						</p>
						<p class="mt-2 mb-2 text-base text-[#222] dark:text-gray-100">{comment.body}</p>
						<p class="text-xs text-gray-500 dark:text-gray-400">
							{new Date(comment.createdAt).toLocaleString('nl-NL', {
								hour12: false,
								day: '2-digit',
								month: '2-digit',
								year: 'numeric',
								hour: '2-digit',
								minute: '2-digit'
							})}
						</p>
					</div>
				{/each}
			</div>
		{/if}
		<!-- Comment form -->
		<section class="mt-10">
			<h2 class="mb-2 text-lg font-bold">Laat een reactie achter</h2>
			<form
				method="POST"
				action="?/postComment"
				use:enhance
				class="flex flex-col gap-3 rounded bg-gray-50 p-3 shadow dark:bg-[#181a20]"
			>
				<input
					name="name"
					placeholder="Naam"
					required
					class="rounded bg-white p-3 text-sm font-normal focus:outline-none dark:bg-[#23262f] dark:text-gray-100"
				/>
				<textarea
					name="body"
					placeholder="Wat vond je van dit artikel?"
					required
					class="rounded bg-white p-3 text-sm font-normal focus:outline-none dark:bg-[#23262f] dark:text-gray-100"
				></textarea>
				<button
					type="submit"
					class="ml-3 w-fit rounded bg-gray-200 px-4 py-2 text-sm font-bold text-[#1b1e28] transition-all hover:bg-purple-500 hover:text-white dark:bg-[#181a20] dark:text-gray-100 dark:hover:bg-purple-500 dark:hover:text-white"
				>
					Reageren
				</button>
			</form>
		</section>
	</div>
</main>
