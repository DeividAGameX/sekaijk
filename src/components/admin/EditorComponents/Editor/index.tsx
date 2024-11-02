import {Editor} from "@tinymce/tinymce-react";

interface PostEditorProps {
    value: string;
    onChange: (value: string) => void;
}

function PostEditor({value, onChange}: PostEditorProps) {
    return (
        <Editor
            apiKey={process.env.NEXT_PUBLIC_EDITOR_KEY}
            init={{
                skin: "oxide-dark",
                content_css: "dark",
                menubar: false,
                plugins:
                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
                toolbar:
                    "undo redo | blocks fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                resize_img_proportional: false,
                content_style: `body { background-color:#121212; max-width:100%; } img{ height: auto; max-width:100%; max-height:auto; padding:2px; }`,
                body_class: "body-tiny-editor",
                resize: false,
            }}
            initialValue={value}
            onChange={(evt, editor) => onChange(editor.getContent())}
        />
    );
}

export default PostEditor;
