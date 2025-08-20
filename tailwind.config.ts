import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        'gilroy': ['Gilroy', 'Inter', 'Poppins', 'sans-serif'],
      },
      colors: {
        // Primary colors
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          main: '#651FFF',
          hover: '#5b1de6',
          pressed: '#5c3FFF',
        },
        orange: '#FF9022',
        'blue-grey': {
          50: '#E9F0F9',
          100: '#D1E1F3',
          200: '#A3C3E7',
          300: '#75A5DB',
          400: '#4787CF',
          500: '#636F89',
          600: '#4F5A6E',
          700: '#3B4553',
          800: '#273037',
          900: '#131B1C',
        },
        // Dark theme colors with better contrast
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Additional colors
        green: {
          50: '#E9F3E4',
          100: '#D3E7C9',
          200: '#A7CF93',
          300: '#7BB75D',
          400: '#4F9F27',
          500: '#ACF25A',
          600: '#8AC248',
          700: '#689236',
          800: '#466224',
          900: '#243212',
        },
        red: {
          50: '#FCECEB',
          100: '#F9D9D7',
          200: '#F3B3AF',
          300: '#ED8D87',
          400: '#E7675F',
          500: '#FA4A56',
          600: '#C83B44',
          700: '#962C32',
          800: '#641D20',
          900: '#320E10',
        },
      },
    },
  },
  plugins: [],
};

export default config;
