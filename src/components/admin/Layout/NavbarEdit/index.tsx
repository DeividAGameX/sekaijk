import {
    setBreak,
    toggleDrawerCollapsed,
} from "@/lib/storage/Reducers/layout.reducer";
import {RootState} from "@/lib/storage/store";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from "antd";
import {useTranslations} from "next-intl";
import Link from "next/link";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

function NavbarEdit({
    id,
    title,
    saveDraft,
    saving,
    publishPost,
    publishing,
}: {
    id: number;
    title: string;
    saveDraft: () => void;
    saving: boolean;
    publishPost: () => void;
    publishing: boolean;
}) {
    const t = useTranslations("posts.editForm");
    const dispatch = useDispatch();
    const {drawerCollapsed} = useSelector((root: RootState) => root.layout);

    const toggle = () => {
        dispatch(toggleDrawerCollapsed(!drawerCollapsed));
    };

    useEffect(() => {
        const width = window.innerWidth;
        if (width > 768) {
            dispatch(setBreak(false));
        } else {
            dispatch(setBreak(true));
        }
        const handleResize = () => {
            const width = window.innerWidth;
            if (width > 768) {
                dispatch(setBreak(false));
            } else {
                dispatch(setBreak(true));
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="w-full p-3">
            <div className="w-full bg-body rounded-lg p-2 flex flex-wrap justify-between items-center gap-3">
                <div className="flex gap-3 items-center">
                    <Button
                        type="text"
                        icon={<FontAwesomeIcon icon={faBars} />}
                        onClick={toggle}
                    />
                    <h3>{title}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Link href={`/preview/${id}`} target="_blank">
                        <Button type="dashed">{t("preview")}</Button>
                    </Link>
                    <Button
                        disabled={publishing}
                        loading={saving}
                        onClick={saveDraft}
                    >
                        {t("saveDraft")}
                    </Button>
                    <Button
                        type="primary"
                        disabled={saving}
                        loading={publishing}
                        onClick={publishPost}
                    >
                        {t("publish")}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default NavbarEdit;
