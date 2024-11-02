import {Typography} from "antd";

interface TitleEditorProps {
    value: string;
    level?: 1 | 2 | 3 | 4 | 5;
    onChange: (value: string) => void;
}

function TitleEditor({value, level, onChange}: TitleEditorProps) {
    return (
        <Typography.Title level={level} editable={{onChange, maxLength: 100}}>
            {value}
        </Typography.Title>
    );
}

export default TitleEditor;
