<script lang="ts">
	import { page } from '$app/state';

	const pathname = page.url.pathname;
	const path = pathname.split('/');
	const segment = path[path.length - 1];
	const navigateToPath = pathname.replace(`/${segment}`, '') || '/';
</script>

<main
	class="font-walsheim flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 px-4 py-16"
>
	{#if page.status === 404}
		<div class="flex w-full max-w-md flex-col items-center rounded-2xl bg-white p-8 shadow-xl">
			<h1 class="mb-2 text-5xl font-bold text-purple-500">404</h1>
			<h2 class="mb-2 text-2xl font-bold text-[#1b1e28]">You must be lost...</h2>
			<p class="mb-6 text-center text-gray-500">Page doesn't exist.</p>
			<a
				class="rounded bg-[#2c333c] px-6 py-3 font-bold text-white transition-all hover:bg-purple-500"
				href={navigateToPath}>Go back</a
			>
		</div>
	{:else if page.status === 500}
		<div class="flex w-full max-w-md flex-col items-center rounded-2xl bg-white p-8 shadow-xl">
			<h1 class="mb-2 text-5xl font-bold text-purple-500">500</h1>
			<h2 class="mb-2 text-2xl font-bold text-[#1b1e28]">Whoops. We weren't expecting that.</h2>
			<p class="mb-6 text-center text-gray-500">We're investigating the issue.</p>
			<a
				class="rounded bg-[#2c333c] px-6 py-3 font-bold text-white transition-all hover:bg-purple-500"
				href="/">Go home</a
			>
		</div>
	{:else}
		<div class="flex w-full max-w-md flex-col items-center rounded-2xl bg-white p-8 shadow-xl">
			<h1 class="mb-2 text-5xl font-bold text-purple-500">{page.status}</h1>
			<h2 class="mb-2 text-2xl font-bold text-[#1b1e28]">Something went wrong.</h2>
			<p class="mb-6 text-center text-gray-500">Onbekende fout.</p>
			<a
				class="rounded bg-[#2c333c] px-6 py-3 font-bold text-white transition-all hover:bg-purple-500"
				href="/">Go home</a
			>
		</div>
	{/if}
</main>
