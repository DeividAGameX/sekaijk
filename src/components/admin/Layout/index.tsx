"use client";
import {Layout} from "antd";
import Sider from "./Sider";
import Navbar from "./Navbar";
import AdminDrawer from "./Drawer";

function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Layout className="dashboardLayout h-screen">
                <Sider />
                <Layout.Content className="dashboardContent">
                    <Navbar />
                    <Layout.Content>{children}</Layout.Content>
                </Layout.Content>
            </Layout>
            <AdminDrawer />
            {/* <AnimatePresence>
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
            </AnimatePresence> */}
        </>
    );
}

export default AdminLayout;
