import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': { max: '360px' },
        'sm': { max: '640px' },
        'md': { max: '768px' },
        'lg': { max: '1024px' },
        'xl': '1200px',
      },
      colors: {
        info: "#E9F1FF",
        success: "#DCF2EA",
        caution: "#FFF7D0",
        error: "#FFDEDE",
        primary: {
          50: "#E6EAF2",
          100: "#BFCADF",
          200: "#96A8CA",
          300: "#6E86B4",
          400: "#4D6CA6",
          500: "#275499",
          600: "#204C90",
          700: "#154284",
          800: "#0C3978",
          900: "#002861",
        },
        secondary: {
          50: "#EEF9E6",
          100: "#D5EFC1",
          200: "#D5EFC1",
          300: "#9ADA6B",
          400: "#81D247",
          500: "#68C918",
          600: "#58B90E",
          700: "#3FA500",
          800: "#239100",
          900: "#006F00",
        },
        gray: {
          50: "#EFEFEF",
          100: "#D8D8D8",
          200: "#BEBFBF",
          300: "#A1A6AA",
          400: "#8A9299",
          500: "#747F89",
          600: "#677078",
          700: "#474C51",
          800: "#353536",
          900: "#121212",
        },
        white: {
          0: "#FFFFFF",
        }
      },
    },
  },
  plugins: [],
};
export default config;
