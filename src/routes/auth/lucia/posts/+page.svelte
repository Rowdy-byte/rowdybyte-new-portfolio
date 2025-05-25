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

<main class="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 px-4 py-16 font-walsheim">
	<div class="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl">
		<button
			onclick={async () => {
				const res = await fetch('/auth/lucia/import-posts', { method: 'POST' });
				const json = await res.json();
				alert(`✅ ${json.inserted} posts geïmporteerd!`);
				location.reload();
			}}
			class="mb-8 w-full rounded bg-[#2c333c] px-4 py-3 font-bold text-white transition-all hover:bg-purple-500"
		>
			Importeer Markdown Posts
		</button>

		<h1 class="mb-6 text-center text-2xl font-bold text-[#1b1e28]">Admin: Blogposts beheren</h1>

		<ul class="space-y-4">
			{#each data.posts as post}
				<li class="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 shadow-sm">
					<div>
						<div class="font-semibold text-[#1b1e28]">{post.title}</div>
						<div class="text-xs text-gray-500">
							Gepubliceerd op {new Date(post.createdAt).toLocaleDateString()}
						</div>
					</div>

					{#if post.mailed}
						<span class="text-sm font-semibold text-green-600">✔ al gemaild</span>
					{:else}
						<button
							onclick={() => mail(post.id)}
							class="rounded bg-purple-500 px-4 py-2 font-bold text-white transition-all hover:bg-purple-700"
						>
							Mail subscribers
						</button>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</main>
