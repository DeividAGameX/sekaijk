"use client";
import {HTMLAttributes} from "react";
import {toast} from "sonner";

interface CopyButtonType extends HTMLAttributes<HTMLAnchorElement> {
    toCopy: string;
}

function CopyButton({toCopy, children, ...rest}: CopyButtonType) {
    const handleClick = (
        event: React.MouseEvent<HTMLAnchorElement> | undefined
    ) => {
        event?.preventDefault();
        navigator.clipboard.writeText(toCopy);
        toast.success("Copied!");
    };

    return (
        <a {...rest} onClick={handleClick}>
            {children}
        </a>
    );
}

export default CopyButton;
