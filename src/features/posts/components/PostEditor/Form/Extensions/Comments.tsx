import {faCheck, faClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Node, NodeViewProps, mergeAttributes} from "@tiptap/core";
import {NodeViewWrapper, ReactNodeViewRenderer} from "@tiptap/react";
import {Button, Popover} from "antd";
import {usePathname} from "next/navigation";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        comments: {
            /**
             * Comments will be added to the autocomplete.
             */
            addComment: (
                commentId: string,
                commentAuthor: string,
                commentText: string,
                commentType: string
            ) => ReturnType;
        };
    }
}

const CommentNodeView: React.FC<NodeViewProps> = ({node, editor, getPos}) => {
    // node.attrs tendrá todos los atributos definidos en tu extensión
    const {
        // "data-comment-id": id,
        "data-comment-author": author,
        "data-comment-text": text,
        "data-comment-type": type,
    } = node.attrs;

    const pathName = usePathname();

    const handleDelete = () => {
        if (typeof getPos === "function") {
            const pos = getPos();
            const transaction = editor.state.tr;

            transaction.replaceWith(
                pos,
                pos + node.nodeSize,
                editor.schema.text(node.textContent)
            );

            editor.view.dispatch(transaction);
        }
    };

    return (
        <NodeViewWrapper as="span" className={type}>
            <Popover
                title={
                    <div className="flex justify-between items-center gap-4">
                        <p className="font-bold">Creador: {author}</p>
                        <Button type="text" onClick={handleDelete}>
                            <FontAwesomeIcon
                                icon={
                                    pathName.includes("/review")
                                        ? faClose
                                        : faCheck
                                }
                            />
                        </Button>
                    </div>
                }
                content={text}
            >
                <span>{node.textContent}</span>
            </Popover>
        </NodeViewWrapper>
    );
};

export const Comments = Node.create({
    name: "comments",
    group: "inline",
    inline: true,
    content: "inline*", // permite texto u otros inlines
    atom: false,
    selectable: false,
    marks: "_",
    addAttributes() {
        return {
            "data-comment-id": {default: null},
            "data-comment-type": {default: "comment-correction"},
            "data-comment-author": {default: ""},
            "data-comment-text": {default: ""},
        };
    },
    parseHTML() {
        return [
            {
                tag: "span[data-comment-id]",
            },
        ];
    },
    renderHTML({HTMLAttributes}) {
        return [
            "span",
            mergeAttributes(HTMLAttributes, {
                class: HTMLAttributes["data-comment-type"],
                onclick: () => console.log("ClickSpan"),
            }),
            0, // contenido interno aquí
        ];
    },
    addNodeView() {
        return ReactNodeViewRenderer(CommentNodeView);
    },
    addCommands() {
        return {
            addComment:
                (id, author, text, type) =>
                ({state, commands}) => {
                    const {from, to} = state.selection;
                    const selectedText = state.doc.textBetween(from, to);

                    if (!selectedText) return false;

                    return commands.insertContentAt(
                        {from, to},
                        {
                            type: "comments",
                            attrs: {
                                "data-comment-id": id,
                                "data-comment-author": author,
                                "data-comment-text": text,
                                "data-comment-type": type,
                            },
                            content: [
                                {
                                    type: "text",
                                    text: selectedText,
                                },
                            ],
                        }
                    );
                },
        };
    },
});
