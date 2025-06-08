"use client";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import {ConfigProvider, Layout, notification, theme, ThemeConfig} from "antd";
import DashboardSider from "./Sider";
import {Provider} from "react-redux";
import {store} from "@/lib/store";
import DashboardNavbar from "./Navbar";
import {SessionProvider} from "next-auth/react";
import DashboardDrawer from "./Drawer";
import axios from "axios";
import {useEffect} from "react";
import {useTranslations} from "next-intl";

const Theme: ThemeConfig = {
    algorithm: theme.darkAlgorithm,
    token: {
        fontFamily: "Lato",
        colorPrimary: "#D94862",
        colorBgContainer: "#121212",
        colorBgBase: "#0a0a0a",
    },
    components: {
        Layout: {
            bodyBg: "#0a0a0a",
            siderBg: "#0a0a0a",
        },
        Menu: {
            colorBgBase: "#0a0a0a",
            itemBg: "#0a0a0a",
            colorBgContainer: "#0a0a0a",
            colorBgLayout: "#0a0a0a",
            subMenuItemBg: "#0a0a0a",
        },
    },
};

function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [api, contextHolder] = notification.useNotification();
    const tResponseError = useTranslations("errors.response");
    useEffect(() => {
        const idInterceptor = axios.interceptors.response.use(
            function (response) {
                console.log("Response: ");
                console.log(response);
                return response;
            },
            function (error) {
                const {data} = error.response;
                api.error({
                    message: tResponseError(`${data.message}.title`),
                    description: tResponseError(`${data.message}.message`),
                    duration: 5,
                    placement: "topRight",
                });
                return Promise.reject(error);
            }
        );
        return () => {
            axios.interceptors.response.eject(idInterceptor);
        };
    }, [api, tResponseError]);
    return (
        <SessionProvider>
            <Provider store={store}>
                <AntdRegistry>
                    <ConfigProvider theme={Theme}>
                        <Layout className="w-full h-screen">
                            {contextHolder}
                            <DashboardSider />
                            <Layout.Content className="h-full py-2 px-3">
                                <div className="p-2 w-full h-full flex flex-col gap-3">
                                    <DashboardNavbar />
                                    <Layout.Content className="min-w-full h-full p-2 bg-neutral-900 rounded-2xl">
                                        {children}
                                    </Layout.Content>
                                </div>
                            </Layout.Content>
                        </Layout>
                        <DashboardDrawer />
                    </ConfigProvider>
                </AntdRegistry>
            </Provider>
        </SessionProvider>
    );
}

export default DashboardLayout;
