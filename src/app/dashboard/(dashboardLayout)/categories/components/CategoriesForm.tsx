import ModalForm from "@/components/admin/ModelForm";
import {
    useCreateCategoryMutation,
    useGetCategoryByIdQuery,
    useUpdateCategoryMutation,
} from "@/lib/storage/Api/categories";
import {Form, Input} from "antd";
import {useTranslations} from "next-intl";

interface CategoriesFormType {
    id?: number;
    isOpen: boolean;
    onClose: () => void;
}

function CategoriesForm({id, isOpen, onClose}: CategoriesFormType) {
    const t = useTranslations("categories");
    const {data: category, isFetching} = useGetCategoryByIdQuery(id, {
        skip: !id,
    });
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const onSubmit = (e: any) => {
        return id
            ? updateCategory({id, ...e}).then(console.log)
            : createCategory(e).then(console.log);
    };

    return (
        <ModalForm
            open={isOpen}
            title={t("header")}
            values={id ? category : null}
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
        </ModalForm>
    );
}

export default CategoriesForm;
