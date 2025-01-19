import { headers } from 'next/headers';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        header: "#36454F",
        RuqyaGray: "#36454F",
        RuqyaGreen: "#008080",
        RuqyaLightPurple: "#E6E6FA",
      },
      fontFamily: {
        fullsans: ['"FullSans-LC50Book"', 'sans-serif'],
        fullsansbold: ['"full-sans-lc-90-bold"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      spacing:{
        "70vh": "70vh",
        "80vh": "80vh",
        "90vh": "90vh"
      }
    },
  },
  plugins: [],
};
