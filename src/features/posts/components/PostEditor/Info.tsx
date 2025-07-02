import {Button, Input, Select} from "antd";
import React from "react";
import {Control} from "react-hook-form";
import {UpdatePost} from "../../types/posts";
import {useGetAllCategoriesQuery} from "@/features/categories/lib/Categories.reducer";
import {Category} from "@/features/categories/types/category";
import {useGetAllTagsQuery} from "@/features/tags/lib/Tags.reducer";
import {Tag} from "@/features/tags/types/tag";
import TagRender from "./TagRender";
import PostController from "./Form/PostController";
import {useTranslations} from "next-intl";
import Link from "@/components/layouts/admin/Link";
import BannerComponent from "./Form/Banner";
import useUserSession from "@/hooks/useUserSession";

function FormPost({
    control,
    isDirty,
    saveDraft,
    publish,
    review,
    commentReview,
    tempPublish,
}: {
    control: Control<UpdatePost>;
    isDirty: boolean;
    saveDraft: () => void;
    publish: () => void;
    review: () => void;
    commentReview?: string | null;
    tempPublish?: boolean;
}) {
    const {loading, validatePermission} = useUserSession();
    const {data: categories} = useGetAllCategoriesQuery("");
    const {data: tags} = useGetAllTagsQuery("");
    const tForm = useTranslations("posts.form");
    return (
        <div className="flex-1 snap-center mx-auto w-full 2xl:max-w-lg">
            <div className="py-2 px-3 rounded-2xl bg-neutral-950">
                <div className="flex flex-col gap-2 md:flex-row xl:min-w-60 xl:flex-col">
                    <div className="flex flex-col gap-2 w-full">
                        <PostController
                            name="title"
                            label={tForm("title")}
                            control={control}
                        >
                            <Input maxLength={80} />
                        </PostController>
                        <PostController
                            name="description"
                            label={tForm("description")}
                            control={control}
                        >
                            <Input.TextArea />
                        </PostController>
                    </div>
                    <div className="flex flex-col gap-2 w-full md:flex-col">
                        <div className="flex flex-col w-full">
                            <PostController
                                name="categoryId"
                                label={tForm("category")}
                                control={control}
                            >
                                <Select
                                    options={(categories ?? []).map(
                                        (e: Category) => ({
                                            value: e.id,
                                            label: e.name,
                                        })
                                    )}
                                />
                            </PostController>
                        </div>
                        <div className="flex flex-col w-full">
                            <PostController
                                name="Tags"
                                label={tForm("tags")}
                                control={control}
                            >
                                <Select
                                    mode="multiple"
                                    options={(tags ?? []).map((e: Tag) => ({
                                        value: e.id,
                                        label: `${e.name}:${e.color}`,
                                        color: e.color,
                                    }))}
                                    tagRender={TagRender}
                                    optionRender={(e) =>
                                        e.label?.toString().split(":")[0]
                                    }
                                />
                            </PostController>
                        </div>
                    </div>
                </div>
                <div className="w-full my-2">
                    <PostController
                        name="banner"
                        label={tForm("banner")}
                        control={control}
                    >
                        <BannerComponent />
                    </PostController>
                </div>
                <div className="flex flex-col items-center gap-2 my-3 w-full md:flex-col 2xl:flex-row">
                    <Link className="w-full" href={`/dashboard/posts`}>
                        <Button block>{tForm("return")}</Button>
                    </Link>
                    <Button
                        type="primary"
                        block
                        onClick={saveDraft}
                        disabled={!isDirty}
                    >
                        {tForm("saveDraft")}
                    </Button>
                    {!loading &&
                        (validatePermission("@post-publish") || tempPublish ? (
                            <Button type="primary" block onClick={publish}>
                                {tForm("publish")}
                            </Button>
                        ) : (
                            validatePermission("@post-review") && (
                                <Button type="primary" block onClick={review}>
                                    {tForm("review")}
                                </Button>
                            )
                        ))}
                </div>
            </div>
            {commentReview && (
                <div className="py-2 px-3 mt-4 rounded-2xl bg-neutral-950">
                    <div className="py-4 mb-1 border-b-[1px] border-b-neutral-800">
                        <h2 className="text-xl">{tForm("reviewPending")}</h2>
                    </div>
                    <div className="py-2">{commentReview}</div>
                </div>
            )}
        </div>
    );
}

export default FormPost;
