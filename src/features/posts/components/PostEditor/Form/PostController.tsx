import React from "react";
import {Controller, UseControllerProps} from "react-hook-form";
import {UpdatePost} from "../../../types/posts";

type PostControllerProps = UseControllerProps<UpdatePost> & {
    label?: string;
    children: React.ReactElement;
};

function PostController({children, label, ...props}: PostControllerProps) {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({field}) => (
                <>
                    {label && <label>{label}</label>}
                    {React.cloneElement(children, {...field})}
                </>
            )}
        />
    );
}

export default PostController;
