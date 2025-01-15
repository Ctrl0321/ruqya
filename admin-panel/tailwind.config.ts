import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#ffffff',
          100: '#029a9a',
          150: '#008080',
          200: '#0C8281',
        },
        secondary: {
          50: '#000000',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
