"use client";
import {RootState} from "@/lib/store";
import {ColorPicker, Form, Input, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setId, toggleOpen} from "@/features/tags/lib/TagModal.reducer";
import {useTranslations} from "next-intl";
import {
    useCreateTagMutation,
    useGetTagQuery,
    useUpdateTagMutation,
} from "@/features/tags/lib/Tags.reducer";
import {TagForm as TagFormType} from "@/features/tags/types/tag";
import {useEffect} from "react";

function TagForm() {
    const {id, open} = useSelector((state: RootState) => state.tagModal);
    const [createTag, {isLoading}] = useCreateTagMutation();
    const [updateTag, {isLoading: updating}] = useUpdateTagMutation();
    const {data: tag, isLoading: loadingTag} = useGetTagQuery(id ?? "", {
        skip: !id,
    });
    const tTag = useTranslations("tags.form");
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
            .then((data) => {
                let color = "";
                if (typeof data.color == "object") {
                    color = `#${data.color.toHex()}`;
                } else {
                    color = data.color;
                }
                if (id) {
                    updateTag({id, ...data, color}).then(finish);
                } else {
                    createTag({...data, color}).then(finish);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (id) {
            if (!loadingTag && tag) {
                form.setFields(
                    Object.entries(tag as TagFormType).map((t) => ({
                        name: t[0],
                        value: t[1],
                    }))
                );
            }
        }
    }, [id, tag, loadingTag, form]);

    return (
        <Modal
            open={open}
            onCancel={closeForm}
            title={tTag("title")}
            okText={id ? tForm("save") : tForm("create")}
            cancelText={tForm("cancel")}
            onOk={onSubmit}
            okButtonProps={{
                loading: isLoading || updating,
            }}
            loading={loadingTag}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name={"name"}
                    label={tTag("name")}
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
                    label={tTag("description")}
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
                <Form.Item
                    name={"color"}
                    label={tTag("color")}
                    rules={[
                        {
                            required: true,
                            message: tForm("error.require"),
                        },
                    ]}
                >
                    <ColorPicker defaultValue="#1677ff" />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default TagForm;
