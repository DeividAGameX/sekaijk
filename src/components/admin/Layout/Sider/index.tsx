import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faFileLines,
    faHashtag,
    faTag,
    faBars,
    faGear,
    faRightFromBracket,
    faInfo,
    faUsers,
    faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import {Button, Dropdown, Layout, Menu, MenuProps, Tooltip} from "antd";
import {useTranslations} from "next-intl";
import {usePathname, useRouter} from "next/navigation";
import {signOut} from "next-auth/react";
import {useMemo} from "react";
import {AnimatePresence, motion} from "framer-motion";
import useUserSession from "@/hooks/useUserSession";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/storage/store";
import {
    setBreak,
    toggleDrawerCollapsed,
    toggleMenuCollapsed,
} from "@/lib/storage/Reducers/layout.reducer";
import Link from "next/link";
import {allowRoutes} from "@/lib/allowed/allowed";

function Sider() {
    const t = useTranslations("layout");
    const {menuCollapsed, breakPoint} = useSelector(
        (state: RootState) => state.layout
    );
    const dispatch = useDispatch();
    const router = useRouter();
    const path = usePathname();
    // const [broken, setBroken] = useState(false);
    const {user, loading} = useUserSession();
    const rutas = useMemo(
        () => [
            {
                label: t("sider.@post"),
                key: "@post",
                icon: <FontAwesomeIcon icon={faFileLines} />,
                path: "/dashboard/posts",
            },
            {
                label: t("sider.@categories"),
                key: "@categories",
                icon: <FontAwesomeIcon icon={faHashtag} />,
                path: "/dashboard/categories",
            },
            {
                label: t("sider.@tags"),
                key: "@tag",
                icon: <FontAwesomeIcon icon={faTag} />,
                path: "/dashboard/tags",
            },
        ],
        [t]
    );

    const validateRoute = (rutas: string) => {
        const allowed = user?.Roles?.Permissions ?? [];
        const allowByUrl = allowRoutes[rutas as keyof typeof allowRoutes];
        if (!allowByUrl && !allowed) {
            return false;
        }
        if (!allowed.find((a: any) => a.permissions === allowByUrl)) {
            return false;
        }
        return true;
    };

    const menuItems = useMemo<MenuProps["items"]>(() => {
        const items: MenuProps["items"] = [];
        const optionPost: MenuProps["items"] = [];
        if (
            validateRoute("/dashboard/posts") ||
            validateRoute("/dashboard/categories") ||
            validateRoute("/dashboard/tags")
        ) {
            items.push({
                key: "@group-page",
                label: t("sider.menu.group-page"),
                type: "group",
            });
        }
        if (validateRoute("/dashboard/posts")) {
            items.push({
                label: (
                    <Link href={"/dashboard/posts"}>{t("sider.@post")}</Link>
                ),
                key: "@post",
                icon: <FontAwesomeIcon icon={faFileLines} />,
            });
        }
        if (
            validateRoute("/dashboard/categories") ||
            validateRoute("/dashboard/tags")
        ) {
            if (validateRoute("/dashboard/categories")) {
                optionPost.push({
                    label: (
                        <Link href={"/dashboard/categories"} prefetch={true}>
                            {t("sider.@categories")}
                        </Link>
                    ),
                    key: "@categories",
                    icon: <FontAwesomeIcon icon={faHashtag} />,
                });
            }
            if (validateRoute("/dashboard/tags")) {
                optionPost.push({
                    label: (
                        <Link href={"/dashboard/tags"} prefetch={true}>
                            {t("sider.@tags")}
                        </Link>
                    ),
                    key: "@tag",
                    icon: <FontAwesomeIcon icon={faTag} />,
                });
            }
            items.push({
                label: t("sider.menu.groups-post"),
                key: "group-post",
                icon: <FontAwesomeIcon icon={faBars} />,
                popupClassName: "dashboard-submenu",
                children: optionPost,
            });
        }
        if (
            validateRoute("/dashboard/admin/users") ||
            validateRoute("/dashboard/admin/roles")
        ) {
            items.push({
                key: "@group-admin",
                label: t("sider.menu.group-admin"),
                type: "group",
            });
            if (validateRoute("/dashboard/admin/users")) {
                items.push({
                    label: (
                        <Link href={"/dashboard/admin/users"} prefetch={true}>
                            {t("sider.@users")}
                        </Link>
                    ),
                    key: "@users",
                    icon: <FontAwesomeIcon icon={faUsers} />,
                });
            }
            if (validateRoute("/dashboard/admin/roles")) {
                items.push({
                    label: (
                        <Link href={"/dashboard/admin/roles"} prefetch={true}>
                            {t("sider.@roles")}
                        </Link>
                    ),
                    key: "@roles",
                    icon: <FontAwesomeIcon icon={faListCheck} />,
                });
            }
        }
        return items;
    }, user);

    const collapseItems = [
        {
            key: "sett",
            icon: <FontAwesomeIcon icon={faGear} />,
            label: (
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        window.dispatchEvent(new Event("UserSettings"));
                    }}
                >
                    {t("sider.user.info")}
                </a>
            ),
        },
        {
            key: "logO",
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            label: (
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        signOut();
                    }}
                >
                    {t("sider.user.logOut")}
                </a>
            ),
        },
    ];

    const onClick: MenuProps["onClick"] = (e) => {
        const ruta = rutas.find((ruta) => ruta.key === e.key);
        if (ruta && ruta.path) {
            router.push(ruta.path);
        }
    };
    const keySelected = useMemo(() => {
        const ruta = rutas.find((ruta) => ruta.path === path);
        if (ruta) {
            return ruta.key;
        } else {
            return "";
        }
    }, [path, rutas]);

    return (
        <Layout.Sider
            width={"250px"}
            collapsed={menuCollapsed}
            breakpoint="lg"
            trigger={null}
            collapsible
            collapsedWidth={breakPoint ? 0 : "120px"}
            onBreakpoint={(e) => {
                if (e) {
                    dispatch(toggleMenuCollapsed(true));
                } else {
                    dispatch(toggleDrawerCollapsed(false));
                    dispatch(toggleMenuCollapsed(false));
                }
                dispatch(setBreak(e));
            }}
        >
            <motion.div className="flex flex-col pt-5 gap-2 justify-center items-center">
                <motion.img
                    src={loading ? "" : user.avatar}
                    alt="icon"
                    className="w-[140px] rounded-full"
                    animate={
                        menuCollapsed
                            ? {
                                  scale: 0.9,
                              }
                            : {
                                  scale: 1,
                              }
                    }
                />
                <motion.div
                    className="overflow-hidden"
                    animate={
                        menuCollapsed
                            ? {
                                  x: 10,
                                  opacity: 0,
                                  height: 0,
                              }
                            : {
                                  x: 0,
                                  opacity: 1,
                                  height: "auto",
                              }
                    }
                >
                    <p className="font-bold text-lg">
                        {loading ? "..." : user.name}
                    </p>
                </motion.div>
                <AnimatePresence>
                    {menuCollapsed ? (
                        <Dropdown menu={{items: collapseItems}}>
                            <Button type="text">
                                <FontAwesomeIcon icon={faInfo} />
                            </Button>
                        </Dropdown>
                    ) : (
                        <div className="mx-auto max-w-20 w-full">
                            <Tooltip
                                placement={false ? "right" : "top"}
                                title={t("sider.user.info")}
                                arrow={{pointAtCenter: true}}
                            >
                                <Link href={`/dashboard/profile`} prefetch>
                                    <Button
                                        type="text"
                                        size="large"
                                        icon={<FontAwesomeIcon icon={faInfo} />}
                                    />
                                </Link>
                            </Tooltip>
                            <Tooltip
                                placement={false ? "right" : "top"}
                                title={t("sider.user.logOut")}
                                arrow={{pointAtCenter: true}}
                            >
                                <Button
                                    type="text"
                                    size="large"
                                    icon={
                                        <FontAwesomeIcon
                                            icon={faRightFromBracket}
                                        />
                                    }
                                    onClick={() => signOut()}
                                />
                            </Tooltip>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>
            <div className="mx-4 w-auto h-[2px] my-4 bg-neutral-800"></div>
            <Menu
                selectedKeys={[keySelected]}
                className="menu-jk"
                theme="dark"
                mode="inline"
                items={menuItems}
                onClick={onClick}
            />
        </Layout.Sider>
    );
}

export default Sider;
