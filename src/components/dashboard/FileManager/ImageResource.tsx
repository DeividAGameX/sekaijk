import {faCheck, faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Image, Popconfirm} from "antd";
import {useState} from "react";

interface ImageResourceProps {
    id: number;
    name: string;
    url: string;
    handleSelect: (url: string) => void;
    handleDelete: (id: number) => void;
}

function ImageResource({
    id,
    name,
    url,
    handleSelect,
    handleDelete,
}: ImageResourceProps) {
    const [previewOpen, setPreviewOpen] = useState(false);
    return (
        <Image
            src={url ?? "/assets/FondoPortada.jpg"}
            style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
            }}
            wrapperStyle={{
                width: "100%",
                height: "100%",
            }}
            alt={name}
            preview={{
                mask: (
                    <>
                        <Button
                            type="text"
                            icon={<FontAwesomeIcon icon={faCheck} />}
                            onClick={() => handleSelect(url)}
                        />
                        <Button
                            type="text"
                            icon={<FontAwesomeIcon icon={faEye} />}
                            onClick={() => setPreviewOpen(true)}
                        />
                        <Popconfirm
                            title="Deseas eliminar el archivo?"
                            onConfirm={() => handleDelete(id)}
                        >
                            <Button
                                type="text"
                                icon={<FontAwesomeIcon icon={faTrash} />}
                            />
                        </Popconfirm>
                    </>
                ),
                visible: previewOpen,
                onVisibleChange: (visible) => {
                    if (!visible) {
                        setPreviewOpen(false);
                    }
                },
            }}
        />
    );
}

export default ImageResource;
