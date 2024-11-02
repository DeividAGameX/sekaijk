"use client";
import {Provider} from "react-redux";
import {store} from "@/lib/storage/store";
import useUserSession from "@/hooks/useUserSession";
import {AnimatePresence, motion} from "framer-motion";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Spin} from "antd";
import {useEffect, useState} from "react";
import {allowRoutes} from "@/lib/allowed/allowed";
import {usePathname, useRouter} from "next/navigation";

function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const {loading: fetching, user} = useUserSession();
    const [loading, setLoading] = useState(true);
    const rutas = usePathname();
    const route = useRouter();

    useEffect(() => {
        if (!fetching) {
            const allowed = user?.Roles?.Permissions ?? [];
            let ruta = rutas;
            if (/^\/dashboard\/posts\/(\d+)$/.test(rutas)) {
                ruta = "post-edit";
            }
            if (allowed.includes("403")) {
                setLoading(false);
                return;
            }
            const allowByUrl = allowRoutes[ruta as keyof typeof allowRoutes];
            if (!allowByUrl && !allowed) {
                route.push("/dashboard/403");
                return;
            }
            if (!allowed.find((a: any) => a.permissions === allowByUrl)) {
                route.push("/dashboard/403");
                return;
            }
            setLoading(false);
        }
    }, [user, fetching, rutas]);

    return (
        <Provider store={store}>
            {children}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        className="bg-primary w-full h-screen z-50 fixed top-0 left-0 flex justify-center items-center"
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <Spin
                            size="large"
                            indicator={
                                <FontAwesomeIcon
                                    className="animate-spin"
                                    icon={faSpinner}
                                />
                            }
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </Provider>
    );
}

export default DashboardLayout;
