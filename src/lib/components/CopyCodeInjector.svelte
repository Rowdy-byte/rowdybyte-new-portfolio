<script lang="ts">
	import type { Snippet } from 'svelte';

	import { animate } from '$lib/animate';
	import gsap from 'gsap';

	import { onDestroy, onMount, tick } from 'svelte';

	let { children } = $props<{ children: Snippet }>();

	let showToast = $state(false);
	let toastElement: HTMLElement | undefined = $state();
	let container: HTMLElement | undefined = $state();

	let toastTimeout: ReturnType<typeof setTimeout> | undefined;

	const hideToast = () => {
		if (toastTimeout) {
			clearTimeout(toastTimeout);
			toastTimeout = undefined;
		}

		if (!toastElement) {
			showToast = false;
			return;
		}

		gsap.to(toastElement, {
			duration: 0.5,
			scale: 0,
			opacity: 0,
			ease: 'power2.in',
			onComplete: () => {
				showToast = false;
				toastElement = undefined;
			}
		});
	};

	const handleCopyClick = async (event: Event) => {
		const target = event.target as HTMLElement | null;
		if (!target) return;

		const button = target.closest('[aria-label="copy-to-clipboard"]');
		if (!button || !container?.contains(button)) return;

		const preElement = button.closest('.wrapper')?.querySelector('pre');
		if (!preElement) return;

		const code = preElement.textContent?.trim();
		if (!code) return;

		try {
			if (!navigator.clipboard?.writeText) {
				throw new Error('Clipboard API unavailable');
			}
			await navigator.clipboard.writeText(code);
		} catch (error) {
			console.error('Failed to copy code block', error);
			return;
		}

		if (toastTimeout) {
			clearTimeout(toastTimeout);
		}

		showToast = true;
		await tick();

		if (toastElement) {
			gsap.fromTo(
				toastElement,
				{ scale: 0, opacity: 0 },
				{ duration: 0.5, scale: 1, opacity: 1, ease: 'power2.out' }
			);
		}

		toastTimeout = setTimeout(() => {
			hideToast();
		}, 2000);
	};

	onMount(() => {
		const node = container;
		if (!node) {
			return;
		}

		node.addEventListener('click', handleCopyClick);

		return () => {
			node.removeEventListener('click', handleCopyClick);
		};
	});

	onDestroy(() => {
		if (toastTimeout) {
			clearTimeout(toastTimeout);
			toastTimeout = undefined;
		}
		showToast = false;
		toastElement = undefined;
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
		role="status"
		aria-live="polite"
		class="fixed left-1/2 top-16 z-[99999999999] -translate-x-1/2 rounded bg-purple-500 px-5 py-3 text-center text-sm font-semibold text-[#1b1e28] shadow-lg"
	>
		Successfully copied code!
	</p>
{/if}

<div bind:this={container}>
	{@render children()}
</div>
