import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/cards/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/chat/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", "synthwave"],
  },
  plugins: [require("daisyui")],
};
export default config;
