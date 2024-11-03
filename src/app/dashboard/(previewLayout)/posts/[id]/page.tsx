"use client";
import {setTitulo} from "@/lib/storage/Reducers/layout.reducer";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    useGetPostByIdQuery,
    usePublishPostMutation,
    useSavePostMutation,
} from "@/lib/storage/Api/posts";
import {
    Collapse,
    Drawer,
    FloatButton,
    Form,
    Input,
    message,
    Select,
    Spin,
    Tag,
} from "antd";
import {useTranslations} from "next-intl";
import {useGetCategoriesQuery} from "@/lib/storage/Api/categories";
import {useGetTagsQuery} from "@/lib/storage/Api/tags";
import PostEditor from "@/components/admin/pages/posts/PostEditor";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import NavbarEdit from "@/components/admin/Layout/NavbarEdit";
import AdminDrawer from "@/components/admin/Layout/Drawer";
import {RootState} from "@/lib/storage/store";
import BannerImg from "@/components/admin/Forms/ImageSelect";
import {faInfo, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {AnimatePresence, motion} from "framer-motion";

function removeBrTags(str: string) {
    return str.replace(/<p><\/p>/g, "<br>");
}

const TagRender = (props: any) => {
    const {label, value, closable, onClose, tagList} = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    const color = tagList.find((i: any) => i.id === value)?.color;
    return (
        <Tag
            color={color}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{marginInlineEnd: 4}}
        >
            {label}
        </Tag>
    );
};

