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
import {TwitterEmbed} from "./Extensions/Twitter";
//*
import StarterKit from "@tiptap/starter-kit";
import {Button, Dropdown, Input, Modal, Tooltip, Typography} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAlignCenter,
    faAlignJustify,
    faAlignLeft,
    faAlignRight,
    faBold,
    faCaretDown,
    faImage,
    // faImage,
    faItalic,
    faLink,
    faList,
    faListNumeric,
    faQuoteLeft,
    faRedo,
    faUnderline,
    faUndo,
    faVideo,
} from "@fortawesome/free-solid-svg-icons";
// import FileManager from "@/components/admin/FileManager/FileManager";
import {RefObject, useState} from "react";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import FileManager from "@/components/dashboard/FileManager";

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
    const [open, setOpen] = useState(false);
    const [openLink, setOpenLink] = useState(false);
    const [twitterLink, setTwitterLink] = useState(false);
    const [openYT, setOpenYT] = useState(false);
    if (!editor) {
        return null;
    }

    const headers = [
        {
            key: "p",
            value: "p",
            titulo: "Párrafo",
            className: `${editor.isActive("paragraph") ? "bg-active" : ""}`,
            label: "Párrafo",
            onClick: () => editor.chain().focus().setParagraph().run(),
        },
        {
            key: "h1",
            value: 1,
            titulo: "Titulo 1",
            className: `${
                editor.isActive("heading", {
                    level: 1,
                })
                    ? "bg-active"
                    : ""
            }`,
            label: <Typography.Title level={1}>Titulo 1</Typography.Title>,
            onClick: () =>
                editor.chain().focus().toggleHeading({level: 1}).run(),
        },
        {
            key: "h2",
            value: 2,
            titulo: "Titulo 2",
            className: `${
                editor.isActive("heading", {
                    level: 2,
                })
                    ? "bg-active"
                    : ""
            }`,
            label: <Typography.Title level={2}>Titulo 2</Typography.Title>,
            onClick: () =>
                editor.chain().focus().toggleHeading({level: 2}).run(),
        },
        {
            key: "h3",
            value: 3,
            titulo: "Titulo 3",
            className: `${
                editor.isActive("heading", {
                    level: 3,
                })
                    ? "bg-active"
                    : ""
            }`,
            label: <Typography.Title level={3}>Titulo 3</Typography.Title>,
            onClick: () =>
                editor.chain().focus().toggleHeading({level: 3}).run(),
        },
        {
            key: "h4",
            value: 4,
            titulo: "Titulo 4",
            className: `${
                editor.isActive("heading", {
                    level: 4,
                })
                    ? "bg-active"
                    : ""
            }`,
            label: <Typography.Title level={4}>Titulo 4</Typography.Title>,
            onClick: () =>
                editor.chain().focus().toggleHeading({level: 4}).run(),
        },
        {
            key: "h5",
            value: 5,
            titulo: "Titulo 5",
            className: `${
                editor.isActive("heading", {
                    level: 5,
                })
                    ? "bg-active"
                    : ""
            }`,
            label: <Typography.Title level={5}>Titulo </Typography.Title>,
            onClick: () =>
                editor.chain().focus().toggleHeading({level: 5}).run(),
        },
    ];

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

    const selectFile = (e: string) => {
        if (e) {
            editor.chain().focus().setImage({src: e, alt: "titulo"}).run();
            setOpen(false);
        }
    };

    return (
        <div className="bg-primary rounded-2xl overflow-hidden md:bg-transparent">
            <div className="w-full flex flex-row flex-nowrap items-center  overflow-auto rounded-2xl gap-2 p-2 sticky top-1 z-10 md:justify-between">
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
                <div className="flex gap-2 flex-nowrap justify-center bg-primary p-1 rounded-lg">
                    <Dropdown
                        placement="bottomCenter"
                        menu={{
                            items: headers,
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
                                    headers.find((e) =>
                                        editor.isActive("heading", {
                                            level: e.value,
                                        })
                                    ) || {titulo: "Párrafo"}
                                ).titulo
                            }
                        </Button>
                    </Dropdown>
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
                </div>
                <div className="flex flex-nowrap gap-2 bg-primary p-1 rounded-lg">
                    <Button
                        type="text"
                        icon={<FontAwesomeIcon icon={faLink} />}
                        onClick={() => setOpenLink(true)}
                    />
                    <Button
                        type="text"
                        icon={<FontAwesomeIcon icon={faImage} />}
                        onClick={() => setOpen(true)}
                    />
                    <Button
                        type="text"
                        icon={<FontAwesomeIcon icon={faVideo} />}
                        onClick={() => setOpenYT(true)}
                    />
                    <Button
                        type="text"
                        icon={<FontAwesomeIcon icon={faTwitter} />}
                        onClick={() => setTwitterLink(true)}
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
                <InsertLink
                    title="Video de YouTube"
                    open={openYT}
                    onSubmit={(url) => {
                        setOpenYT(false);
                        editor.commands.setYoutubeVideo({
                            src: url,
                        });
                    }}
                    onClose={() => setOpenYT(false)}
                />
                <InsertLink
                    title="Enlace del tweet"
                    open={twitterLink}
                    onSubmit={(url) => {
                        setTwitterLink(false);
                        editor.commands.insertTwitterEmbed(
                            // "https://x.com/aibaaiai/status/1866323632852701409"
                            url
                        );
                    }}
                    onClose={() => setOpenYT(false)}
                />
                <FileManager
                    isOpen={open}
                    onClose={() => setOpen(false)}
                    selectResource={selectFile}
                />
            </div>
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
];

function PostEditor({
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
                    "postEditor w-full flex-1 flex px-4 article",
            }}
        />
    );
}

export default PostEditor;
