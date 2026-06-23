import type { Config } from 'tailwindcss'

declare function require(name: string): unknown

export default <Config>{
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
  ],
  content: [
    'app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['DM Sans', 'Noto Sans SC', 'sans-serif'],
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        zinc: {
          css: {
            '--tw-prose-body': theme('colors.zinc[600]'),
            '--tw-prose-headings': theme('colors.zinc[900]'),
            '--tw-prose-code': theme('colors.zinc[800]'),
            fontSize: '1rem',
            lineHeight: '1.75',
            maxWidth: '72ch',
            p: {
              marginTop: '1em',
              marginBottom: '1em',
              lineHeight: '1.75',
            },
            'h2, h3, h4': {
              marginTop: '2em',
              marginBottom: '0.75em',
            },
            'h2 + p, h3 + p, h4 + p': {
              marginTop: '0.5em',
            },
            ul: {
              marginTop: '0.75em',
              marginBottom: '0.75em',
            },
            li: {
              marginTop: '0.25em',
              marginBottom: '0.25em',
            },
            'li::marker': {
              color: theme('colors.zinc[400]'),
            },
            code: {
              fontWeight: '500',
              fontSize: '0.875em',
              backgroundColor: theme('colors.zinc[100]'),
              padding: '0.2em 0.4em',
              borderRadius: '0.375rem',
              '&::before': { content: '""' },
              '&::after': { content: '""' },
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            a: {
              color: theme('colors.fuchsia[600]'),
              fontWeight: '500',
              textDecoration: 'none',
              borderBottom: '1px solid transparent',
              transition: 'border-color 0.2s',
              '&:hover': {
                borderColor: theme('colors.fuchsia[400]'),
              },
            },
          },
        },
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.zinc[600]'),
            '--tw-prose-headings': theme('colors.zinc[900]'),
            '--tw-prose-links': theme('colors.fuchsia[600]'),
            '--tw-prose-code': theme('colors.zinc[800]'),
          },
        },
      }),
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.6s ease both',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
}
