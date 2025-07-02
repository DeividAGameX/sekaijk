import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import "@/app/globals.css";
import {Toaster} from "@/components/ui/sonner";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const messages = await getMessages();
    return (
        <html lang="en">
            <body className="min-h-screen h-full w-full dark">
                <Toaster />
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
