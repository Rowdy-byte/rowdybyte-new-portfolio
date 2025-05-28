    ## Sveltekit

    RowdyByte is built with SvelteKit. SvelteKit is a modern meta-framework that is user-friendly and versatile. It provides a full-stack solution with state management, reactivity, routing, and animations right out of the box.

    <br>
    <br>


    ## Vite

    I created a new SvelteKit project using Vite. Vite is a modern JavaScript bundler that enhances the development experience. The Vite development server features Hot Module Replacement (HMR), which significantly improves the development workflow.

    <br>
    <br>

    ## Package Manager

    I have chosen pnpm as my package manager instead of npm. This choice allows for a notably faster installation process, as pnpm avoids redundant downloads by reusing previously installed packages.

    <br>

```bash
pnpx sv create rowdy-byte-portfolio
```

    <br>

    After executing the command, I selected the SvelteKit barebones skeleton project with TypeScript, Prettier, and ESLint. JavaScript is a dynamically typed language, allowing data types to be reassigned. TypeScript offers type safety and autocompletion, enhancing code quality. Prettier is employed for code formatting, while ESLint is utilized for code linting.

    <br>

```bash

pnpx sv create svelte
┌  Welcome to the Svelte CLI! (v0.6.2)
│
◇  Which template would you like?
│  SvelteKit minimal
│
◇  Add type checking with Typescript?
│  Yes, using Typescript syntax
│
◆  Project created
│
◆  What would you like to add to your project? (use arrow keys / space bar)
│  ◼ prettier
│  ◼ eslint
│  ◻ vitest
│  ◻ playwright
│  ◼ tailwindcss
│  ◼ drizzle
│  ◼ lucia
│  ◼ mdsvex
│  ◼ paraglide
│  ◼ storybook (https://storybook.js.org)
```

<br>

```bash
cd rowdy-byte-portfolio
```

    <br>
    <br>


    ## Github

    Following a successful installation, I will create a new GitHub repository.

    <br>

    ###### create new repository

```bash
git init
```

    <br>

    Then I have established a main branch and a development branch. New features are initially developed on the development branch. Once everything is confirmed to be functioning correctly, I will merge the branches.

    <br>
    <br>


     ## Tailwind

    I considered using Tailwind CSS for styling due to its utility-first approach, which facilitates rapid UI development. Tailwind allows me to create custom designs directly within my HTML, enhancing productivity and efficiency. It also provides a responsive design system that is highly customizable.

    <br>

```svelte
<!-- utility class -->

<p class="max-w-lg scale-0 text-xs font-normal text-slate-100">
	{projectsText.toUpperCase()}
</p>
```

    <br>


    ## Customizing Tailwind

    In the `tailwind.config.ts` file I added custom fonts and custom box-shadows. I will use this later for side navigation, contact card and login & register buttons.

    <br>

    ```svelte

    theme: {
    	extend: {
    		boxShadow: {
    			'custom-sidebar': `
    		  inset 0 0 0px 0px #a855f7,
    		  inset 0 0 0px #a855f7,
    		  inset 0 0 0px #a855f7,
    		  inset 0 0 0px #0ff,
    		  5px 0 500px #a855f7,
    		  -50px 0 500px #10b981
    		`
    		},

    		keyframes: {
    			'text-legendary': {
    				'0%, 100%': { backgroundPosition: '0% 50%' },
    				'50%': { backgroundPosition: '100% 50%' },
    			},
    		},
    		animation: {
    			'text-legendary': 'text-legendary 6s infinite',
    		},
    		fontFamily: {
    			montserrat: ['montserrat', 'sans-serif'],
    			walsheim: ['gt walsheim pro'],
    			roboto: ['roboto'],
    			ocr: ['ocr-b'],
    		},
    		screens: {
    			'fullscreen': { 'raw': '(min-width: 1920px) and (min-height: 1080px)' },
    		},
    	},
    },

````

    <br>

    Next, I installed MDsveX to enable the use of Svelte components within markdown files. Additionally, I installed Shiki for syntax highlighting. I imported `createHighlighter()` from Shiki and provided an object as an argument containing the desired themes and language properties.

    <br tabIndex="-1">

```svelte
<!-- svelte.config.js -->

let highlighter;

(async () => {
	const theme = 'poimandres';
	highlighter = await createHighlighter({
		themes: [theme],
		langs: ['javascript', 'typescript', 'svelte', 'css', 'scss', 'html', 'bash']
	});
})();
````
