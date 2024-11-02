import {Form, message, Modal} from "antd";
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";

interface ModelFormType {
    children: React.ReactNode;
    title?: string;
    open: boolean;
    isLoading?: boolean;
    values?: any;
    onFinish: (e: any) => void;
    onCancel: () => void;
}

function ModalForm({
    open,
    title,
    isLoading,
    values,
    onFinish,
    onCancel,
    children,
}: ModelFormType) {
    const [form] = Form.useForm();
    const t = useTranslations("api.errors");
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [apiMessage, contentMessage] = message.useMessage();
    const submitData = async () => {
        setConfirmLoading(true);
        try {
            await form.validateFields().then(onFinish);
            form.resetFields();
            onCancel();
            setConfirmLoading(false);
        } catch (error: any) {
            if (error.message) {
                apiMessage.error(t(error.message));
            } else {
                apiMessage.error(t("api.error.unknown"));
            }
            console.log(error);
            setConfirmLoading(false);
        }
    };
    const cancel = () => {
        onCancel();
        form.resetFields();
    };

    useEffect(() => {
        if (!isLoading) {
            if (values) {
                form.setFieldsValue(values);
            }
        }
    }, [values, isLoading]);

    return (
        <Modal
            open={open}
            title={title}
            onOk={submitData}
            onCancel={cancel}
            onClose={cancel}
            loading={isLoading}
            confirmLoading={confirmLoading}
        >
            {contentMessage}
            <Form form={form} layout="vertical">
                {children}
            </Form>
        </Modal>
    );
}

export default ModalForm;
