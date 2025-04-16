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
          tree: '#5C8A48', 
        },
      },
    },
    },
  plugins: [],
}
}
