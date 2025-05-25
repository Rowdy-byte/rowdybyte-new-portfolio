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

<main class="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 px-4 py-16 font-walsheim">
	<div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
		<section class="flex flex-col gap-6">
			{#if data?.user}
				<div class="mb-4">
					<h1 class="mb-1 text-2xl font-bold text-[#1b1e28]">Hi, {data.user.username}!</h1>
					<p class="text-xs text-gray-500">Your user ID: {data.user.id}.</p>
				</div>
				<form method="post" action="?/logout" use:enhance>
					<button class="w-full rounded bg-[#2c333c] px-4 py-3 font-bold text-white transition-all hover:bg-purple-500">Sign out</button>
				</form>
			{:else}
				<p class="text-center text-gray-500">Not logged in</p>
			{/if}
		</section>
	</div>
</main>
