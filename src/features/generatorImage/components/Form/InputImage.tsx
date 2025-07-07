import {Button, Input, Space} from "antd";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import FileManager from "@/components/dashboard/FileManager";

interface InputImageProps {
    value?: string;
    onChange?: (value: string) => void;
}

function InputImage({value, onChange}: InputImageProps) {
    const [openImage, setOpenImage] = useState(false);
    return (
        <>
            <Space.Compact style={{width: "100%"}}>
                <Input
                    value={value}
                    placeholder="https://..."
                    allowClear
                    onChange={(e) => {
                        if (onChange) onChange(e.target.value);
                    }}
                />
                <Button type="primary" onClick={() => setOpenImage(true)}>
                    <FontAwesomeIcon icon={faImage} />
                </Button>
            </Space.Compact>
            <FileManager
                accept={["IMAGE"]}
                isOpen={openImage}
                onClose={() => setOpenImage(false)}
                selectResource={(e) => {
                    if (onChange) onChange(e);
                    setOpenImage(false);
                }}
                imgAspect={1920 / 1080}
            />
        </>
    );
}

export default InputImage;
