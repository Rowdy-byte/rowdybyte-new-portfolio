import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import { remarkHeaders } from './remark-headers.js';
import rehypeSlug from 'rehype-slug';
import path from 'path';


// Create a shared highlighter instance
let shikiHighlighter;
const getHighlighter = async () => {
	if (!shikiHighlighter) {
		shikiHighlighter = await createHighlighter({
			themes: ['poimandres'],
			langs: ['javascript', 'typescript', 'svelte', 'css', 'scss', 'html', 'bash']
		});
	}
	return shikiHighlighter;
};

const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	remarkPlugins: [remarkHeaders],
	rehypePlugins: [rehypeSlug],
	smartypants: { quotes: true },
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await getHighlighter();
			let html = highlighter.codeToHtml(code, { lang, theme: 'poimandres' });

			html = html.replace('tabindex="0"', 'tabindex="-1"');
			html = escapeSvelte(html);

			return `
			<div class="wrapper">
				<div class="pre-header">
					<button id="clipboardBtn" tabindex="-1" aria-label="copy-to-clipboard" class="copy-button">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard">
							<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
							<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
						</svg>
					</button>
				</div>
				${html}
			</div>
			`;
		}
	}
};

const config = {
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	extensions: ['.svelte', '.md', '.svx'],
	kit: {
		adapter: adapter({
			includeFiles: ['src/content/posts/**/*'],
			runtime: 'nodejs22.x'
		}),
		alias: {
			$posts: path.resolve('./src/content/posts')
		}
	}
};

export default config;
