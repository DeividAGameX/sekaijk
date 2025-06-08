import {
    SocialClass,
    SocialMedia,
    SocialName,
} from "@/features/profile/utils/SocialMedia";
import {SocialItem} from "@/features/users/types/social";
import {faPlus, faX} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Input, Select} from "antd";
import {useState} from "react";

interface RedesComponentProps {
    value?: SocialItem[];
    onChange?: (value: SocialItem[]) => void;
}

function RedesComponent({value, onChange}: RedesComponentProps) {
    const [icon, setIcon] = useState("");
    const [url, setUrl] = useState("");

    const handleAdd = () => {
        if (!icon || !url) {
            return;
        }
        const newSocialItem: SocialItem = {
            icon,
            url,
        };
        if (value) onChange?.([...value, newSocialItem]);
        else onChange?.([newSocialItem]);
        setIcon("");
        setUrl("");
    };

    const handleDelete = (index: number) => () => {
        console.log(index, value);
        if (value) onChange?.(value.filter((_, i) => i != index));
    };

    return (
        <div className="w-full flex flex-col-reverse gap-2 items-start xl:flex-row">
            <div className="flex-1 flex gap-2 flex-wrap">
                {(value ?? []).map((social, index) => (
                    <div
                        key={index}
                        className={`rounded-lg py-1 px-3 flex gap-2 items-center ${
                            SocialClass[social.icon as keyof typeof SocialClass]
                        }`}
                    >
                        <i className={`bi bi-${social.icon}`}></i>
                        {SocialName[social.icon as keyof typeof SocialName]}
                        <button
                            className="text-neutral-200 hover:text-white"
                            onClick={handleDelete(index)}
                        >
                            <FontAwesomeIcon icon={faX} />
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex gap-2 flex-col w-full xl:w-auto md:flex-row">
                <div className="w-full xl:max-w-[250px]">
                    <Select
                        style={{
                            width: "100%",
                        }}
                        value={icon}
                        onChange={(e) => setIcon(e)}
                        allowClear
                        options={SocialMedia}
                        optionRender={(e) => (
                            <span>
                                <i className={`bi bi-${e.value} mr-2`}></i>
                                <span>{`${e.label}`}</span>
                            </span>
                        )}
                        labelRender={(e) => (
                            <span>
                                {e.value ? (
                                    <>
                                        <i
                                            className={`bi bi-${e.value} mr-2`}
                                        ></i>
                                        <span>{`${e.label}`}</span>
                                    </>
                                ) : (
                                    <span>Seleccionar red social</span>
                                )}
                            </span>
                        )}
                    />
                </div>
                <div className="w-full xl:max-w-[250px]">
                    <Input
                        style={{
                            width: "100%",
                        }}
                        value={url}
                        placeholder="https://example.com"
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <Button onClick={handleAdd}>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </div>
        </div>
    );
}

export default RedesComponent;
