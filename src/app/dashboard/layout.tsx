"use client";
import {Provider} from "react-redux";
import {store} from "@/lib/storage/store";

function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Provider store={store}>
            {children}
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
        </Provider>
    );
}

export default DashboardLayout;
