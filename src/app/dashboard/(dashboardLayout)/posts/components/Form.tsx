import React from "react";
import {Modal, Form, Input} from "antd";
import {useTranslations} from "next-intl";

interface PostFormProps {
    onFinish: (values: any) => Promise<void>;
    open: boolean;
    loading: boolean;
    onClose: () => void;
}

const PostForm: React.FC<PostFormProps> = ({
    onFinish,
    open,
    loading,
    onClose,
}) => {
    const [form] = Form.useForm();
    const t = useTranslations("posts.createForm");

    const handleSubmit = async (values: any) => {
        try {
            await onFinish(values);
            form.resetFields();
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title={t("title")}
            open={open}
            onOk={form.submit}
            onCancel={handleClose}
            confirmLoading={loading}
            okText={t("create")}
            cancelText={t("cancel")}
        >
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item
                    name="title"
                    label={t("titleLabel")}
                    rules={[
                        {required: true, message: t("titleRequired")},
                        {max: 150, message: t("titleMaxLength")},
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label={t("descriptionLabel")}
                    rules={[
                        {required: true, message: t("descriptionRequired")},
                        {max: 500, message: t("descriptionMaxLength")},
                    ]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PostForm;
