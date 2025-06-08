import {SelectProps, Tag} from "antd";

type TagRenderType = SelectProps["tagRender"];

const TagRender: TagRenderType = (props) => {
    const {label, closable, onClose} = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            color={(label ?? ":").toString().split(":")[1]}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{marginInlineEnd: 4}}
        >
            {label?.toString().split(":")[0]}
        </Tag>
    );
};

export default TagRender;
