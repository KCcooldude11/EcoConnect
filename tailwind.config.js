// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
      colors: {
        green: {
          tree: '#5C8A48', // Custom green-400 color
        },
      },
    },
    },
  plugins: [require('@tailwindcss/line-clamp')],
}
