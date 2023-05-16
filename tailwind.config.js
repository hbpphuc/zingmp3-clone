/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
        extend: {
            flex: {
                4: '4 4 0%',
                6: '6 6 0%',
            },
            colors: {
                'purple-primary': '#9b4de0',
                'text-purple-hover': '#c273ed',
            },
            fontFamily: {
                inter: ['Inter', ...defaultTheme.fontFamily.sans],
                roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
            },
            transitionEffect: {
                'scale-thumb': 'transform .7s',
            },
            backgroundColor: {
                'active-song': '#ffffff26',
                'zingchart-text':
                    'radial-gradient(50% 124.93% at 95.86% -10%,#3efad9 0,hsla(0,0%,100%,0) 100%),linear-gradient(91.56deg,#ff9357 1.54%,#9100ff 98.71%);',
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
                'scale-image': {
                    '0%': {
                        '-webkit-transform': 'scale(1)',
                        transform: 'scale(1)',
                    },
                    '100%': {
                        '-webkit-transform': 'scale(1.1)',
                        transform: 'scale(1.1)',
                    },
                },
                'unscale-image': {
                    '0%': {
                        '-webkit-transform': 'scale(1.1)',
                        transform: 'scale(1.1)',
                    },
                    '100%': {
                        '-webkit-transform': 'scale(1)',
                        transform: 'scale(1)',
                    },
                },
            },
            animation: {
                'rotate-center': 'rotate-center 20s linear infinite',
                'rotate-center-pause': 'rotate-center-pause 5s linear 1 both',
                'scale-image': 'scale-image 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
                'unscale-image': 'unscale-image 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
            },
        },
    },
    plugins: [],
}
