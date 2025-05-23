<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';

	import { enhance } from '$app/forms';
	import { Heart, Share2 } from 'lucide-svelte';

	let Content: ConstructorOfATypedSvelteComponent | undefined = $state();

	let { data } = $props();

	const paths = import.meta.glob('../*.md', { eager: true });
	const filenames = Object.keys(paths);

	let slug = $state();
	let title = $state();
	let likes = $state(data.data.count ?? 0);
	let hasLiked = $state(false);
	let linkTitle = $state('');
	let url = $state('');

	function parseTitle(fileName: string): string {
		return fileName
			.replace(/.*\/\d+-|\.md/g, '')
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	$effect(() => {
		slug = page.params.slug;
		const matchingFile = filenames.find(
			(file) => file.split('/').pop()?.split('.').shift() === slug
		);

		if (matchingFile) {
			title = parseTitle(matchingFile);
		} else {
			title = 'Not Found';
		}

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
			// fallback: kopieer naar klembord
			await navigator.clipboard.writeText(url);
			alert('Link gekopieerd naar klembord 📋');
		}
	};

	console.log('data', data);
</script>

<svelte:head>
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.excerpt} />
	<meta property="og:url" content={url.toString()} />
	<meta property="og:image" content={data.meta.coverImage} />
</svelte:head>

<main
	transition:fade={{ delay: 250, duration: 300 }}
	class="font-walsheim mx-auto flex max-w-[650px] flex-col gap-4 px-6 pt-40 pb-20"
>
	<div class="w-full">
		{#if data.meta.coverImage}
			<img
				src={data.meta.coverImage}
				alt={data.meta.title}
				class="mb-4 h-[200px] w-full object-cover shadow-lg"
			/>
		{/if}
	</div>

	<h1 class="text-2xl">{data.meta.title}</h1>
	<h1>{data.meta.description}</h1>
	<p class="text-sm text-gray-500">{data.meta.date}</p>

	<div class="mb-4 flex flex-wrap gap-2">
		{#each data.meta.tags ?? [] as tag}
			<span class=" bg-gray-200 px-2 py-1 text-xs font-medium text-[#1b1e28] hover:bg-purple-500">
				#{tag}
			</span>
		{/each}
	</div>

	<div></div>
	<div class="flex gap-4">
		<form method="POST" action="?/like" use:enhance>
			<button
				type="submit"
				name="like"
				class="flex items-center gap-2 transition-all hover:text-purple-500"
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
			class=" border-neutral-300 text-sm transition-all hover:text-purple-500"
		>
			<Share2 size={16} />
		</button>
	</div>
	<section class="mt-6">
		<h1 class="mb-2 text-lg font-bold">Laat een reactie achter</h1>
		<form
			method="POST"
			action="?/postComment"
			use:enhance
			class="flex flex-col gap-3 p-3 shadow-md"
		>
			<input
				name="name"
				placeholder="Naam"
				required
				class=" bg-[#1b1e28] p-3 text-sm font-normal focus:outline-none"
			/>
			<textarea
				name="body"
				placeholder="Wat vond je van dit artikel?"
				required
				class=" bg-[#1b1e28] p-3 text-sm font-normal focus:outline-none"
			></textarea>
			<button
				class="ml-3 w-fit bg-gray-200 px-4 py-2 text-sm font-bold text-[#1b1e28] transition-all hover:bg-purple-500 hover:text-gray-200"
			>
				Reageren
			</button>
		</form>

		{#if data.data.comments && data.data.comments.length > 0}
			<div class="mt-6 space-y-4">
				<h3 class="text-md font-semibold">Reacties</h3>
				{#each data.data.comments as comment}
					<div class=" p-3 px-6 shadow-md">
						<p class="text-xs text-neutral-400">{comment.name} zei:</p>
						<p class="mt-2 mb-2">{comment.body}</p>
						<p class="text-xs text-neutral-400">
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
	</section>
</main>
