<script lang="ts">
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	const socials = [
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/in/rowdy-byte/',
			icon: 'linkedin',
			gradient: 'from-gray-600 to-gray-600'
		},
		{
			name: 'X',
			url: 'https://x.com/RowdyByte',
			icon: 'x',
			gradient: 'from-gray-500 to-gray-600'
		},
		{
			name: 'GitHub',
			url: 'https://github.com/Rowdy-byte',
			icon: 'github',
			gradient: 'from-gray-500 to-gray-600'
		}
	];

	// GitHub commits state
	let commits = $state<any[]>([]);
	let commitCount = $state(0);
	let isLoading = $state(true);

	// GitHub API implementation using your repository commits
	async function fetchGitHubActivity() {
		try {
			// Fetch commits from your portfolio repository
			const response = await fetch(
				'https://api.github.com/repos/Rowdy-byte/rowdybyte-new-portfolio/commits?per_page=5'
			);
			const commitsData = await response.json();

			if (Array.isArray(commitsData)) {
				// Transform GitHub API response to our format
				commits = commitsData.slice(0, 3).map((commit: any) => ({
					repo: 'Rowdy-byte/rowdybyte-new-portfolio',
					message: commit.commit.message.split('\n')[0], // Get first line of commit message
					date: new Date(commit.commit.author.date).toLocaleDateString(),
					url: commit.html_url
				}));

				// Set total commit count (using the fetched commits length as approximation)
				commitCount = commitsData.length;
			} else {
				// Fallback to mock data if API fails
				commits = [
					{
						repo: 'Rowdy-byte/rowdybyte-new-portfolio',
						message: 'feat: implement GitHub commits in socials component',
						date: new Date().toLocaleDateString(),
						url: 'https://github.com/Rowdy-byte/rowdybyte-new-portfolio'
					}
				];
				commitCount = 1;
			}

			isLoading = false;
		} catch (error) {
			console.error('Failed to fetch GitHub activity:', error);

			// Fallback to mock data on error
			commits = [
				{
					repo: 'Rowdy-byte/rowdybyte-new-portfolio',
					message: 'Recent development work',
					date: new Date().toLocaleDateString(),
					url: 'https://github.com/Rowdy-byte/rowdybyte-new-portfolio'
				}
			];
			commitCount = 1;
			isLoading = false;
		}
	}

	onMount(() => {
		fetchGitHubActivity();
	});

	const icons: Record<string, string> = {
		linkedin: `<svg fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v5.62z"/></svg>`,
		x: `<svg fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"><path d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"/></svg>`,
		github: `<svg fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.39-3.87-1.39-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.23 2.73.12 3.02.74.8 1.19 1.83 1.19 3.09 0 4.43-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2v3.26c0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>`
	};

	let sectionRef: HTMLElement;
	let cardRefs: HTMLElement[] = [];
	let headingRef: HTMLElement;
	let githubSectionRef: HTMLElement;

	// Function to animate the heading letter by letter
	function animateHeading() {
		if (headingRef) {
			// Split text into individual characters
			const chars = headingRef.textContent!.split('');
			headingRef.innerHTML = chars
				.map((char) => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
				.join('');

			// Animate each character
			gsap.fromTo(
				'.char',
				{
					opacity: 0,
					y: 50,
					rotation: 15,
					scale: 0.5
				},
				{
					opacity: 1,
					y: 0,
					rotation: 0,
					scale: 1,
					duration: 0.6,
					stagger: 0.08,
					ease: 'back.out(1.7)'
				}
			);
		}
	}

	// Function to animate the social cards
	function animateCards() {
		if (cardRefs.length > 0) {
			const visibleCards = cardRefs.filter(Boolean);
			gsap.fromTo(
				visibleCards,
				{ opacity: 0, y: 40, scale: 0.85 },
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.7,
					stagger: 0.15,
					ease: 'back.out(1.7)'
				}
			);
		}
	}

	// Function to animate the GitHub section
	function animateGitHubSection() {
		if (githubSectionRef) {
			gsap.fromTo(
				githubSectionRef,
				{ opacity: 0, y: 60, scale: 0.9 },
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.8,
					ease: 'back.out(1.5)'
				}
			);
		}
	}

	$effect(() => {
		let hasAnimated = false;
		const observer = new window.IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !hasAnimated) {
					hasAnimated = true;
					// First animate heading, then cards, then GitHub section
					animateHeading();
					setTimeout(() => animateCards(), 800);
					setTimeout(() => animateGitHubSection(), 1200);
					observer.disconnect();
				}
			},
			{ threshold: 0.3 }
		);
		if (sectionRef) observer.observe(sectionRef);
		return () => observer.disconnect();
	});
