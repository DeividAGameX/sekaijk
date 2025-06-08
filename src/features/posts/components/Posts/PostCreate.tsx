"use client";
import {RootState} from "@/lib/store";
import {Form, Input, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useTranslations} from "next-intl";
import {useCreatePostMutation} from "../../lib/Posts.reducer";
import {CreatePost, Post} from "../../types/posts";
import {toggleOpen} from "../../lib/PostsStore.reducer";
import {useRouter} from "next/navigation";

function PostCreate() {
    const {open} = useSelector((state: RootState) => state.postProvider);
    const navigate = useRouter();
    const [createPost, {isLoading}] = useCreatePostMutation();
    const tCategory = useTranslations("posts.form");
    const tForm = useTranslations("components.form");
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const closeForm = () => {
        form.resetFields();
        dispatch(toggleOpen());
    };

    const finish = (data: Post) => {
        form.resetFields();
        dispatch(toggleOpen());
        navigate.push(`/dashboard/posts/${data.id}`);
    };

    const onSubmit = async () => {
        form.validateFields()
            .then((data: CreatePost) => {
                createPost(data).then((event) => {
                    finish(event.data);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Modal
            open={open}
            onCancel={closeForm}
            title={tCategory("title")}
            okText={tForm("create")}
            cancelText={tForm("cancel")}
            onOk={onSubmit}
            okButtonProps={{
                loading: isLoading,
            }}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name={"title"}
                    label={tCategory("title")}
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

export default PostCreate;
