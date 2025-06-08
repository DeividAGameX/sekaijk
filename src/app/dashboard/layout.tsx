import {Metadata} from "next";
import "../globals.css";
import icon from "@/app/favicon.ico";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import DashboardLayout from "@/components/layouts/admin/DashboardLayout";
import Script from "next/script";

export const metadata: Metadata = {
    title: "SekAiJK - Anime, Videojuegos y Cultura Geek",
    icons: icon.src,
    description:
        "Somos fanáticos del anime, videojuegos y amantes de la cultura geek. En el 2022 iniciamos nuestro viaje para ofrecer una explosión de contenido creativo y entretenido, lleno de referencias, humor y monas chinas. Entonces, ¿buscas un canal sobre anime y videojuegos? Pues acompáñanos, porque con nuestras voces encantadoras y nuestro carisma desbordante, te prometemos una experiencia llena de diversión y aventuras.",
    keywords:
        "anime, videojuegos, cultura geek, entretenimiento, humor, monas chinas, SekAiJK",
    openGraph: {
        title: "SekAiJK - Anime, Videojuegos y Cultura Geek",
        description:
            "Somos fanáticos del anime, videojuegos y amantes de la cultura geek. En el 2022 iniciamos nuestro viaje para ofrecer una explosión de contenido creativo y entretenido, lleno de referencias, humor y monas chinas. Entonces, ¿buscas un canal sobre anime y videojuegos? Pues acompáñanos, porque con nuestras voces encantadoras y nuestro carisma desbordante, te prometemos una experiencia llena de diversión y aventuras.",
        url: "https://sekaijk.com",
        type: "website",
        siteName: "SekAiJK",
        images: [
            {
                url: "https://res.cloudinary.com/sekai-jk/image/upload/v1715476651/Sekaijk/Perfil_qb9rvf.jpg",
                alt: "SekAiJK",
            },
        ],
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const messages = await getMessages();
    return (
        <html lang="en">
            <body className="min-h-screen h-full w-full dark">
                <NextIntlClientProvider messages={messages}>
                    <DashboardLayout>{children}</DashboardLayout>
                </NextIntlClientProvider>
            </body>
            <Script
                async={true}
                src="https://platform.twitter.com/widgets.js"
            />
        </html>
    );
}
