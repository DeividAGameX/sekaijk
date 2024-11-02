"use client";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import {ConfigProvider, theme} from "antd";
import {SessionProvider} from "next-auth/react";

function Body({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <body className="min-h-screen h-full w-full">
            <AntdRegistry>
                <ConfigProvider
                    theme={{
                        algorithm: theme.darkAlgorithm,
                        token: {
                            fontFamily: "Lato",
                            colorPrimary: "#FF0F80",
                            colorBgContainer: "#121212",
                            colorBgBase: "#0a0a0a",
                        },
                    }}
                >
                    <SessionProvider>{children}</SessionProvider>
                </ConfigProvider>
            </AntdRegistry>
        </body>
    );
}

export default Body;
