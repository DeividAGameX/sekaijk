import Footer from "@/components/public/Layout/Footer";
import HeaderPage from "@/components/public/Layout/Header";
import {prisma} from "@/lib/prisma";
import Script from "next/script";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const categories = await prisma.categories.findMany();
    return (
        <>
            <div className="flex flex-col w-full h-full min-h-screen">
                <HeaderPage categories={categories} />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
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
        </>
    );
}
