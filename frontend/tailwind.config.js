/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", 
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
    './public/**/*.html',
    './public/**/*.js',
    './public/**/*.css',
    '*.html',
    '*.astro',
  ],
  theme: {
      extend: {
          screens: {
            '2xs': { 'min': '0px', 'max': '319px' },
            'xs': { 'min': '320px', 'max': '359px' },
            'ls': { 'min': '360px', 'max': '399px' }, 
            'ms': { 'min': '400px', 'max': '424px' },
            'ss': { 'min': '425px', 'max': '549px' },
            's': { 'min': '550px', 'max': '639px' },
          },
          borderRadius: {
              lg: '50px',
              md: '30px',
              sm: '10px'
          },
          colors: {
              background: 'hsl(var(--background))',
              foreground: 'hsl(var(--foreground))',
              card: {
                  DEFAULT: 'hsl(var(--card))',
                  foreground: 'hsl(var(--card-foreground))'
              },
              popover: {
                  DEFAULT: 'hsl(var(--popover))',
                  foreground: 'hsl(var(--popover-foreground))'
              },
              primary: {
                  DEFAULT: 'hsl(var(--primary))',
                  foreground: 'hsl(var(--primary-foreground))'
              },
              secondary: {
                  DEFAULT: 'hsl(var(--secondary))',
                  foreground: 'hsl(var(--secondary-foreground))'
              },
              muted: {
                  DEFAULT: 'hsl(var(--muted))',
                  foreground: 'hsl(var(--muted-foreground))'
              },
              accent: {
                  DEFAULT: 'hsl(var(--accent))',
                  foreground: 'hsl(var(--accent-foreground))'
              },
              destructive: {
                  DEFAULT: 'hsl(var(--destructive))',
                  foreground: 'hsl(var(--destructive-foreground))'
              },
              border: 'hsl(var(--border))',
              input: 'hsl(var(--input))',
              ring: 'hsl(var(--ring))',
              chart: {
                  '1': 'hsl(var(--chart-1))',
                  '2': 'hsl(var(--chart-2))',
                  '3': 'hsl(var(--chart-3))',
                  '4': 'hsl(var(--chart-4))',
                  '5': 'hsl(var(--chart-5))'
              }
          },
        keyframes: {
            bounce: {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-10px)' },
            },
            grow: {
              '0%': { transform: 'scale(1)' },
              '100%': { transform: 'scale(1.1)' },
            },
            shrink: {
              '0%': { transform: 'scale(1.1)' },
              '100%': { transform: 'scale(1)' },
            },
        },
        animation: {
            bounce: 'bounce 1s infinite',
            grow: 'grow 0.3s ease-in-out forwards',
            shrink: 'shrink 0.3s ease-in-out forwards',
        },
        keyframes: {
          fadeInUp: {
            '0%': {
              opacity: '0',
              transform: 'translateY(30px)',
            },
            '100%': {
              opacity: '1',
              transform: 'translateY(0)',
            },
          },
          fadeOutDown: {
            '0%': {
              opacity: '1',
              transform: 'translateY(0)',
            },
            '100%': {
              opacity: '0',
              transform: 'translateY(30px)',
            },
          },
        },
        animation: {
          fadeInUp: 'fadeInUp 0.5s ease forwards',
          fadeOutDown: 'fadeOutDown 0.5s ease forwards',
        },
      },
  },
  variants: {
    extend: {
      animation: ['hover'],
    },
  },
  plugins: [require("tailwindcss-animate", "@tailwindcss/typography")],
};