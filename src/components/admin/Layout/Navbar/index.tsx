import {
    // faAdd,
    faBars,
    faBell,
    faPencil,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Badge, Breadcrumb, Button, Layout} from "antd";
import {useTranslations} from "next-intl";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useMemo} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/storage/store";
import {
    toggleDrawerCollapsed,
    toggleMenuCollapsed,
} from "@/lib/storage/Reducers/layout.reducer";

function Navbar() {
    const t = useTranslations("layout.navbar.bread");
    const pathname = usePathname();
    const {breakPoint, menuCollapsed, drawerCollapsed, titulo} = useSelector(
        (root: RootState) => root.layout
    );
    const dispatch = useDispatch();
    const breadcrumbItems = useMemo(() => {
        // Dividimos el pathname y eliminamos el primer elemento vacío
        const pathParts = pathname.split("/").filter((part) => part);

        // Iteramos para generar el label y el link
        return pathParts.map((part, index) => {
            const link = "/" + pathParts.slice(0, index + 1).join("/");
            return {
                title:
                    index === pathParts.length - 1 ? (
                        titulo ? (
                            titulo
                        ) : (
                            t(part)
                        )
                    ) : (
                        <Link href={link}>{t(part)}</Link>
                    ),
            };
        });
    }, [pathname, t, titulo]);

    const toggle = () => {
        if (breakPoint) {
            dispatch(toggleDrawerCollapsed(!drawerCollapsed));
        } else {
            dispatch(toggleMenuCollapsed(!menuCollapsed));
        }
    };

    return (
        <Layout.Header className="drop-shadow overflow-hidden z-10 flex gap-1 my-4 rounded items-center">
            <Button
                type="text"
                size="large"
                icon={<FontAwesomeIcon icon={faBars} />}
                onClick={toggle}
            />
            <div className="px-5 dashboard-title">
                <Breadcrumb items={breadcrumbItems} />
                <p className="text-3xl truncate text-ellipsis w-auto">
                    {titulo
                        ? titulo
                        : (
                              breadcrumbItems[breadcrumbItems.length - 1] ?? {
                                  title: "...",
                              }
                          ).title}
                </p>
            </div>
            {/* <AnimatePresence>
                {!isCollapse && (
                    <motion.div
                        className="w-96 flex gap-2"
                        initial={{
                            opacity: 0,
                            x: -32,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        exit={{
                            opacity: 0,
                            x: -32,
                        }}
                    >
                        <Input.Search />
                        <Button
                            type="primary"
                            icon={<FontAwesomeIcon icon={faAdd} />}
                        />
                    </motion.div>
                )}
            </AnimatePresence> */}
            <AnimatePresence>
                {breakPoint ? (
                    <motion.div
                        className="w-[32px]"
                        initial={{
                            opacity: 0,
                            x: -32,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        exit={{
                            opacity: 0,
                            x: -32,
                        }}
                    >
                        <Button
                            type="text"
                            icon={
                                <FontAwesomeIcon
                                    icon={faPencil}
                                    className="text-lg"
                                />
                            }
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -32,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        exit={{
                            opacity: 0,
                            x: -32,
                        }}
                    >
                        <Badge count={1}>
                            <Button
                                type="text"
                                icon={
                                    <FontAwesomeIcon
                                        icon={faBell}
                                        className="text-lg"
                                    />
                                }
                            />
                        </Badge>
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout.Header>
    );
}

export default Navbar;
