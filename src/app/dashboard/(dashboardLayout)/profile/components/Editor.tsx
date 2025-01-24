//* TipTap Import
import {EditorContent, useEditor, Editor} from "@tiptap/react";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Blockquote from "@tiptap/extension-blockquote";
import Highlighter from "@tiptap/extension-highlight";
//*
import StarterKit from "@tiptap/starter-kit";
import {Button, Input, Modal, Tooltip} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBold,
    faItalic,
    faLink,
    faList,
    faListNumeric,
    faQuoteLeft,
    faRedo,
    faUnderline,
    faUndo,
} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

const extensions = [
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
];

function InsertLink({
    open,
    title,
    onClose,
    onSubmit,
}: {
    open: boolean;
    title: string;
    onClose: () => void;
    onSubmit: (link: string) => void;
}) {
    const [urlValue, setUrlValue] = useState("");

    const callInfo = () => {
        onSubmit(urlValue);
        setUrlValue("");
    };

    return (
        <Modal
            open={open}
            title={title}
            onOk={callInfo}
            onClose={onClose}
            onCancel={onClose}
        >
            <Input
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                placeholder="Ingrese URL"
            />
        </Modal>
    );
}

function MenuBar({editor}: {editor: Editor}) {
    // const {editor} = useCurrentEditor();
    const [openLink, setOpenLink] = useState(false);

    if (!editor) {
        return null;
    }

    return (
        <div className="w-full flex flex-col items-center justify-center bg-primary rounded-t-lg gap-2 p-2 top-1 z-10 md:flex-row md:justify-between">
            <div className="flex flex-wrap gap-2 p-1">
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
                <Tooltip title="Bold">
                    <Button
                        type={editor.isActive("bold") ? "primary" : "text"}
                        icon={<FontAwesomeIcon icon={faBold} />}
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                    />
                </Tooltip>
                <Tooltip title="Italic">
                    <Button
                        type={editor.isActive("italic") ? "primary" : "text"}
                        icon={<FontAwesomeIcon icon={faItalic} />}
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                    />
                </Tooltip>
                <Tooltip title="Subrayar">
                    <Button
                        type={editor.isActive("underline") ? "primary" : "text"}
                        icon={<FontAwesomeIcon icon={faUnderline} />}
                        onClick={() =>
                            editor.chain().focus().toggleUnderline().run()
                        }
                    />
                </Tooltip>
                <Tooltip title="Blockquote">
                    <Button
                        type={
                            editor.isActive("blockquote") ? "primary" : "text"
                        }
                        icon={<FontAwesomeIcon icon={faQuoteLeft} />}
                        onClick={() =>
                            editor.chain().focus().toggleUnderline().run()
                        }
                    />
                </Tooltip>
                <Button
                    type={editor.isActive("bulletList") ? "primary" : "text"}
                    icon={<FontAwesomeIcon icon={faList} />}
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                />
                <Button
                    type={editor.isActive("orderedList") ? "primary" : "text"}
                    icon={<FontAwesomeIcon icon={faListNumeric} />}
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                />
                <Button
                    type="text"
                    icon={<FontAwesomeIcon icon={faLink} />}
                    onClick={() => setOpenLink(true)}
                />
            </div>
            <InsertLink
                title="URL a agregar"
                open={openLink}
                onSubmit={(url) => {
                    setOpenLink(false);
                    editor
                        .chain()
                        .focus()
                        .extendMarkRange("link")
                        .setLink({href: url})
                        .run();
                }}
                onClose={() => setOpenLink(false)}
            />
        </div>
    );
}

function DescriptionEditor({
    value,
    onChange,
}: {
    value?: any;
    onChange?: (e: any) => void;
}) {
    const editor = useEditor({
        extensions: extensions,
        content: value,
        onUpdate: (e) => {
            if (onChange) onChange(e.editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor) {
            editor.chain().setContent(value).run();
        }
    }, [editor]);

    return (
        <>
            {editor && <MenuBar editor={editor} />}
            <EditorContent
                editor={editor}
                className="postEditor w-full flex-1 flex pt-2 pb-4 px-4 rounded-b-lg border-[--background] border-b-2 border-l-2 border-r-2"
            />
        </>
    );
}

export default DescriptionEditor;
