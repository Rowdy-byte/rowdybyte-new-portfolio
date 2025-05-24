<script lang="ts">
	let { data } = $props();

	async function mail(postId: number) {
		const res = await fetch(`/auth/lucia/mail-post/${postId}`, {
			method: 'POST'
		});
		if (res.ok) {
			alert('✅ Mails verstuurd!');
			location.reload();
		} else {
			alert('❌ Mislukt. Check de server.');
		}
	}
</script>

<main class=" mx-auto flex max-w-[650px] flex-col p-4 pb-20 pt-40 font-walsheim">
	<button
		onclick={async () => {
			const res = await fetch('/auth/lucia/import-posts', { method: 'POST' });
			const json = await res.json();
			alert(`✅ ${json.inserted} posts geïmporteerd!`);
			location.reload();
		}}
		class="mb-6 bg-gray-500 px-4 py-2 text-white hover:bg-gray-700"
	>
		Importeer Markdown Posts
	</button>

	<h1 class="mb-4 text-xl font-bold text-gray-500">Admin: Blogposts beheren</h1>

	<ul class="space-y-4">
		{#each data.posts as post}
			<li class="flex items-center justify-between border-b pb-2">
				<div>
					<div class="font-semibold">{post.title}</div>
					<div class="text-xs text-gray-500">
						Gepubliceerd op {new Date(post.createdAt).toLocaleDateString()}
					</div>
				</div>

				{#if post.mailed}
					<span class="text-sm text-green-600">✔ al gemaild</span>
				{:else}
					<button
						onclick={() => mail(post.id)}
						class=" bg-purple-500 px-4 py-1 text-white hover:bg-purple-700"
					>
						Mail subscribers
					</button>
				{/if}
			</li>
		{/each}
	</ul>
</main>
