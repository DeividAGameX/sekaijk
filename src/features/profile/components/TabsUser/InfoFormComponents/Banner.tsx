import FileManager from "@/components/dashboard/FileManager";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Dropdown, Image} from "antd";
import {useState} from "react";

interface BannerProps {
    value?: string;
    onChange?: (value: string) => void;
    "aria-required"?: "true" | "false";
    "aria-invalid"?: "true" | "false";
}

function BannerComponent({
    value,
    onChange,
    "aria-invalid": invalid,
}: BannerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [preview, setPreview] = useState(false);
    return (
        <div className="w-full h-full overflow-hidden rounded-2xl">
            <div
                className={`${
                    invalid == "true"
                        ? "border-[#DC4446] text-[#DC4446]"
                        : "border-neutral-800 text-gray-500 hover:text-primary hover:border-primary"
                } bg-neutral-900 min-h-20 h-full border-[1px] border-dashed overflow-hidden rounded-2xl xl:min-w-24 transition duration-150`}
            >
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
                        <p className="text-center">Seleccionar imagen</p>
                    </div>
                )}
            </div>
            <FileManager
                accept={["IMAGE"]}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                selectResource={(e) => {
                    if (onChange) onChange(e);
                    setIsOpen(false);
                }}
                imgAspect={1600 / 533}
            />
        </div>
    );
}

export default BannerComponent;
