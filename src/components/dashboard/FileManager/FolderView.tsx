import {faFolder} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Dropdown, Popconfirm} from "antd";
import {useState} from "react";

interface FolderViewProps {
    id: string;
    name: string;
    handleFolderClick: (folderId: string) => void;
    handleDelete: (folderId: string) => void;
}

function FolderView({
    id,
    name,
    handleFolderClick,
    handleDelete,
}: FolderViewProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = (newOpen: boolean) => {
        setIsOpen(newOpen);
    };

    return (
        <Dropdown
            trigger={["contextMenu"]}
            menu={{
                items: [
                    {
                        key: 1,
                        label: "Ver folder",
                        onClick: () => handleFolderClick(id),
                    },
                    {
                        key: 2,
                        label: "Eliminar folder",
                        onClick: () => handleDelete(id),
                    },
                ],
            }}
        >
            <div className="w-full h-full bg-neutral-900 flex flex-col gap-2 justify-center items-center hover:text-primary hover:cursor-pointer">
                <Popconfirm
                    title="Desea eliminar la carpeta?"
                    open={isOpen}
                    onOpenChange={handleOpenChange}
                    className="flex flex-col justify-center items-center"
                />
                <div
                    className="w-full h-full bg-neutral-900 flex flex-col gap-2 justify-center items-center hover:text-primary hover:cursor-pointer"
                    onClick={() => handleFolderClick(id)}
                >
                    <FontAwesomeIcon icon={faFolder} className="text-2xl" />
                    <p>{name}</p>
                </div>
            </div>
        </Dropdown>
    );
}

export default FolderView;
