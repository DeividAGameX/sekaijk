import FileManager from "@/components/dashboard/FileManager";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Dropdown, Image} from "antd";
import {useState} from "react";

interface BannerProps {
    value?: string;
    onChange?: (value: string) => void;
}

function BannerComponent({value, onChange}: BannerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [preview, setPreview] = useState(false);
    return (
        <div className="w-full overflow-hidden rounded-2xl">
            <div className="bg-neutral-900 min-h-20 max-h-28 h-full border-dashed border-neutral-800 hover:border-blue-600 xl:min-w-24">
                {value ? (
                    <Dropdown
                        trigger={["click", "contextMenu"]}
                        menu={{
                            items: [
                                {
                                    key: 1,
                                    label: "Ver imagen",
                                    onClick: () => {
                                        setPreview(true);
                                    },
                                },
                                {
                                    key: 2,
                                    label: "Cambiar",
                                    onClick: () => {
                                        setIsOpen(true);
                                    },
                                },
                            ],
                        }}
                    >
                        <Image
                            src={value}
                            alt="name"
                            preview={{
                                visible: preview,
                                mask: null,
                                onVisibleChange: (v) => {
                                    if (!v) setPreview(v);
                                },
                            }}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                            wrapperStyle={{
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </Dropdown>
                ) : (
                    <div
                        className="w-full h-full min-h-20 flex flex-col justify-center items-center xl:min-w-24"
                        onClick={() => setIsOpen(true)}
                    >
                        <FontAwesomeIcon icon={faImage} />
                        <p className="text-white text-center">
                            Seleccionar imagen
                        </p>
                    </div>
                )}
            </div>
            <FileManager
                accept="IMAGE"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                selectResource={(e) => {
                    if (onChange) onChange(e);
                    setIsOpen(false);
                }}
                imgAspect={1920 / 1080}
            />
        </div>
    );
}

export default BannerComponent;
