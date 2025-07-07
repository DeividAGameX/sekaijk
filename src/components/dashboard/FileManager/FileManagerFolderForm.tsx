import {Form, Input, Modal} from "antd";
import {useState} from "react";

interface FolderProps {
    name: string;
    parentId: string | null;
}

interface FileManagerProps {
    isOpen: boolean;
    idFolder: string | null;
    onClose: () => void;
    onSubmit: (e: FolderProps) => Promise<boolean>;
}

function FolderCreateForm({
    isOpen,
    idFolder,
    onClose,
    onSubmit,
}: FileManagerProps) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handlerSubmit = () => {
        form.validateFields().then((values) => {
            setLoading(true);
            onSubmit({
                name: values.name,
                parentId: idFolder,
            });
            setLoading(false);
        });
    };

    return (
        <Modal
            title="Create folder"
            open={isOpen}
            onOk={handlerSubmit}
            onCancel={onClose}
            confirmLoading={loading}
        >
            <Form layout="vertical" form={form}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input folder name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default FolderCreateForm;
