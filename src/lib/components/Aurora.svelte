<script lang="ts">
</script>

<div class="pointer-events-none absolute inset-0 z-0 overflow-hidden">
	<div class="aurora-shape aurora1"></div>
	<div class="aurora-shape aurora2"></div>
	<div class="aurora-shape aurora3"></div>
</div>

<style>
	.aurora-shape {
		position: absolute;
		border-radius: 9999px;
		filter: blur(48px);
		opacity: 0.55;
		mix-blend-mode: lighten;
		animation: aurora-move 12s ease-in-out infinite alternate;
	}
	.aurora1 {
		width: 60vw;
		height: 32vw;
		left: -10vw;
		top: 0;
		background: linear-gradient(120deg, #60a5fa 0%, #a21caf 100%);
		animation-delay: 0s;
	}
	.aurora2 {
		width: 50vw;
		height: 28vw;
		right: -12vw;
		bottom: 0;
		background: linear-gradient(100deg, #f472b6 0%, #facc15 100%);
		animation-delay: 2s;
	}
	.aurora3 {
		width: 40vw;
		height: 24vw;
		left: 20vw;
		bottom: -8vw;
		background: linear-gradient(90deg, #4ade80 0%, #38bdf8 100%);
		animation-delay: 4s;
	}
	@keyframes aurora-move {
		0% {
			transform: translateY(0) scale(1) rotate(0deg);
		}
		100% {
			transform: translateY(-40px) scale(1.08) rotate(8deg);
		}
	}
</style>
