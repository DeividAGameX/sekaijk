"use client";
import {Provider} from "react-redux";
import {store} from "@/lib/storage/store";

function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <Provider store={store}>{children}</Provider>;
}

export default DashboardLayout;
