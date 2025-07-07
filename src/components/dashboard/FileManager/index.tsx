import React, {useState} from "react";
import {Modal, Upload, Button, UploadProps, message, Tooltip, Spin} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {ResourceType} from "@prisma/client";
import {
    useDeleteFolderMutation,
    useDeleteResourceMutation,
    useGetResourcesQuery,
    useUploadResourceMutation,
} from "@/features/users/lib/resources.reducer";
import axios from "axios";
import CustomVideoPlayer from "./CustomVideoPlayer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faFolderPlus} from "@fortawesome/free-solid-svg-icons";
import ImgCrop from "antd-img-crop";
import FolderCreateForm from "./FileManagerFolderForm";
import ImageResource from "./ImageResource";
import FolderView from "./FolderView";

interface FileManagerProps {
    isOpen: boolean;
    onClose: () => void;
    selectResource?: (url: string) => void;
    imgAspect?: number;
    accept?: ResourceType[];
}

interface FolderProps {
    name: string;
    parentId: string | null;
}

const FileManager: React.FC<FileManagerProps> = ({
    isOpen,
    onClose,
    selectResource,
    imgAspect,
    accept,
}) => {
    const [modelFolder, setModelFolder] = useState(false);
    const [folderId, setFolderId] = useState<string>("");
    const [messageApi, context] = message.useMessage();
    const {data: userResources, isLoading} = useGetResourcesQuery(folderId);
    const [
        uploadResource,
        {isError: errorUpload, isLoading: uploadingResource},
    ] = useUploadResourceMutation();
    const [deleteResource, {isLoading: deletingResource}] =
        useDeleteResourceMutation();
    const [deleteFolder, {isLoading: deletingFolder}] =
        useDeleteFolderMutation();

    const handleUpload: UploadProps["customRequest"] = async (options) => {
        const {onSuccess, file, onProgress, onError} = options;
        const data = new FormData();
        data.append("file", file);
        data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME ?? "");
        data.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_UPLOAD_PRESET ?? ""
        );
        axios
            .post(
                `${process.env.NEXT_PUBLIC_API_CLOUDINARY}/auto/upload`,
                data,
                {
                    onUploadProgress: ({total, loaded}) => {
                        onProgress?.({
                            percent: Math.round((loaded / (total || 1)) * 100),
                        });
                    },
                }
            )
            .then(async ({data}) => {
                try {
                    console.log(data);
                    const resource = await uploadResource({
                        name: data.asset_id ?? "",
                        resourceId: data.public_id ?? "",
                        url: data.secure_url ?? "",
                        type: data.resource_type.toUpperCase() ?? "",
                        typeForm: "RESOURCE",
                        usersFoldersId: userResources?.id ?? null,
                    });
                    console.log(resource);
                    if (onSuccess) onSuccess(data, new XMLHttpRequest());
                    messageApi.success("File uploaded successfully");
                } catch (error) {
                    console.log(error);
                    onError?.({
                        name: "Network Error",
                        message: "Failed to upload file",
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                onError?.({
                    name: "Network Error",
                    message: "Failed to upload file",
                });
            });
    };

    const handleCreateFolder = async (data: FolderProps) => {
        await uploadResource({
            ...data,
            typeForm: "FOLDER",
        });
        if (errorUpload) {
            messageApi.error("Failed to create folder");
            return Promise.resolve(false);
        }
        messageApi.success("File uploaded successfully");
        setModelFolder(false);
        return Promise.resolve(true);
    };

    const handleDelete = async (resourceId: number) => {
        try {
            await deleteResource(resourceId);
            messageApi.success("File deleted successfully");
        } catch (error) {
            console.log(error);
            messageApi.error("Failed to delete file");
        }
    };

    const handleDeleteFolder = async (folderId: string) => {
        try {
            await deleteFolder(folderId);
            messageApi.success("File deleted successfully");
        } catch (error) {
            console.log(error);
            messageApi.error("Failed to delete file");
        }
    };

    const handleSelect = (url: string) => {
        if (selectResource) {
            selectResource(url);
        }
    };

    return (
        <Modal
            title={
                <div className="flex items-center gap-4">
                    {userResources?.id && (
                        <Tooltip title={"Volver"}>
                            <Button
                                type="text"
                                onClick={() => {
                                    if (userResources?.parentId) {
                                        setFolderId(
                                            `folder=${userResources?.parentId}`
                                        );
                                    } else {
                                        setFolderId("");
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </Button>
                        </Tooltip>
                    )}
                    <p>Archivos</p>
                    <Tooltip title={"Agregar una carpeta"}>
                        <Button
                            type="text"
                            onClick={() => setModelFolder(true)}
                        >
                            <FontAwesomeIcon icon={faFolderPlus} />
                        </Button>
                    </Tooltip>
                </div>
            }
            open={isOpen}
            onCancel={onClose}
            width={1200}
            footer={null}
        >
            {context}
            {imgAspect ? (
                <ImgCrop aspect={imgAspect}>
                    <Upload
                        customRequest={handleUpload}
                        fileList={[]}
                        accept={"image/*"}
                    >
                        <Button icon={<UploadOutlined />}>Upload {}</Button>
                    </Upload>
                </ImgCrop>
            ) : (
                <Upload
                    customRequest={handleUpload}
                    fileList={[]}
                    accept={(accept ?? [])
                        .map((t) => getAcceptedFileTypes(t))
                        .join(",")}
                >
                    <Button icon={<UploadOutlined />}>Upload {}</Button>
                </Upload>
            )}

            <Spin
                wrapperClassName="py-2 px-3 h-[620px] overflow-auto"
                rootClassName="py-2 px-3 h-[620px] overflow-auto"
                spinning={
                    isLoading ||
                    uploadingResource ||
                    deletingResource ||
                    deletingFolder
                }
            >
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {(userResources?.children ?? []).map((item, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl flex h-56"
                        >
                            <FolderView
                                id={item.id}
                                name={item.name}
                                handleFolderClick={(folder) => {
                                    console.log(folder);
                                    setFolderId(`folder=${folder}`);
                                }}
                                handleDelete={handleDeleteFolder}
                            />
                        </div>
                    ))}
                    {(userResources?.Resources ?? []).map((item, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl flex h-56"
                        >
                            {item.type == "IMAGE" && (
                                <ImageResource
                                    id={item.id}
                                    name={item.name}
                                    url={item.url}
                                    handleSelect={handleSelect}
                                    handleDelete={handleDelete}
                                />
                            )}
                            {(item.type == "VIDEO" || item.type == "AUDIO") && (
                                <CustomVideoPlayer
                                    src={item.url}
                                    onSelect={() => {
                                        handleSelect(item.url);
                                    }}
                                    onDelete={() => {
                                        handleDelete(item.id);
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </Spin>
            <FolderCreateForm
                isOpen={modelFolder}
                idFolder={userResources?.id ?? null}
                onSubmit={handleCreateFolder}
                onClose={() => setModelFolder(false)}
            />
        </Modal>
    );
};

const getAcceptedFileTypes = (type: ResourceType): string => {
    switch (type) {
        case ResourceType.VIDEO:
            return "video/*";
        case ResourceType.AUDIO:
            return "audio/*";
        case ResourceType.DOCUMENT:
            return ".pdf,.doc,.docx,.txt";
        case ResourceType.IMAGE:
            return "image/*";
        default:
            return "";
    }
};

export default FileManager;
