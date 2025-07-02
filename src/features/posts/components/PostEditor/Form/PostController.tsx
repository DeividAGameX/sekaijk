import React from "react";
import {Controller, UseControllerProps} from "react-hook-form";
import {UpdatePost} from "../../../types/posts";

type PostControllerProps = UseControllerProps<UpdatePost> & {
    label?: string;
    children: React.ReactElement;
};

function safeGet<T>(obj: T, path: string): unknown {
    const parts = path.replace(/\[(\d+)\]/g, ".$1").split(".");

    return parts.reduce<unknown>((acc, part) => {
        if (acc && typeof acc === "object" && part in acc) {
            return (acc as Record<string, unknown>)[part];
        }
        return undefined;
    }, obj);
}

function PostController({children, label, ...props}: PostControllerProps) {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({field, formState}) => (
                <>
                    {label && <label>{label}</label>}
                    {React.cloneElement(children, {...field})}
                    {(
                        safeGet(formState.errors, props.name) as {
                            message?: string;
                        }
                    )?.message && (
                        <span className="text-red-500 text-sm pt-2">
                            {(
                                safeGet(formState.errors, props.name) as {
                                    message?: string;
                                }
                            )?.message ?? ""}
                        </span>
                    )}
                </>
            )}
        />
    );
}

export default PostController;
