import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                JK: "url('/assets/FondoPortada.jpg')",
            },
            textColor: {
                youtube: "#FE0000",
                facebook: "#0866FF",
                instagram: "#E4405F",
                twitter: "#1DA1F2",
                tiktok: "#000000",
                twitch: "#6441A5",
                discord: "#7289DA",
                reddit: "#FF4500",
                spotify: "#1DB954",
                pinterest: "#BD081C",
                threads: "#000000",
            },
            backgroundOpacity: {
                "50": "0.5",
            },
            backgroundColor: {
                primary: "var(--background)",
                "primary-op": "var(--background-op)",
                "primary-op-2": "rgba(10, 10, 10, 0.50)",
                active: "var(--primary)",
            },
            colors: {
                primary: "var(--primary)",
                body: "var(--primary-body)",
                secondary: "var(--secondary-red)",
                accent: {
                    yellow: "var(--golden-yellow)",
                },
                neutral: {
                    gray: "var(--neutral-gray)",
                },
                yt: "#FE0000",
                fb: "#0866FF",
                ig: "#E4405F",
                tt: "#000000",
                youtube: "#FE0000",
                facebook: "#0866FF",
                instagram: "#E4405F",
                twitter: "#1DA1F2",
                tiktok: "#000000",
                twitch: "#6441A5",
                discord: "#7289DA",
                reddit: "#FF4500",
                spotify: "#1DB954",
                pinterest: "#BD081C",
                threads: "#000000",
            },
            fontFamily: {
                lato: ["Lato"],
            },
        },
    },
    plugins: [],
};
export default config;
