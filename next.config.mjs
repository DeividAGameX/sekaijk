import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/sekai-jk/**",
            },
            {
                protocol: "https",
                hostname: "i.ytimg.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default withNextIntl(nextConfig);
