import AdminLayout from "@/components/admin/Layout";

export const metadata = {
    title: "Dashboard | SekAiJK ",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <AdminLayout>{children}</AdminLayout>;
}
