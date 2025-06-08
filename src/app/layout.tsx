import "bootstrap-icons/font/bootstrap-icons.css";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
