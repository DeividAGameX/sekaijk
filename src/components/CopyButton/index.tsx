"use client";
import {message} from "antd";
import {HTMLAttributes} from "react";

interface CopyButtonType extends HTMLAttributes<HTMLAnchorElement> {
    toCopy: string;
}

function CopyButton({toCopy, children, ...rest}: CopyButtonType) {
    const [mess, context] = message.useMessage();

    const handleClick = (
        event: React.MouseEvent<HTMLAnchorElement> | undefined
    ) => {
        event?.preventDefault();
        navigator.clipboard.writeText(toCopy);
        mess.success("Copied!");
    };

    return (
        <>
            {context}
            <a {...rest} onClick={handleClick}>
                {children}
            </a>
        </>
    );
}

export default CopyButton;
