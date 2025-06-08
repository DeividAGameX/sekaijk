import {Metadata} from "next";
import "../globals.css";
import icon from "@/app/favicon.ico";
import Script from "next/script";
import {ThemeProvider} from "@/components/theme-provider";
import {Toaster} from "@/components/ui/sonner";

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
    return (
        <html lang="en" suppressHydrationWarning>
            <Script
                async={true}
                src="https://platform.twitter.com/widgets.js"
            />
            <body className="min-h-screen h-full w-full color-mint-500">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
