import FileManager from "@/components/admin/FileManager/FileManager";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Dropdown, Image} from "antd";
import {useTranslations} from "next-intl";
import {useState} from "react";

const BannerImg = ({
    value,
    onChange,
}: {
    id: any;
    value?: any;
    onChange?: (e: any) => void;
}) => {
    const [open, setOpen] = useState(false);
    const [previewImg, setPreviewImg] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const t = useTranslations("posts.editForm");

    const selectFile = (e: any) => {
        if (onChange) {
            console.log(e);
            onChange(e);
            setOpen(false);
        }
    };

    return (
        <div className="h-48 cursor-pointer">
            {value ? (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: 1,
                                label: "Ver imagen",
                                onClick: () => {
                                    setPreviewOpen(true);
                                    setPreviewImg(value);
                                },
                            },
                            {
                                key: 2,
                                label: "Cambiar de imagen",
                                onClick: () => {
                                    setOpen(true);
                                },
                            },
                        ],
                    }}
                    trigger={["contextMenu", "click"]}
                >
                    <div className="w-full h-full rounded-lg relative overflow-hidden border-2 border-transparent transition duration-150 hover:border-[var(--primary)]">
                        <Image
                            src={value}
                            alt=""
                            style={{width: "100%", height: "100%"}}
                            preview={false}
                        />
                    </div>
                </Dropdown>
            ) : (
                <div
                    onClick={() => setOpen(true)}
                    className="w-full h-full flex flex-col justify-center items-center bg-primary border-solid border-2 border-body rounded-lg transition duration-150 hover:border-[var(--primary)] hover:text-primary"
                >
                    <FontAwesomeIcon
                        icon={faImage}
                        style={{fontSize: "72px"}}
                    />
                    <p>{t("banner")}</p>
                </div>
            )}
            <Image
                src=""
                alt=""
                preview={{
                    src: previewImg,
                    visible: previewOpen,
                    onVisibleChange: (value) => {
                        setPreviewOpen(value);
                    },
                }}
            />
            <FileManager
                open={open}
                size={1080 / 1080}
                onClose={() => setOpen(false)}
                selectFile={selectFile}
            />
        </div>
    );
};

export default BannerImg;
