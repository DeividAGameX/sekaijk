import {toggleState} from "@/lib/store/features/layout/Sider.reducer";
import {
    faFileAlt,
    faFolderOpen,
    faShield,
    faTags,
    faUsers,
    faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Menu, MenuProps} from "antd";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import {useMemo} from "react";
import {useDispatch} from "react-redux";
import Link from "./Link";

type MenuItem = Required<MenuProps>["items"][number];

function MenuItems({isDrawer}: {isDrawer?: boolean}) {
    const tMenu = useTranslations("components.layout.sideBar.menu");
    const dispatch = useDispatch();
    const items: MenuItem[] = [
        {
            key: "labelPost",
            label: tMenu("posts"),
            type: "group",
            children: [
                {
                    key: "posts",
                    label: (
                        <Link href={"/dashboard/posts"}>{tMenu("posts")}</Link>
                    ),
                    icon: <FontAwesomeIcon icon={faFileAlt} />,
                    onClick: isDrawer
                        ? () => dispatch(toggleState())
                        : undefined,
                },
                {
                    key: "categories",
                    label: (
                        <Link href={"/dashboard/categories"}>
                            {tMenu("categories")}
                        </Link>
                    ),
                    icon: <FontAwesomeIcon icon={faFolderOpen} />,
                    onClick: isDrawer
                        ? () => dispatch(toggleState())
                        : undefined,
                },
                {
                    key: "tags",
                    label: (
                        <Link href={"/dashboard/tags"}>{tMenu("tags")}</Link>
                    ),
                    icon: <FontAwesomeIcon icon={faTags} />,
                    onClick: isDrawer
                        ? () => dispatch(toggleState())
                        : undefined,
                },
            ],
        },
        {
            key: "labelSettings",
            label: tMenu("settings"),
            type: "group",
            children: [
                {
                    key: "teams",
                    label: (
                        <Link href={"/dashboard/settings/teams"}>
                            {tMenu("teams")}
                        </Link>
                    ),
                    icon: <FontAwesomeIcon icon={faUserTag} />,
                    onClick: isDrawer
                        ? () => dispatch(toggleState())
                        : undefined,
                },
                {
                    key: "users",
                    label: (
                        <Link href={"/dashboard/settings/users"}>
                            {tMenu("users")}
                        </Link>
                    ),
                    icon: <FontAwesomeIcon icon={faUsers} />,
                    onClick: isDrawer
                        ? () => dispatch(toggleState())
                        : undefined,
                },
                {
                    key: "roles",
                    label: (
                        <Link href={"/dashboard/settings/roles"}>
                            {tMenu("roles")}
                        </Link>
                    ),
                    icon: <FontAwesomeIcon icon={faShield} />,
                    onClick: isDrawer
                        ? () => dispatch(toggleState())
                        : undefined,
                },
            ],
        },
    ];

    const pathName = usePathname();
    const selectedKey = useMemo(() => {
        if (/^\/dashboard\/posts\/\d+$/.test(pathName)) {
            return "posts";
        }
        return {
            "/dashboard/posts": "posts",
            "/dashboard/categories": "categories",
            "/dashboard/tags": "tags",
            "/dashboard/settings/teams": "teams",
            "/dashboard/settings/users": "users",
            "/dashboard/settings/roles": "roles",
        }[pathName];
    }, [pathName]);

    return (
        <Menu
            selectedKeys={[selectedKey ?? ""]}
            items={items}
            mode="inline"
            className="border-admin-jk"
            {...(isDrawer ? {openKeys: ["options"], expandIcon: null} : {})}
        />
    );
}

export default MenuItems;