const InformationPost = ({
    data,
    infoPost,
    isRequired,
}: {
    data: any;
    infoPost: any;
    isRequired: boolean;
}) => {
    const t = useTranslations("posts.editForm");
    const {data: categories} = useGetCategoriesQuery({});
    const {data: tags} = useGetTagsQuery({});
    const {breakPoint} = useSelector((root: RootState) => root.layout);
    const [openInfo, setOpenInfo] = useState(false);

    useEffect(() => {
        if (data) {
            infoPost.setFieldsValue({
                id: data?.id,
                title: data?.title,
                description: data?.description,
                banner: data?.banner,
                categoryId: data?.categoryId,
                Tags: data?.Tags?.map((i: any) => i.id),
            });
        }
    }, [data]);

    return (
        <div className="max-w-96 md:min-w-96 px-1 md:p-2">
            {!breakPoint ? (
                <Collapse
                    bordered={false}
                    defaultActiveKey={"Info"}
                    className="w-full bg-body p-4 rounded-lg"
                    items={[
                        {
                            label: "Info",
                            key: "Info",
                            children: (
                                <Form form={infoPost} layout="vertical">
                                    <Form.Item
                                        name={"banner"}
                                        rules={[
                                            {
                                                required: isRequired,
                                                message: t("bannerRequired"),
                                            },
                                        ]}
                                    >
                                        <BannerImg
                                            className="h-48"
                                            sizeImg={1920 / 1080}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="title"
                                        label={t("titleLabel")}
                                        rules={[
                                            {
                                                required: true,
                                                message: t("titleRequired"),
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="description"
                                        label={t("descriptionLabel")}
                                        rules={[
                                            {
                                                required: true,
                                                message: t(
                                                    "descriptionRequired"
                                                ),
                                            },
                                        ]}
                                    >
                                        <Input.TextArea />
                                    </Form.Item>
                                    <Form.Item
                                        name="categoryId"
                                        label={t("category")}
                                        rules={[
                                            {
                                                required: isRequired,
                                                message: t("categoryRequired"),
                                            },
                                        ]}
                                    >
                                        <Select
                                            options={(categories || []).map(
                                                (i: any) => ({
                                                    value: i.id,
                                                    label: i.name,
                                                })
                                            )}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="Tags"
                                        label={t("tags")}
                                        rules={[
                                            {
                                                required: isRequired,
                                                message: t("tagsRequired"),
                                            },
                                        ]}
                                    >
                                        <Select
                                            mode="multiple"
                                            tagRender={(props) => (
                                                <TagRender
                                                    {...{
                                                        ...props,
                                                        tagList: tags || [],
                                                    }}
                                                />
                                            )}
                                            options={(tags || []).map(
                                                (i: any) => ({
                                                    value: i.id,
                                                    label: i.name,
                                                    color: i.color,
                                                })
                                            )}
                                        />
                                    </Form.Item>
                                </Form>
                            ),
                        },
                    ]}
                />
            ) : (
                <>
                    <FloatButton
                        icon={<FontAwesomeIcon icon={faInfo} />}
                        onClick={() => setOpenInfo(true)}
                    />
                    <Drawer open={openInfo} onClose={() => setOpenInfo(false)}>
                        <Form form={infoPost} layout="vertical">
                            <Form.Item
                                name={"banner"}
                                rules={[
                                    {
                                        required: isRequired,
                                        message: t("bannerRequired"),
                                    },
                                ]}
                            >
                                <BannerImg
                                    className="h-48"
                                    sizeImg={1920 / 1080}
                                />
                            </Form.Item>
                            <Form.Item
                                name="title"
                                label={t("titleLabel")}
                                rules={[
                                    {
                                        required: true,
                                        message: t("titleRequired"),
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label={t("descriptionLabel")}
                                rules={[
                                    {
                                        required: true,
                                        message: t("descriptionRequired"),
                                    },
                                ]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                                name="categoryId"
                                label={t("category")}
                                rules={[
                                    {
                                        required: isRequired,
                                        message: t("categoryRequired"),
                                    },
                                ]}
                            >
                                <Select
                                    options={(categories || []).map(
                                        (i: any) => ({
                                            value: i.id,
                                            label: i.name,
                                        })
                                    )}
                                />
                            </Form.Item>
                            <Form.Item
                                name="Tags"
                                label={t("tags")}
                                rules={[
                                    {
                                        required: isRequired,
                                        message: t("tagsRequired"),
                                    },
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    tagRender={(props) => (
                                        <TagRender
                                            {...{
                                                ...props,
                                                tagList: tags || [],
                                            }}
                                        />
                                    )}
                                    options={(tags || []).map((i: any) => ({
                                        value: i.id,
                                        label: i.name,
                                        color: i.color,
                                    }))}
                                />
                            </Form.Item>
                        </Form>
                    </Drawer>
                </>
            )}
        </div>
    );
};

function Page(props: {params: {id: string}}) {
    const dispatch = useDispatch();
    const {data, isLoading} = useGetPostByIdQuery(props.params.id);
    const t = useTranslations();
    const editor = useRef<any>();
    const [infoPost] = Form.useForm();
    const [isRequired, setIsRequired] = useState(false);
    const [savePost, {isLoading: saving}] = useSavePostMutation();
    const [publishPost, {isLoading: publishing}] = usePublishPostMutation();
    const [messageApi, contextHolder] = message.useMessage();

    const onPublish = () => {
        messageApi.open({
            key: "publishing",
            type: "loading",
            content: t("posts.editForm.serverStatus.publishing"),
        });
        setIsRequired(true);
        infoPost
            .validateFields()
            .then((e) => {
                if (
                    editor.current.getHTML() !== "" ||
                    !editor.current.getHTML() ||
                    editor.current.getHTML() !== "<p></p>"
                ) {
                    publishPost({
                        id: props.params.id,
                        ...e,
                        content: removeBrTags(editor.current.getHTML()),
                    })
                        .then((e) => {
                            messageApi.open({
                                key: "publishing",
                                type: "success",
                                content: t(
                                    "posts.editForm.serverStatus." +
                                        e.data?.message
                                ),
                            });
                            setIsRequired(false);
                        })
                        .catch((e) => {
                            messageApi.open({
                                key: "publishing",
                                type: "error",
                                content: t("api.errors." + e.message),
                            });
                        });
                } else {
                    messageApi.open({
                        key: "publishing",
                        type: "error",
                        content: t("posts.editForm.content"),
                    });
                }
            })
            .catch((e) => {
                messageApi.open({
                    key: "publishing",
                    type: "error",
                    content: e.errorFields[0].errors[0],
                });
            });
    };

    const onSaveDraft = () => {
        messageApi.open({
            key: "saveDraft",
            type: "loading",
            content: t("posts.editForm.serverStatus.saving"),
        });
        setIsRequired(false);
        console.log(removeBrTags(editor.current.getHTML()));
        savePost({
            id: props.params.id,
            ...infoPost.getFieldsValue(),
            content: removeBrTags(editor.current.getHTML()),
        })
            .then((e) => {
                messageApi.open({
                    key: "saveDraft",
                    type: "success",
                    content: t(
                        "posts.editForm.serverStatus." + e.data?.message
                    ),
                });
            })
            .catch((e) => {
                messageApi.open({
                    key: "saveDraft",
                    type: "error",
                    content: t("api.errors." + e.message),
                });
            });
    };

    useEffect(() => {
        dispatch(setTitulo("Editar post"));
    }, []);

    useEffect(() => {
        if (data && !isLoading) {
            dispatch(setTitulo(data.title));
            if (editor.current)
                editor.current.chain().setContent(data.content).run();
        }
    }, [data, isLoading]);

    return (
        <div className="h-screen flex flex-col">
            {contextHolder}
            <AdminDrawer />
            <NavbarEdit
                id={parseInt(props.params.id)}
                title={data?.title}
                saveDraft={onSaveDraft}
                saving={saving}
                publishPost={onPublish}
                publishing={publishing}
            />
            <div className="post-editor w-full h-full flex-1 flex flex-wrap gap-5 justify-center">
                <div className="w-full h-full md:flex-1 flex justify-center min-h-60">
                    <div className="bodyPost max-w-screen-lg w-full flex-1 editor-custom bg-body rounded-lg flex flex-col">
                        <PostEditor editor={editor} />
                    </div>
                </div>
                <InformationPost
                    data={data}
                    infoPost={infoPost}
                    isRequired={isRequired}
                />
            </div>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        className="bg-primary w-full h-screen z-50 fixed top-0 left-0 flex justify-center items-center"
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <Spin
                            size="large"
                            indicator={
                                <FontAwesomeIcon
                                    className="animate-spin"
                                    icon={faSpinner}
                                />
                            }
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Page;
