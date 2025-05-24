<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<main class="flex h-screen flex-col items-center justify-center font-walsheim">
	<h1>Login/Register</h1>
	<form method="post" action="?/login" use:enhance class="flex flex-col gap-4">
		<input name="username" placeholder="username" class="p-2" />

		<input type="password" name="password" placeholder="password" class="p-2" />

		<button class="border p-2 font-normal">Login</button>
		<button formaction="?/register" class="border p-2 font-normal">Register</button>
	</form>
	<p style="color: red">{form?.message ?? ''}</p>
</main>
