//* TipTap Import
import {Editor, EditorProvider, useCurrentEditor} from "@tiptap/react";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
//*
import StarterKit from "@tiptap/starter-kit";
import {Button, Dropdown, Input, Modal, Tooltip} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAlignCenter,
    faAlignJustify,
    faAlignLeft,
    faAlignRight,
    faBold,
    faCaretDown,
    // faImage,
    faItalic,
    faLink,
    faList,
    faListNumeric,
    faQuoteLeft,
    faRedo,
    faUnderline,
    faUndo,
} from "@fortawesome/free-solid-svg-icons";
import {RefObject, useState} from "react";

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

function MenuBar() {
    const {editor} = useCurrentEditor();
    const [openLink, setOpenLink] = useState(false);
    if (!editor) {
        return null;
    }

    const alignItems = [
        {
            key: "left",
            value: "left",
            className: `${
                editor.isActive({textAlign: "left"}) ? "bg-active" : ""
            }`,
            label: <FontAwesomeIcon icon={faAlignLeft} />,
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
        },
        {
            key: "center",
            value: "center",
            className: `${
                editor.isActive({textAlign: "center"}) ? "bg-active" : ""
            }`,
            label: <FontAwesomeIcon icon={faAlignCenter} />,
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
        },
        {
            key: "right",
            value: "right",
            className: `${
                editor.isActive({textAlign: "right"}) ? "bg-active" : ""
            }`,
            label: <FontAwesomeIcon icon={faAlignRight} />,
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
        },
        {
            key: "justify",
            value: "justify",
            className: `${
                editor.isActive({textAlign: "justify"}) ? "bg-active" : ""
            }`,
            label: <FontAwesomeIcon icon={faAlignJustify} />,
            onClick: () => editor.chain().focus().setTextAlign("justify").run(),
        },
    ];

    return (
        <div className="bg-primary rounded-2xl overflow-hidden md:bg-transparent mb-2">
            <div className="w-full flex flex-row flex-nowrap overflow-auto items-center rounded-2xl gap-2 p-2 sticky top-1 z-10 md:justify-between">
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
                            type={
                                editor.isActive("italic") ? "primary" : "text"
                            }
                            icon={<FontAwesomeIcon icon={faItalic} />}
                            onClick={() =>
                                editor.chain().focus().toggleItalic().run()
                            }
                        />
                    </Tooltip>
                    <Tooltip title="Subrayar">
                        <Button
                            type={
                                editor.isActive("underline")
                                    ? "primary"
                                    : "text"
                            }
                            icon={<FontAwesomeIcon icon={faUnderline} />}
                            onClick={() =>
                                editor.chain().focus().toggleUnderline().run()
                            }
                        />
                    </Tooltip>
                    <Tooltip title="Blockquote">
                        <Button
                            type={
                                editor.isActive("blockquote")
                                    ? "primary"
                                    : "text"
                            }
                            icon={<FontAwesomeIcon icon={faQuoteLeft} />}
                            onClick={() =>
                                editor.chain().focus().toggleUnderline().run()
                            }
                        />
                    </Tooltip>
                    <Dropdown
                        placement="bottomCenter"
                        menu={{
                            items: alignItems,
                        }}
                        arrow
                        trigger={["click", "hover"]}
                    >
                        <Button
                            type="text"
                            iconPosition="end"
                            icon={<FontAwesomeIcon icon={faCaretDown} />}
                        >
                            {
                                (
                                    alignItems.find((e) =>
                                        editor.isActive({textAlign: e.value})
                                    ) || {
                                        label: (
                                            <FontAwesomeIcon
                                                icon={faAlignLeft}
                                            />
                                        ),
                                    }
                                ).label
                            }
                        </Button>
                    </Dropdown>
                    <Button
                        type={
                            editor.isActive("bulletList") ? "primary" : "text"
                        }
                        icon={<FontAwesomeIcon icon={faList} />}
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                    />
                    <Button
                        type={
                            editor.isActive("orderedList") ? "primary" : "text"
                        }
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
                {/* a */}
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
        </div>
    );
}

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
        types: ["paragraph"],
    }),
    Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
            class: "text-primary",
        },
    }),
];

function UserEditor({
    defaultValue,
    editor,
}: {
    defaultValue: string;
    editor: RefObject<Editor | null>;
}) {
    return (
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
            editorContainerProps={{
                className:
                    "postEditor w-full h-96 min-h-96 max-h-96 rounded-xl bg-neutral-900 flex-1 flex px-4 article",
            }}
        />
    );
}

export default UserEditor;
