/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0c10',
        surface: '#12151f',
        accent: '#7c3aed',
        success: '#10b981',
        warning: '#f59e0b',
        muted: '#6b7280'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 10px 60px rgba(124, 58, 237, 0.2)'
      }
    }
  },
  plugins: []
};
