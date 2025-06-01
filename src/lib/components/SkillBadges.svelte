<script lang="ts">
	import gsap from 'gsap';

	let sectionRef: HTMLElement;
	let badgeContainerRef: HTMLElement;
	let hasAnimated = false;

	function splitHeading(heading: string) {
		return heading.split('').map((char, i) => ({ char, i }));
	}
	const headingText = 'Skill Badges';
	let headingSpans: HTMLElement[] = [];

	function setHeadingRef(node: HTMLElement, index: number) {
		headingSpans[index] = node;
		return {};
	}

	function animateHeading() {
		gsap.fromTo(
			headingSpans.filter(Boolean),
			{ opacity: 0, y: 40 },
			{ opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: 'back.out(2)' }
		);
	}

	function animateBadges() {
		if (!hasAnimated && badgeContainerRef) {
			hasAnimated = true;
			const badgeElements = badgeContainerRef.querySelectorAll('.badge-container');
			
			gsap.fromTo(
				badgeElements,
				{ y: 60, opacity: 0, scale: 0.85 },
				{
					y: 0,
					opacity: 1,
					scale: 1,
					duration: 0.7,
					stagger: 0.2,
					ease: 'back.out(1.7)',
					onComplete: () => {
						// Add floating animation after initial reveal
						gsap.to(badgeElements, {
							y: '-=8',
							repeat: -1,
							yoyo: true,
							duration: 2,
							ease: 'sine.inOut',
							stagger: 0.3
						});
					}
				}
			);
		}
	}

	$effect(() => {
		if (!sectionRef) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					animateHeading();
					animateBadges();
				}
			},
			{ threshold: 0.2 }
		);
		observer.observe(sectionRef);
		return () => observer.disconnect();
	});
</script>

<main class="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-2 py-8">
	<section bind:this={sectionRef} id="skillbadges">
		<h1 class="heading mb-18 text-center text-6xl font-bold md:text-8xl">
			{#each splitHeading(headingText) as { char, i } (i)}
				<span use:setHeadingRef={i} style="display: inline-block"
					>{char === ' ' ? '\u00A0' : char}</span
				>
			{/each}
		</h1>
		<section bind:this={badgeContainerRef} class="flex flex-col items-center justify-center gap-8 md:flex-row">
			<div class="badge-container opacity-0 transform">
				<div
					class="credly-badge-wrapper"
					data-iframe-width="320"
					data-iframe-height="300"
					data-share-badge-id="ebc0ecf4-1f51-47bb-acf6-53d1e95b2f36"
					data-share-badge-host="https://www.credly.com"
				></div>
			</div>
			<div class="badge-container opacity-0 transform">
				<div
					class="credly-badge-wrapper"
					data-iframe-width="320"
					data-iframe-height="300"
					data-share-badge-id="c1bf739e-a54e-42f3-b200-c6d260f9f7ff"
					data-share-badge-host="https://www.credly.com"
				></div>
			</div>
		</section>

		<script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>
		<script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>
	</section>
</main>

<style>
	main {
		font-family: 'GT Walsheim Pro Regular', sans-serif;
	}

	.heading {
		font-family: 'GT Walsheim Pro', sans-serif;
	}

	.badge-container {
		transition: all 0.3s ease;
	}

	.badge-container:hover {
		transform: translateY(-4px);
	}

	.credly-badge-wrapper {
		background: rgba(44, 51, 60, 0.8);
		border-radius: 16px;
		padding: 16px;
		box-shadow: 
			0 4px 16px rgba(0, 0, 0, 0.12),
			0 0 0 1px rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition: all 0.3s ease;
	}

	.credly-badge-wrapper:hover {
		box-shadow: 
			0 8px 32px rgba(0, 0, 0, 0.18),
			0 0 0 1px rgba(255, 255, 255, 0.1),
			0 0 24px rgba(168, 85, 247, 0.15);
		border-color: rgba(168, 85, 247, 0.3);
		transform: scale(1.02);
	}

	/* Style the embedded iframe content */
	:global(.credly-badge-wrapper iframe) {
		border-radius: 12px !important;
		box-shadow: none !important;
		border: none !important;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.credly-badge-wrapper {
			padding: 12px;
		}
		
		:global(.credly-badge-wrapper iframe) {
			width: 280px !important;
			height: 260px !important;
		}
	}
</style>
