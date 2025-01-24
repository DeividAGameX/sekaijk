"use client";
import {setTitulo} from "@/lib/storage/Reducers/layout.reducer";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {
    useGetPostByIdQuery,
    usePublishPostMutation,
    useSavePostMutation,
} from "@/lib/storage/Api/posts";
import {Form, message, Spin} from "antd";
import {useTranslations} from "next-intl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import NavbarEdit from "@/components/admin/Layout/NavbarEdit";
import AdminDrawer from "@/components/admin/Layout/Drawer";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {AnimatePresence, motion} from "framer-motion";
import DOMPurify from "isomorphic-dompurify";
import InformationPost from "./components/MetaForm";
import PostEditor from "./components/Editor";

function removeBrTags(str: string) {
    return str.replace(/<p><\/p>/g, "<br>");
}

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
                        content: DOMPurify.sanitize(
                            removeBrTags(editor.current.getHTML()),
                            {
                                ADD_TAGS: ["iframe", "twitter"],
                            }
                        ),
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
                console.log(e);
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
        console.log(editor.current);
        savePost({
            id: props.params.id,
            ...infoPost.getFieldsValue(),
            content: editor.current.getHTML(),
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
