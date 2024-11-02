import {Button, Image, Modal, Tabs, Upload} from "antd";
import {useTranslations} from "next-intl";
import ImgCrop from "antd-img-crop";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faUpload} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
    useCreateImgUserMutation,
    useGetUserImgByIdQuery,
} from "@/lib/storage/Api/admin/users";

interface FileManagerProps {
    open: boolean;
    size?: number;
    selectFile?: (e: string) => void;
    selectFiles?: (e: string[]) => void;
    onClose: () => void;
}

function FileManager({
    open,
    selectFile,
    selectFiles,
    size,
    onClose,
}: FileManagerProps) {
    const t = useTranslations("posts");
    const {data: imgPost} = useGetUserImgByIdQuery({});
    const [createImgPost] = useCreateImgUserMutation();

    const uploadFile = (options: any) => {
        const {onSuccess, file, onProgress} = options;
        onProgress(25);
        file.percent = 25;
        const data = new FormData();
        data.append("file", file);
        data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME ?? "");
        data.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_UPLOAD_POST_IMAGE ?? ""
        );
        onProgress(50);
        file.percent = 50;
        axios
            .post(`${process.env.NEXT_PUBLIC_API_CLOUDINARY}/auto/upload`, data)
            .then(({data}) => {
                onProgress(75);
                file.percent = 75;
                onSuccess("ok");
                createImgPost({
                    name: data.asset_id,
                    resourceId: data.public_id,
                    url: data.secure_url,
                    type: "IMAGE",
                }).then(() => {
                    if (selectFiles) {
                    } else {
                        if (selectFile) {
                            selectFile(data.secure_url);
                        }
                    }
                });
            });
    };

    return (
        <Modal
            width={"1000px"}
            title={t("files.files")}
            open={open}
            maskClosable={false}
            onCancel={onClose}
            rootClassName="file-system-modal-root"
        >
            <Tabs
                tabPosition="left"
                items={[
                    {
                        key: "filesList",
                        label: t("files.files"),
                        children: (
                            <div className="grid grid-cols-1 gap-2  md:grid-cols-2 xl:grid-cols-3">
                                {(imgPost?.image || []).map((i: any) => (
                                    <div
                                        key={i.id}
                                        className="w-full h-full relative rounded-lg overflow-hidden"
                                    >
                                        <Image
                                            className="h-full w-full"
                                            src={i.url}
                                            alt=""
                                            preview={false}
                                        />
                                        <div className="w-full h-full absolute top-0 left-0 transition duration-200 p-2">
                                            <Button
                                                icon={
                                                    <FontAwesomeIcon
                                                        icon={faCheck}
                                                    />
                                                }
                                                onClick={() => {
                                                    if (selectFile)
                                                        selectFile(i.url);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ),
                    },
                    {
                        key: "uploadFiles",
                        label: selectFile
                            ? t("files.upload")
                            : t("files.uploads"),
                        children: (
                            <div>
                                <ImgCrop aspect={size ? size : 1920 / 1080}>
                                    <Upload.Dragger
                                        accept="image/*"
                                        listType="picture"
                                        multiple={selectFiles ? true : false}
                                        showUploadList={{
                                            showRemoveIcon: true,
                                            showPreviewIcon: true,
                                        }}
                                        fileList={[]}
                                        customRequest={uploadFile}
                                    >
                                        <div className="h-56 flex justify-center items-center hover:text-primary transition duration-150">
                                            <div>
                                                <p className="text-center">
                                                    <FontAwesomeIcon
                                                        icon={faUpload}
                                                        className="text-5xl"
                                                    />
                                                </p>
                                                <p className="text-center my-4">
                                                    {t("files.drop.title")}
                                                </p>
                                            </div>
                                        </div>
                                    </Upload.Dragger>
                                </ImgCrop>
                            </div>
                        ),
                    },
                ]}
            />
        </Modal>
    );
}

export default FileManager;
