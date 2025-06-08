import React, {useState} from "react";
import {Modal, Tabs, Upload, Button, UploadProps, message, Image} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {ResourceType} from "@prisma/client";
import {
    useDeleteResourceMutation,
    useGetResourcesQuery,
    useUploadResourceMutation,
} from "@/features/users/lib/resources.reducer";
import axios from "axios";
import CustomVideoPlayer from "./CustomVideoPlayer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import ImgCrop from "antd-img-crop";

const {TabPane} = Tabs;

interface FileManagerProps {
    isOpen: boolean;
    onClose: () => void;
    selectResource?: (url: string) => void;
    imgAspect?: number;
    accept?: ResourceType;
}

const FileManager: React.FC<FileManagerProps> = ({
    isOpen,
    onClose,
    selectResource,
    imgAspect,
    accept,
}) => {
    const [activeTab, setActiveTab] = useState<ResourceType>(
        ResourceType.IMAGE
    );
    const [previewOpen, setPreviewOpen] = useState("");
    const [messageApi, context] = message.useMessage();
    const {data: resources, isLoading} = useGetResourcesQuery("");
    const [uploadResource] = useUploadResourceMutation();
    const [deleteResource] = useDeleteResourceMutation();

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

    const handleDelete = async (resourceId: number) => {
        try {
            await deleteResource(resourceId);
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
            title="File Manager"
            open={isOpen}
            onCancel={onClose}
            width={800}
            footer={null}
        >
            {context}
            <Tabs
                activeKey={activeTab}
                onChange={(key) => setActiveTab(key as ResourceType)}
            >
                {(accept ? [accept] : Object.values(ResourceType)).map(
                    (type) => (
                        <TabPane tab={type} key={type}>
                            {type == "IMAGE" ? (
                                imgAspect ? (
                                    <ImgCrop aspect={imgAspect}>
                                        <Upload
                                            customRequest={handleUpload}
                                            fileList={[]}
                                            accept={getAcceptedFileTypes(type)}
                                        >
                                            <Button icon={<UploadOutlined />}>
                                                Upload {type}
                                            </Button>
                                        </Upload>
                                    </ImgCrop>
                                ) : (
                                    <Upload
                                        customRequest={handleUpload}
                                        fileList={[]}
                                        accept={getAcceptedFileTypes(type)}
                                    >
                                        <Button icon={<UploadOutlined />}>
                                            Upload {type}
                                        </Button>
                                    </Upload>
                                )
                            ) : (
                                <Upload
                                    customRequest={handleUpload}
                                    fileList={[]}
                                    accept={getAcceptedFileTypes(type)}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Upload {type}
                                    </Button>
                                </Upload>
                            )}

                            <div className="py-2 px-3">
                                {isLoading ? (
                                    <div className="flex justify-center items-center h-32">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
                                        {resources
                                            ?.filter(
                                                (resource) =>
                                                    resource.type === type
                                            )
                                            .map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="overflow-hidden rounded-2xl flex h-56"
                                                >
                                                    {item.type == "IMAGE" && (
                                                        <Image
                                                            src={
                                                                item.url ??
                                                                "/assets/FondoPortada.jpg"
                                                            }
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit:
                                                                    "cover",
                                                            }}
                                                            wrapperStyle={{
                                                                width: "100%",
                                                                height: "100%",
                                                            }}
                                                            alt={item.name}
                                                            preview={{
                                                                mask: (
                                                                    <>
                                                                        <Button
                                                                            type="text"
                                                                            icon={
                                                                                <FontAwesomeIcon
                                                                                    icon={
                                                                                        faCheck
                                                                                    }
                                                                                />
                                                                            }
                                                                            onClick={() =>
                                                                                handleSelect(
                                                                                    item.url
                                                                                )
                                                                            }
                                                                        />
                                                                        <Button
                                                                            type="text"
                                                                            icon={
                                                                                <FontAwesomeIcon
                                                                                    icon={
                                                                                        faEye
                                                                                    }
                                                                                />
                                                                            }
                                                                            onClick={() =>
                                                                                setPreviewOpen(
                                                                                    item.resourceId
                                                                                )
                                                                            }
                                                                        />
                                                                        <Button
                                                                            type="text"
                                                                            icon={
                                                                                <FontAwesomeIcon
                                                                                    icon={
                                                                                        faTrash
                                                                                    }
                                                                                />
                                                                            }
                                                                            onClick={() =>
                                                                                handleDelete(
                                                                                    item.id
                                                                                )
                                                                            }
                                                                        />
                                                                    </>
                                                                ),
                                                                visible:
                                                                    previewOpen ==
                                                                    item.resourceId,
                                                                onVisibleChange:
                                                                    (
                                                                        visible
                                                                    ) => {
                                                                        if (
                                                                            !visible
                                                                        ) {
                                                                            setPreviewOpen(
                                                                                ""
                                                                            );
                                                                        }
                                                                    },
                                                            }}
                                                        />
                                                    )}
                                                    {item.type == "VIDEO" && (
                                                        <CustomVideoPlayer
                                                            src={item.url}
                                                            onSelect={() => {
                                                                handleSelect(
                                                                    item.url
                                                                );
                                                            }}
                                                            onDelete={() => {
                                                                handleDelete(
                                                                    item.id
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>
                        </TabPane>
                    )
                )}
            </Tabs>
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
