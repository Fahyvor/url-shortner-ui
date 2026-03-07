/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        elrey: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          primary: '#0F172A',  
          accent: '#633f33',  
          muted: '#64748B',    
          border: '#E2E8F0', 
        }
      },
      // ADD THIS:
      transitionTimingFunction: {
        'sleek': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
      }
    },
  },
  plugins: [],
}