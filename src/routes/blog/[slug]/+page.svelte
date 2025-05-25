<script lang="ts">
	import { page } from '$app/state';
	import { Heart, Share2 } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	let Content: ConstructorOfATypedSvelteComponent | undefined = $state();
	let { data } = $props();

	let slug = $state();
	let title = $state();
	let likes = $state(data.data.count ?? 0);
	let hasLiked = $state(false);
	let linkTitle = $state('');
	let url = $state('');

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
	class=" mx-auto flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 px-4 py-16"
>
	<div class="mx-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg md:p-10">
		{#if data.meta.coverImage}
			<img
				src={data.meta.coverImage}
				alt={data.meta.title}
				class="mb-6 h-64 w-full rounded-xl object-cover shadow"
			/>
		{/if}
		<h1 class="mb-2 text-3xl font-bold text-[#1b1e28] md:text-4xl">{data.meta.title}</h1>
		<p class="mb-2 text-sm text-gray-500">{data.meta.date}</p>
		<div class="mb-4 flex flex-wrap gap-2">
			{#each data.meta.tags ?? [] as tag}
				<span
					class="rounded bg-gray-200 px-2 py-1 text-xs font-medium text-[#1b1e28] transition-all hover:bg-purple-500 hover:text-white"
					>#{tag}</span
				>
			{/each}
		</div>
		<div class="content prose prose-neutral text-md max-w-none tracking-wide text-gray-800">
			{#if Content}
				<Content />
			{/if}
		</div>
		<div class="mt-8 flex gap-4">
			<form method="POST" action="?/like" use:enhance>
				<button
					type="submit"
					name="like"
					class="flex items-center gap-2 rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold text-[#1b1e28] transition-all hover:bg-purple-500 hover:text-white"
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
				class="flex items-center gap-2 rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold text-[#1b1e28] transition-all hover:bg-purple-500 hover:text-white"
			>
				<Share2 size={16} />
				<span>Delen</span>
			</button>
		</div>
		<!-- Comments section -->
		{#if data.data.comments && data.data.comments.length > 0}
			<hr class="my-10 border-t border-gray-200" />
			<div class="mb-6">
				<h3 class="mb-4 text-xl font-bold text-[#1b1e28]">Reacties</h3>
				<div class="space-y-4">
					{#each data.data.comments as comment}
						<div class="rounded-xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
							<p class="mb-1 text-sm font-semibold text-[#1b1e28]">{comment.name} zei:</p>
							<p class="mb-2 text-base text-[#222]">{comment.body}</p>
							<p class="text-xs text-gray-500">
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
			</div>
		{/if}
		<!-- Comment form -->
		<section class="mt-10">
			<h2 class="mb-4 text-xl font-bold text-[#1b1e28]">Laat een reactie achter</h2>
			<form
				method="POST"
				action="?/postComment"
				use:enhance
				class="flex flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 shadow-sm"
			>
				<input
					name="name"
					placeholder="Naam"
					required
					class="rounded border border-gray-200 bg-white p-3 text-sm font-normal text-[#1b1e28] focus:outline-none"
				/>
				<textarea
					name="body"
					placeholder="Wat vond je van deze post?"
					required
					class="rounded border border-gray-200 bg-white p-3 text-sm font-normal text-[#1b1e28] focus:outline-none"
				></textarea>
				<button
					type="submit"
					class="self-end rounded bg-gray-200 px-4 py-2 text-sm font-bold text-[#1b1e28] transition-all hover:bg-purple-500 hover:text-white"
				>
					Reageren
				</button>
			</form>
		</section>
	</div>
</main>

<style>
	main {
		font-family: 'GT Walsheim Pro Regular', sans-serif;
	}

	.content {
		font-family: 'Lora', sans-serif;
	}

	:global(.content h2) {
		font-family: 'GT Walsheim Pro', sans-serif;
	}
</style>
