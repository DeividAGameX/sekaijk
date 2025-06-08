import {useCallback, useEffect, useRef} from "react";
import EditorComponent from "./Editor";
import {Editor} from "@tiptap/react";

function EditorUser({
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

export default EditorUser;
