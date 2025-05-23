<script lang="ts">
	// 20 bubbles with different gradients, sizes, and positions
	const bubbles = [
		{ size: 48, x: '3%', y: '10%', gradient: ['from-pink-400', 'to-yellow-300'] },
		{ size: 36, x: '18%', y: '5%', gradient: ['from-blue-400', 'to-cyan-300'] },
		{ size: 64, x: '80%', y: '8%', gradient: ['from-purple-400', 'to-pink-400'] },
		{ size: 40, x: '95%', y: '20%', gradient: ['from-green-400', 'to-teal-300'] },
		{ size: 28, x: '5%', y: '70%', gradient: ['from-yellow-400', 'to-orange-300'] },
		{ size: 52, x: '40%', y: '80%', gradient: ['from-fuchsia-400', 'to-pink-300'] },
		{ size: 38, x: '70%', y: '60%', gradient: ['from-indigo-400', 'to-blue-300'] },
		{ size: 56, x: '90%', y: '90%', gradient: ['from-emerald-400', 'to-lime-300'] },
		{ size: 32, x: '1%', y: '90%', gradient: ['from-rose-400', 'to-pink-400'] },
		{ size: 44, x: '15%', y: '95%', gradient: ['from-sky-400', 'to-blue-300'] },
		{ size: 30, x: '30%', y: '97%', gradient: ['from-orange-400', 'to-amber-300'] },
		{ size: 60, x: '50%', y: '92%', gradient: ['from-violet-400', 'to-purple-300'] },
		{ size: 34, x: '65%', y: '98%', gradient: ['from-cyan-400', 'to-blue-300'] },
		{ size: 42, x: '85%', y: '80%', gradient: ['from-lime-400', 'to-green-300'] },
		{ size: 50, x: '99%', y: '60%', gradient: ['from-pink-400', 'to-fuchsia-300'] },
		{ size: 36, x: '10%', y: '40%', gradient: ['from-yellow-400', 'to-amber-300'] },
		{ size: 28, x: '85%', y: '2%', gradient: ['from-blue-400', 'to-indigo-300'] },
		{ size: 54, x: '60%', y: '35%', gradient: ['from-teal-400', 'to-cyan-300'] },
		{ size: 40, x: '35%', y: '20%', gradient: ['from-rose-400', 'to-pink-300'] },
		{ size: 48, x: '55%', y: '50%', gradient: ['from-emerald-400', 'to-lime-300'] }
	];
</script>

<div class="pointer-events-none absolute inset-0 z-0 mx-auto max-w-3xl">
	{#each bubbles as bubble, i}
		<div
			class={`animate-bubble absolute rounded-full bg-gradient-to-br opacity-60 blur-lg ${bubble.gradient[0]} ${bubble.gradient[1]}`}
			style="
				width: {bubble.size}px;
				height: {bubble.size}px;
				left: {bubble.x};
				top: {bubble.y};
			"
		></div>
	{/each}
</div>

<style>
	@keyframes bubble {
		0%,
		100% {
			transform: translateY(0) scale(1);
		}
		50% {
			transform: translateY(-16px) scale(1.08);
		}
	}
	.animate-bubble {
		animation: bubble 6s ease-in-out infinite;
	}
</style>
