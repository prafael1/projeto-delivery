import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{js,jsx,ts,tsx}', // Inclui todos os arquivos do React no diretório `src`
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans], // Pode ser alterado conforme necessário
            },
        },
    },

    plugins: [forms, typography],
};
