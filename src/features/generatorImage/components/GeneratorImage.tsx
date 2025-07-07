import {useUploadResourceMutation} from "@/features/users/lib/resources.reducer";
import {Button, Form, Image, Input, Modal, Select, Spin} from "antd";
import axios from "axios";
import {useTranslations} from "next-intl";
import {useState} from "react";
import InputImage from "./Form/InputImage";

interface GeneratorImageProps {
    isOpen: boolean;
    urlBase?: string;
    paramDef: {[key: string]: string};
    category?: string;
    onSubmit: (e: string) => void;
    onClose: () => void;
    size?: "NORMAL" | "PHONE" | "ICON";
    typeImage?: string;
    topic?: string;
}

interface FormData {
    title: string;
    render?: string;
    banner?: string;
}

function GeneratorImage({
    isOpen,
    urlBase,
    paramDef,
    onSubmit,
    onClose,
}: GeneratorImageProps) {
    const [form] = Form.useForm();
    const tGenerator = useTranslations("components.generator");
    const [loading, setLoading] = useState(false);
    const [urlGenerator, setUrlGenerator] = useState(
        urlBase ?? "/api/v2/dashboard/generate"
    );
    const [uploadResource] = useUploadResourceMutation();

    const handleSubmit = (e: FormData) => {
        setLoading(true);
        console.log(e);
        const urlQuery = new URLSearchParams();
        if (paramDef)
            Object.entries(paramDef).forEach(([key, value]) => {
                if (value) urlQuery.append(key, value);
            });
        Object.entries(e).forEach(([key, value]) => {
            if (value) urlQuery.append(key, value);
        });
        setUrlGenerator((prev) => {
            if (prev === `${urlBase}?${urlQuery.toString()}`) {
                setLoading(false);
            }
            return `${urlBase}?${urlQuery.toString()}`;
        });
    };

    const getImage = async () => {
        const response = await axios.get(urlGenerator, {
            responseType: "arraybuffer",
        });
        const imageBuffer = Buffer.from(response.data, "binary");
        const base64Image = Buffer.from(imageBuffer).toString("base64");
        const dataUri = `data:image/png;base64,${base64Image}`;
        const data = new FormData();
        data.append("file", dataUri);
        data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME ?? "");
        data.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_UPLOAD_PRESET ?? ""
        );
        axios
            .post(`${process.env.NEXT_PUBLIC_API_CLOUDINARY}/auto/upload`, data)
            .then(async ({data}) => {
                try {
                    const resource = await uploadResource({
                        name: data.asset_id ?? "",
                        resourceId: data.public_id ?? "",
                        url: data.secure_url ?? "",
                        type: data.resource_type.toUpperCase() ?? "",
                        typeForm: "RESOURCE",
                        usersFoldersId: null,
                    });
                    onSubmit(resource.data.url);
                } catch (error) {
                    console.log(error);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title="Generator Image"
            open={isOpen}
            onCancel={handleCancel}
            width={1250}
            onOk={getImage}
            okText={tGenerator("save")}
            classNames={{
                body: "flex flex-col gap-2 lg:flex-row",
            }}
        >
            <Spin
                spinning={loading}
                wrapperClassName="max-w-[1200px] max-h-[630px]"
            >
                <Image
                    src={urlGenerator}
                    alt="IMG"
                    onLoad={() => setLoading(false)}
                />
            </Spin>
            <Form
                className="w-full lg:max-w-72"
                layout="vertical"
                form={form}
                onFinish={handleSubmit}
                initialValues={paramDef}
            >
                <Form.Item name="template" label={tGenerator("field.template")}>
                    <Select
                        defaultValue={"template1"}
                        options={[
                            {value: "template1", label: "Diseño 1"},
                            {value: "template2", label: "Diseño 2"},
                            {value: "template3", label: "Diseño 3"},
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    name="text1"
                    label={tGenerator("field.text1")}
                    rules={[
                        {
                            required: true,
                            message: tGenerator("field.text1Required"),
                        },
                    ]}
                >
                    <Input maxLength={40} />
                </Form.Item>
                <Form.Item name="text2" label={tGenerator("field.text2")}>
                    <Input maxLength={20} />
                </Form.Item>
                <Form.Item name="img1" label={tGenerator("field.img1")}>
                    <InputImage />
                </Form.Item>
                <Form.Item name="img2" label={tGenerator("field.img2")}>
                    <InputImage />
                </Form.Item>
                <Button block htmlType="submit">
                    {tGenerator("field.submit")}
                </Button>
            </Form>
        </Modal>
    );
}

export default GeneratorImage;
