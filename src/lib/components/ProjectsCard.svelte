<script lang="ts">
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	export let href = '';
	export let target = '_blank';
	export let rel = 'noopener noreferrer';
	export let cardClass = '';
	export let contentClass = '';

	let cardEl: HTMLElement;
	let contentEl: HTMLElement;

	function handleMouseMove(e: MouseEvent) {
		const rect = cardEl.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const rotateY = ((x - centerX) / centerX) * 10;
		const rotateX = -((y - centerY) / centerY) * 10;
		gsap.to(cardEl, { rotateY, rotateX, scale: 1.04, duration: 0.3, ease: 'power2.out' });
	}

	function handleMouseLeave() {
		gsap.to(cardEl, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.4, ease: 'power2.inOut' });
	}

	onMount(() => {
		gsap.fromTo(
			cardEl,
			{ opacity: 0, y: 60, scale: 0.92 },
			{ opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.7)' }
		);
	});
</script>

<a
	bind:this={cardEl}
	{href}
	{target}
	{rel}
	class={cardClass}
	on:mousemove={handleMouseMove}
	on:mouseleave={handleMouseLeave}
>
	<div bind:this={contentEl} class={contentClass}>
		<slot />
	</div>
</a>
