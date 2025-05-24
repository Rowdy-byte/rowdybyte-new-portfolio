<script lang="ts">
	import { enhance } from '$app/forms';

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

<main class="mx-auto flex max-w-[650px] flex-col px-4 pb-20 pt-40 font-walsheim">
	<section class="mb-10 flex flex-col gap-4">
		{#if data?.user}
			<div>
				<h1 class="text-2xl">Hi, {data.user.username}!</h1>
				<p class="text-xs">Your user ID: {data.user.id}.</p>
			</div>
			<form method="post" action="?/logout" use:enhance>
				<button class="mb-6 bg-gray-500 p-4 py-2 text-white hover:bg-gray-700">Sign out</button>
			</form>
		{:else}
			<p>Not logged in</p>
		{/if}
	</section>
</main>
