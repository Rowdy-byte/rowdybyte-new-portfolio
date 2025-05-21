import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/**/*.{html,js,svelte,ts}',
    ],
    theme: {
        extend: {
            fontFamily: {
                walsheim: ['gt walsheim pro'],
            },
        },
    },
    plugins: [],
}

export default config;
