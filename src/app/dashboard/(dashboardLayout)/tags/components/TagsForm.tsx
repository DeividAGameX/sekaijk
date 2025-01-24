import ModalForm from "@/components/admin/ModelForm";
import {
    useCreateTagMutation,
    useGetTagByIdQuery,
    useUpdateTagMutation,
} from "@/lib/storage/Api/tags";
import {ColorPicker, Form, Input} from "antd";
import {useTranslations} from "next-intl";

interface TagsFormType {
    id?: number;
    isOpen: boolean;
    onClose: () => void;
}

function TagsForm({id, isOpen, onClose}: TagsFormType) {
    const t = useTranslations("tags");
    const {data: tag, isFetching} = useGetTagByIdQuery(id, {
        skip: !id,
    });
    const [createTag] = useCreateTagMutation();
    const [updateTag] = useUpdateTagMutation();

    const onSubmit = (e: any) => {
        const colorHex = e.color.toHexString();
        return id
            ? updateTag({id, ...e, color: colorHex}).then(console.log)
            : createTag({...e, color: colorHex}).then(console.log);
    };

    return (
        <ModalForm
            open={isOpen}
            title={t("header")}
            values={id ? tag : null}
            onFinish={onSubmit}
            onCancel={onClose}
            isLoading={isFetching}
        >
            <Form.Item
                name={"name"}
                label={t("form.nameLabel")}
                rules={[
                    {required: true, message: t("form.nameRequired")},
                    {max: 150, message: t("form.nameMaxLength")},
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={"description"}
                label={t("form.descriptionLabel")}
                rules={[
                    {required: true, message: t("form.descriptionRequired")},
                    {max: 500, message: t("form.descriptionMaxLength")},
                ]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                name={"color"}
                label={t("form.colorLabel")}
                rules={[{required: true, message: t("form.colorRequired")}]}
            >
                <ColorPicker format="hex" showText />
            </Form.Item>
        </ModalForm>
    );
}

export default TagsForm;
