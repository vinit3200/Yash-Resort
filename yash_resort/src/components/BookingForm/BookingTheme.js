import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#f9f7f2' },
          100: { value: '#ede8d5' },
          200: { value: '#dfd9b8' },
          300: { value: '#d1ca9b' },
          400: { value: '#c3bb7e' },
          500: { value: '#b5ac61' },
          600: { value: '#918a4e' },
          700: { value: '#6d673a' },
          800: { value: '#484527' },
          900: { value: '#242213' },
        },
        luxury: {
          dark: { value: '#1a1a1a' },
          gold: { value: '#D4AF37' },
          goldLight: { value: '#E5C76B' },
          cream: { value: '#FDFBEE' },
          white: { value: '#FFFFFF' },
          muted: { value: '#718096' },
        },
      },
      fonts: {
        heading: { value: '"Playfair Display", serif' },
        body: { value: '"Inter", sans-serif' },
      },
      shadows: {
        luxury: { value: '0 20px 50px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(212, 175, 55, 0.1)' },
        gold: { value: '0 0 15px rgba(212, 175, 55, 0.3)' },
      }
    },
    semanticTokens: {
      colors: {
        primary: { value: '{colors.luxury.dark}' },
        accent: { value: '{colors.luxury.gold}' },
        bg: { value: '{colors.luxury.cream}' },
      },
    },
  },
});

const BookingTheme = createSystem(defaultConfig, config);

export default BookingTheme;
