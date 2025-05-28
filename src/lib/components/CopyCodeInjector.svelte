<script lang="ts">
	import type { Snippet } from 'svelte';

	import { animate } from '$lib/animate';
	import gsap from 'gsap';

	import { onDestroy } from 'svelte';

	let { children } = $props<{ children: Snippet }>();

	let showToast = $state(false);

	let toastElement: HTMLElement | undefined = $state();

	$effect(() => {
		let buttons = document.querySelectorAll('#clipboardBtn');

		buttons.forEach((button) => {
			button.addEventListener('click', () => {
				const preElement = button.closest('.wrapper')?.querySelector('pre');

				if (preElement) {
					const codeElement = preElement as HTMLElement;
					const code = codeElement.innerText;

					navigator.clipboard.writeText(code.trim()).then(() => {
						showToast = true;

						if (toastElement) {
							gsap.from(toastElement, {
								duration: 0.5,
								scale: 0,
								opacity: 0,
								ease: 'power2.out'
							});
						}

						setTimeout(() => {
							hideToast();
						}, 2000);
					});
				}
			});
		});
	});

	const hideToast = () => {
		if (toastElement) {
			gsap.to(toastElement, {
				duration: 0.5,
				scale: 0,
				opacity: 0,
				ease: 'power2.in',
				onComplete: () => {
					showToast = false;
				}
			});
		}
	};

	onDestroy(() => {
		let buttons = document.querySelectorAll('#clipboardBtn');
		buttons.forEach((button) => {
			button.removeEventListener('click', () => {});
		});
	});
</script>

{#if showToast}
	<p
		use:animate={[
			{
				type: 'from',
				duration: 0.5,
				scale: 0,
				opacity: 0,
				ease: 'power2.out'
			},
			{
				type: 'to',
				duration: 1,
				scale: 1,
				opacity: 1,
				ease: 'power2.out'
			}
		]}
		bind:this={toastElement}
		class="sticky top-1/2 left-2 z-[99999999999] mx-auto mr-6 ml-6 rounded bg-purple-500 p-4 text-center text-sm font-semibold text-[#1b1e28]"
	>
		Successfully copied code!
	</p>
{/if}

{@render children()}
