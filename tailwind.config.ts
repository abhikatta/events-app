import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: "rgb(var(--bg))",
                softBg: "rgb(var(--softBg))",
                color: "rgb(var(--color))",
                softColor: "rgb(var(--softColor))",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [nextui()],
};
export default config;
