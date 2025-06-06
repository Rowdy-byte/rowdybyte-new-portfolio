<script lang="ts">
	import Contact from '$lib/components/Contact.svelte';
	import HardSkills from '$lib/components/HardSkills.svelte';
	import ImproveSkills from '$lib/components/ImproveSkills.svelte';
	import Intro from '$lib/components/Intro.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Socials from '$lib/components/Socials.svelte';
	import SoftSkills from '$lib/components/SoftSkills.svelte';
	import Lightning2 from '$lib/components/Lightning2.svelte';

	let { data } = $props();
	console.log('Page data:', data);
</script>

<Intro blogPostsCount={data.posts.length} docsCount={data.headers.length} />
<Socials />
<HardSkills />
<SoftSkills />
<ImproveSkills />
<Projects />
<Carousel />
<Contact />
