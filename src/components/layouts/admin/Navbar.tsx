import Notifications from "@/features/notifications/components/Notifications";
import {RootState} from "@/lib/store";
import {toggleState} from "@/lib/store/features/layout/Sider.reducer";
import {faCaretLeft, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Breadcrumb, Button, Typography} from "antd";
import {BreadcrumbItemType} from "antd/es/breadcrumb/Breadcrumb";
import {useTranslations} from "next-intl";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

function DashboardNavbar() {
    const dispatch = useDispatch();
    const pathName = usePathname();
    const {text: customText, matchWith} = useSelector(
        (state: RootState) => state.navBar
    );
    const {open} = useSelector((state: RootState) => state.sideBar);
    const tPath = useTranslations("routes");
    const [title, setTitle] = useState("");
    const breadCrumb = useMemo<BreadcrumbItemType[]>(() => {
        return pathName
            .split("/")
            .map((p, i) => {
                let retText = "";
                const ruta = pathName
                    .split("/")
                    .slice(0, i + 1)
                    .join("/");
                if (matchWith) {
                    if (p === matchWith) {
                        setTitle(customText ?? "");
                        retText = customText ?? "";
                    } else {
                        retText = tPath.has(p) ? tPath(p) : "";
                    }
                }
                if (pathName.split("/").length - 1 == i && !customText) {
                    setTitle(p);
                    retText = tPath.has(p) ? tPath(p) : "";
                }
                return {
                    className: "line-clamp-1",
                    title:
                        pathName.split("/").length - 1 == i ? (
                            retText ?? ""
                        ) : (
                            <Link href={ruta}>{retText ?? ""}</Link>
                        ),
                };
            })
            .slice(1);
    }, [pathName, tPath, customText, matchWith]);

    const toggle = () => {
        dispatch(toggleState());
    };

    return (
        <nav className="flex items-center gap-4">
            <Button
                type="text"
                onClick={toggle}
                icon={
                    <FontAwesomeIcon icon={open ? faCaretRight : faCaretLeft} />
                }
            />
            <div className="flex-1">
                <Breadcrumb items={breadCrumb} />
                <Typography.Title style={{margin: 0}} className="line-clamp-1">
                    {customText ?? (tPath.has(title) && tPath(title))}
                </Typography.Title>
            </div>
            <Notifications />
        </nav>
    );
}

export default DashboardNavbar;
