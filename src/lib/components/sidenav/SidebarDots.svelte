<script lang="ts">
	import { getSidebarIsOpen } from '$lib/state.svelte';

	function toggleSidebarOpen() {
		getSidebarIsOpen().toggle();
	}
</script>

<button
	aria-label="side-menu-button"
	onclick={toggleSidebarOpen}
	class="fixed top-1/2 -left-2 z-50 h-5 -translate-y-1/2 rounded p-1 text-slate-100"
>
	<svg
		class="z-50 flex justify-center"
		id="dots-svg"
		xmlns="http://www.w3.org/2000/svg"
		width="40"
		height="40"
		viewBox="0 0 20 20"
	>
		<g fill="currentColor">
			<circle class="dot" cx="10" cy="15" r="1.5" />
			<circle class="dot" cx="10" cy="10" r="1.5" />
			<circle class="dot" cx="10" cy="5" r="1.5" />
		</g>
	</svg>
</button>
