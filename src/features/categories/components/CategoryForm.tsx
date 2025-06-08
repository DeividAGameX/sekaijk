"use client";
import {RootState} from "@/lib/store";
import {Form, Input, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
    setId,
    toggleOpen,
} from "@/features/categories/lib/CategoryModal.reducer";
import {useTranslations} from "next-intl";
import {
    useCreateCategoryMutation,
    useGetCategoryQuery,
    useUpdateCategoryMutation,
} from "@/features/categories/lib/Categories.reducer";
import {CategoryForm as CategoryFormType} from "@/features/categories/types/category";
import {useEffect} from "react";

function CategoryForm() {
    const {id, open} = useSelector((state: RootState) => state.categoryModel);
    const [createCategory, {isLoading}] = useCreateCategoryMutation();
    const [updateCategory, {isLoading: updating}] = useUpdateCategoryMutation();
    const {data: category, isLoading: loadingCategory} = useGetCategoryQuery(
        id ?? "",
        {
            skip: !id,
        }
    );
    const tCategory = useTranslations("categories.form");
    const tForm = useTranslations("components.form");
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const closeForm = () => {
        form.resetFields();
        dispatch(toggleOpen());
        dispatch(setId(null));
    };

    const finish = () => {
        form.resetFields();
        dispatch(toggleOpen());
        dispatch(setId(null));
    };

    const onSubmit = async () => {
        form.validateFields()
            .then((data: CategoryFormType) => {
                if (id) {
                    updateCategory({id, ...data}).then(finish);
                } else {
                    createCategory(data).then(finish);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (id) {
            if (!loadingCategory && category) {
                form.setFields(
                    Object.entries(category as CategoryFormType).map((c) => ({
                        name: c[0],
                        value: c[1],
                    }))
                );
            }
        }
    }, [id, category, loadingCategory, form]);

    return (
        <Modal
            open={open}
            onCancel={closeForm}
            title={tCategory("title")}
            okText={id ? tForm("save") : tForm("create")}
            cancelText={tForm("cancel")}
            onOk={onSubmit}
            okButtonProps={{
                loading: isLoading || updating,
            }}
            loading={loadingCategory}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name={"name"}
                    label={tCategory("name")}
                    rules={[
                        {
                            max: 150,
                            message: tForm("error.max150"),
                        },
                        {
                            required: true,
                            message: tForm("error.require"),
                        },
                    ]}
                >
                    <Input maxLength={150} />
                </Form.Item>
                <Form.Item
                    name={"description"}
                    label={tCategory("description")}
                    rules={[
                        {
                            max: 500,
                            message: tForm("error.max500"),
                        },
                        {
                            required: true,
                            message: tForm("error.require"),
                        },
                    ]}
                >
                    <Input.TextArea maxLength={500} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CategoryForm;
