import useUserSession from "@/hooks/useUserSession";
import {allowRoutes} from "@/lib/allowed/allowed";
import {toggleDrawerCollapsed} from "@/lib/storage/Reducers/layout.reducer";
import {RootState} from "@/lib/storage/store";
import {
    faBars,
    faFileLines,
    faHashtag,
    faInfo,
    faListCheck,
    faRightFromBracket,
    faTag,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Drawer, Menu, MenuProps, Tooltip} from "antd";
import {signOut} from "next-auth/react";
import {useTranslations} from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";

function AdminDrawer() {
    const t = useTranslations("layout");
    const {user, loading} = useUserSession();
    const {drawerCollapsed, breakPoint} = useSelector(
        (state: RootState) => state.layout
    );
    const dispatch = useDispatch();
    const router = useRouter();
    const path = usePathname();
    const rutas = [
        {
            key: "@post",
            path: "/dashboard/posts",
        },
        {
            key: "@categories",
            path: "/dashboard/categories",
        },
        {
            key: "@tag",
            path: "/dashboard/tags",
        },
        {
            key: "@users",
            path: "/dashboard/admin/users",
        },
        {
            key: "@roles",
            path: "/dashboard/admin/roles",
        },
    ];

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

    const closeDrawer = () => {
        dispatch(toggleDrawerCollapsed(false));
    };

    return (
        <Drawer
            className="dashboardDrawer"
            title="SekAiJK"
            open={drawerCollapsed}
            onClose={closeDrawer}
            placement="left"
            width={breakPoint ? "100%" : 360}
        >
            <div className="flex flex-col pt-5 gap-2 justify-center items-center">
                <Image
                    src={loading ? "" : user.avatar}
                    alt="icon"
                    width={100}
                    height={100}
                    className="w-[140px] rounded-full"
                />
                <div className="overflow-hidden">
                    <p className="font-bold text-lg">
                        {loading ? "..." : user.name}
                    </p>
                </div>
                <div className="mx-auto max-w-20 w-full">
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
                </div>
            </div>
            <div className="mx-4 w-auto h-[2px] my-4 bg-neutral-800"></div>
            <Menu
                selectedKeys={[keySelected]}
                className="menu-jk"
                theme="dark"
                mode="inline"
                items={menuItems}
                onClick={onClick}
            />
        </Drawer>
    );
}

export default AdminDrawer;
