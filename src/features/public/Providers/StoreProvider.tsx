"use client";
import {publicStore} from "@/lib/store/PublicStore";
import * as React from "react";
import {Provider} from "react-redux";

export function PublicStore({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <Provider store={publicStore}>{children}</Provider>;
}