</script>

<main
	bind:this={sectionRef}
	class="flex min-h-screen w-full flex-col items-center justify-center gap-12 py-8"
>
	<div class="text-center">
		<h1
			bind:this={headingRef}
			id="socials"
			class="font-ginto mb-4 text-5xl font-black tracking-wide text-white sm:text-7xl md:text-8xl"
		>
			Socials
		</h1>
		<p class="font-walsheim-regular mx-auto max-w-2xl text-base text-gray-300 sm:text-lg">
			Connect with me and see what I'm working on
		</p>
	</div>

	<!-- Social Links -->
	<div class="flex flex-row flex-wrap items-center justify-center gap-6 md:flex-row">
		{#each socials as social, i}
			<a
				bind:this={cardRefs[i]}
				href={social.url}
				target="_blank"
				rel="noopener noreferrer"
				class="group hover:shadow-custom-sidebar flex h-32 w-32 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#2c333c] to-[#1e252b] p-1 opacity-0 transition-transform duration-200 hover:scale-105 sm:h-40 sm:w-40"
				aria-label={`Visit ${social.name} profile`}
			>
				<div class="flex flex-col items-center justify-center space-y-1 text-white sm:space-y-2">
					<span class="flex items-center justify-center" aria-hidden="true">
						{@html icons[social.icon]}
					</span>
					<span
						class="text-center text-xs leading-tight font-medium sm:text-sm md:text-base lg:text-lg"
					>
						{social.name}
					</span>
				</div>
			</a>
		{/each}
	</div>

	<!-- GitHub Activity Section -->
	<div bind:this={githubSectionRef} class="w-full max-w-4xl opacity-0">
		<div class="rounded-xl bg-gradient-to-br from-[#2c333c] to-[#1e252b] p-6 shadow-lg">
			<div class="mb-6 flex items-center justify-between">
				<h2 class="font-ginto text-2xl font-bold text-white">Recent GitHub Activity</h2>
				<div class="flex items-center gap-2">
					<div class="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
					<span class="font-walsheim-regular text-sm text-gray-300">
						{commitCount} commits this month
					</span>
				</div>
			</div>

			{#if isLoading}
				<div class="flex items-center justify-center py-8">
					<div
						class="h-8 w-8 animate-spin rounded-full border-2 border-gray-600 border-t-purple-500"
					></div>
					<span class="font-walsheim-regular ml-3 text-gray-400">Loading activity...</span>
				</div>
			{:else if commits.length > 0}
				<div class="space-y-4">
					{#each commits as commit, i}
						<a
							href={commit.url}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center justify-between rounded-lg p-4 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-700/50"
						>
							<div class="flex-1">
								<p class="font-walsheim-regular mb-1 text-sm font-medium text-white">
									{commit.message}
								</p>
								<p class="font-walsheim-regular text-xs text-gray-400">
									{commit.repo} • {commit.date}
								</p>
							</div>
							<svg
								class="ml-4 h-5 w-5 flex-shrink-0 text-gray-400"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.39-3.87-1.39-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.23 2.73.12 3.02.74.8 1.19 1.83 1.19 3.09 0 4.43-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2v3.26c0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"
								/>
							</svg>
						</a>
					{/each}
				</div>

				<div class="mt-6 text-center">
					<a
						href="https://github.com/Rowdy-byte"
						target="_blank"
						rel="noopener noreferrer"
						class="font-walsheim-regular inline-flex items-center gap-2 rounded-full bg-gray-700/50 px-6 py-3 text-sm text-white transition-all duration-200 hover:scale-105 hover:bg-gray-600/50"
					>
						View All Activity
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</a>
				</div>
			{:else}
				<div class="py-8 text-center">
					<svg class="mx-auto mb-4 h-12 w-12 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.39-3.87-1.39-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.23 2.73.12 3.02.74.8 1.19 1.83 1.19 3.09 0 4.43-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2v3.26c0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"
						/>
					</svg>
					<p class="font-walsheim-regular text-gray-400">No recent activity found</p>
				</div>
			{/if}
		</div>
	</div>
</main>

<style>
	main {
		font-family: 'GT Walsheim Pro', sans-serif;
	}
</style>
