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
    const {text: customText} = useSelector((state: RootState) => state.navBar);
    const {open} = useSelector((state: RootState) => state.sideBar);
    const tPath = useTranslations("routes");
    const [title, setTitle] = useState("");
    const breadCrumb = useMemo<BreadcrumbItemType[]>(() => {
        return pathName
            .split("/")
            .map((p, i) => {
                if (i == pathName.split("/").length - 1) {
                    setTitle(p);
                }
                return {
                    title:
                        pathName.split("/").length - 1 == i ? (
                            customText ?? tPath(p)
                        ) : (
                            <Link
                                href={pathName.split("/").slice(0, i).join("/")}
                            >
                                {tPath(p)}
                            </Link>
                        ),
                };
            })
            .slice(1);
    }, [pathName, tPath, customText]);

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
            <div className="w-full">
                <Breadcrumb items={breadCrumb} />
                <Typography.Title style={{margin: 0}}>
                    {customText ?? tPath(title)}
                </Typography.Title>
            </div>
        </nav>
    );
}

export default DashboardNavbar;
