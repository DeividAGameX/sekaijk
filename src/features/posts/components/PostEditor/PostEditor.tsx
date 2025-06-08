import {UseControllerProps} from "react-hook-form";
import {UpdatePost} from "../../types/posts";
import PostController from "./Form/PostController";
import {useCallback, useEffect, useRef} from "react";
import EditorComponent from "./Form/Editor";
import {Editor} from "@tiptap/react";

function Container({
    value,
    onChange,
}: {
    value?: "";
    onChange?: (value: string) => void;
}) {
    const ref = useRef<Editor>(null);

    const changeValue = useCallback(
        (editor: {editor: Editor}) => {
            onChange?.(editor.editor.getHTML());
        },
        [onChange]
    );

    useEffect(() => {
        const current = ref.current;
        if (current) {
            current.on("update", changeValue);
        }
        return () => {
            if (current) {
                current.off("update", changeValue);
            }
        };
    }, [ref, changeValue]);

    return <EditorComponent defaultValue={value ?? ""} editor={ref} />;
}

function PostEditor(props: UseControllerProps<UpdatePost>) {
    return (
        <div className="max-w-screen-lg snap-center w-full h-full flex flex-col relative p-2 rounded-lg bg-neutral-950">
            <PostController {...props}>
                <Container />
            </PostController>
        </div>
    );
}

export default PostEditor;
