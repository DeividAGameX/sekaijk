//* TipTap Import
import {Editor, EditorProvider, useCurrentEditor} from "@tiptap/react";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";
import Link from "@tiptap/extension-link";
import Blockquote from "@tiptap/extension-blockquote";
import Highlighter from "@tiptap/extension-highlight";
import {TwitterEmbed} from "../../PostEditor/Form/Extensions/Twitter";
//*
import StarterKit from "@tiptap/starter-kit";
import {Avatar, Button, Form, Input, Modal, Select, Tooltip} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faRedo, faUndo} from "@fortawesome/free-solid-svg-icons";
// import FileManager from "@/components/admin/FileManager/FileManager";
import {RefObject, useState} from "react";
import {Comments} from "../../PostEditor/Form/Extensions/Comments";
import {useTranslations} from "next-intl";
import useUserSession from "@/hooks/useUserSession";
import {v4 as uuidv4} from "uuid";

type InsertCommentProps = {
    id: string;
    comment: string;
    type: string;
    author: string;
};

function InsertComment({
    open,
    onClose,
    onSubmit,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: (props: InsertCommentProps) => void;
}) {
    const [form] = Form.useForm();
    const tForm = useTranslations("posts.review");
    const {user, loading} = useUserSession();

    const callInfo = () => {
        form.validateFields().then(
            (values: {type: string; comment: string}) => {
                onSubmit({
                    id: uuidv4(),
                    comment: values.comment,
                    type: values.type,
                    author: user?.name ?? "",
                });
                form.resetFields();
            }
        );
    };

    const cancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            open={open}
            title={
                !loading && user ? (
                    <div className="flex gap-2 items-center">
                        <Avatar src={user.avatar} />
                        <p>{user.name}</p>
                    </div>
                ) : (
                    <>...</>
                )
            }
            onOk={callInfo}
            onClose={cancel}
            onCancel={cancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name={"type"}
                    label={tForm("type_comment")}
                    rules={[
                        {
                            required: true,
                            message: tForm("error.type_comment_required"),
                        },
                    ]}
                >
                    <Select
                        options={[
                            {
                                label: "Corregir",
                                value: "comment-correction",
                            },
                            {
                                label: "Eliminar",
                                value: "comment-delete",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label={tForm("comment")}
                    name="comment"
                    rules={[
                        {
                            required: true,
                            message: tForm("error.comment_required"),
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
}

function MenuBar() {
    const {editor} = useCurrentEditor();
    const [open, setOpen] = useState(false);

    if (!editor) {
        return null;
    }

    const handleComment = (event: InsertCommentProps) => {
        editor
            .chain()
            .addComment(event.id, event.author, event.comment, event.type)
            .run();
        setOpen(false);
    };

    return (
        <div className="bg-primary rounded-2xl overflow-hidden md:bg-transparent">
            <div className="w-full flex flex-row flex-nowrap items-center  overflow-auto rounded-2xl gap-2 p-2 sticky top-1 z-10">
                <div className="flex gap-2 bg-primary p-1 rounded-lg">
                    <Tooltip title="Regresar">
                        <Button
                            type="text"
                            disabled={!editor.can().undo()}
                            icon={<FontAwesomeIcon icon={faUndo} />}
                            onClick={() => editor.chain().undo().run()}
                        />
                    </Tooltip>
                    <Tooltip title="Regresar">
                        <Button
                            disabled={!editor.can().redo()}
                            type="text"
                            icon={<FontAwesomeIcon icon={faRedo} />}
                            onClick={() => editor.chain().redo().run()}
                        />
                    </Tooltip>
                </div>
                <div className="flex gap-2 bg-primary p-1 rounded-lg">
                    <Tooltip title="Comentar">
                        <Button
                            type="text"
                            icon={<FontAwesomeIcon icon={faComment} />}
                            onClick={() => setOpen(true)}
                        />
                    </Tooltip>
                </div>
            </div>
            <InsertComment
                open={open}
                onSubmit={handleComment}
                onClose={() => setOpen(false)}
            />
        </div>
    );
}

const extensions = [
    Image,
    TextStyle.configure({HTMLAttributes: [ListItem.name]}),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
    Underline,
    TextAlign.configure({
        types: ["heading", "paragraph"],
    }),
    Youtube.configure({
        controls: false,
        nocookie: true,
        addPasteHandler: false,
    }),
    Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
            class: "text-primary",
        },
    }),
    Blockquote,
    Highlighter,
    TwitterEmbed,
    Comments,
];

function ReviewEditor({
    defaultValue,
    editor,
}: {
    defaultValue: string;
    editor: RefObject<Editor | null>;
}) {
    return (
        <div className="max-w-screen-lg snap-center w-full h-full flex flex-col relative p-2 rounded-lg bg-neutral-950">
            <EditorProvider
                content={defaultValue}
                slotBefore={<MenuBar />}
                onBeforeCreate={(e) => {
                    if (e) {
                        if (e.editor) {
                            editor.current = e.editor;
                        }
                    }
                }}
                extensions={extensions}
                editable={false}
                editorContainerProps={{
                    className:
                        "postEditor w-full h-full flex-1 flex px-4 article bg-neutral-950",
                    contentEditable: false,
                }}
            />
        </div>
    );
}

export default ReviewEditor;
