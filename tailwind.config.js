/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
        extend: {
            flex: {
                4: '4 4 0%',
            },
            colors: {
                'purple-primary': '#9b4de0',
                'text-purple-hover': '#c273ed',
            },
            fontFamily: {
                inter: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            transitionEffect: {
                'scale-thumb': 'transform .7s',
            },
        },
    },
    plugins: [],
}
