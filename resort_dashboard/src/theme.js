import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#FAF6F0',
      100: '#F0E6D4',
      200: '#E0CDA8',
      300: '#C5A059',
      400: '#8B6914',
      500: '#3D2010',
      600: '#33190C',
      700: '#2A1309',
      800: '#1F0E07',
      900: '#150904',
    },
    cream: '#FAF6F0',
    gold: '#C5A059',
    deepBrown: '#3D2010',
    secondaryText: '#7A7A7A',
    cardBg: '#FFFFFF',
    sidebarBg: '#3D2010',
    borderLight: '#E8E0D6',
  },
  fonts: {
    heading: `'Cormorant Garamond', serif`,
    body: `'DM Sans', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: '#FAF6F0',
        color: '#3D2010',
        fontFamily: `'DM Sans', sans-serif`,
      },
      '*::placeholder': {
        color: '#7A7A7A',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '500',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
      },
      variants: {
        primary: {
          bg: '#3D2010',
          color: 'white',
          _hover: { bg: '#2A1309', transform: 'translateY(-1px)', boxShadow: 'lg' },
        },
        gold: {
          bg: '#C5A059',
          color: 'white',
          _hover: { bg: '#B08A3E', transform: 'translateY(-1px)', boxShadow: 'lg' },
        },
        ghost: {
          _hover: { bg: 'rgba(61, 32, 16, 0.06)' },
        },
        outline: {
          borderColor: '#E8E0D6',
          color: '#3D2010',
          _hover: { bg: 'rgba(61, 32, 16, 0.04)', borderColor: '#C5A059' },
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: 'white',
            border: '1px solid',
            borderColor: '#E8E0D6',
            borderRadius: '12px',
            _focus: { borderColor: '#C5A059', bg: 'white', boxShadow: '0 0 0 1px #C5A059' },
            _hover: { borderColor: '#C5A059' },
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
    Select: {
      variants: {
        filled: {
          field: {
            bg: 'white',
            border: '1px solid',
            borderColor: '#E8E0D6',
            borderRadius: '12px',
            _focus: { borderColor: '#C5A059', bg: 'white' },
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          borderRadius: '20px',
          bg: 'white',
        },
        overlay: {
          bg: 'rgba(61, 32, 16, 0.4)',
          backdropFilter: 'blur(8px)',
        },
      },
    },
    Table: {
      variants: {
        simple: {
          th: {
            borderColor: '#E8E0D6',
            color: '#7A7A7A',
            fontFamily: `'DM Sans', sans-serif`,
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          },
          td: {
            borderColor: '#F0E6D4',
            fontSize: '14px',
          },
        },
      },
    },
  },
});

export default theme;
