export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: 'rgb(var(--bg) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        cream: 'rgb(var(--cream) / <alpha-value>)',
        wine: 'rgb(var(--primary) / <alpha-value>)',
        gold: 'rgb(var(--accent) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 40px rgba(185, 128, 75, 0.2)',
        soft: '0 14px 40px -16px rgba(92, 61, 46, 0.25)'
      }
    }
  },
  plugins: []
}
