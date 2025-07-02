import {Metadata} from "next";
import "../globals.css";
import icon from "@/app/favicon.ico";
import {ThemeProvider} from "@/components/theme-provider";
import PublicLayout from "@/components/layouts/public/PublicLayout";
import {PublicStore} from "@/features/public/Providers/StoreProvider";
import {Toaster} from "sonner";
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
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen h-full w-full color-mint-500">
                <PublicStore>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem={false}
                        enableColorScheme={false}
                        disableTransitionOnChange
                    >
                        <Toaster />
                        <PublicLayout>{children}</PublicLayout>
                    </ThemeProvider>
                </PublicStore>
                <Script
                    strategy="lazyOnload"
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
                />
                <Script id="google-analytics" strategy="lazyOnload">
                    {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}', {
          page_path: window.location.pathname,
        });
      `}
                </Script>
            </body>
        </html>
    );
}
