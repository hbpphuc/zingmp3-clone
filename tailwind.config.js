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
            backgroundColor: {
                'active-song': '#ffffff26',
            },
            keyframes: {
                'rotate-center': {
                    '0%': {
                        '-webkit-transform': 'rotate(0)',
                        transform: 'rotate(0)',
                    },
                    '100%': {
                        '-webkit-transform': 'rotate(360deg)',
                        transform: 'rotate(360deg)',
                    },
                },
                'rotate-center-pause': {
                    '0%': {
                        '-webkit-transform': 'rotate(360deg)',
                        transform: 'rotate(360deg)',
                    },
                    '100%': {
                        '-webkit-transform': 'rotate(0deg)',
                        transform: 'rotate(0deg)',
                    },
                },
            },
            animation: {
                'rotate-center': 'rotate-center 20s linear infinite',
                'rotate-center-pause': 'rotate-center 5s linear infinite',
            },
        },
    },
    plugins: [],
}
