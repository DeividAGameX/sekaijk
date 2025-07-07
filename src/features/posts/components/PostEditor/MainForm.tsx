"use client";
import {Path, useForm} from "react-hook-form";
import PostEditor from "./PostEditor";
import FormPost from "./Info";
import {UpdatePost} from "../../types/posts";
import {
    usePublishPostMutation,
    useSendToReviewMutation,
    useUpdatePostMutation,
} from "../../lib/Posts.reducer";
import {useParams, useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {resetText, setText} from "@/lib/store/features/layout/Navbar.reducer";
import {useEffect} from "react";
import {motion} from "framer-motion";
import {message, Spin} from "antd";
import useLinkEvent from "@/hooks/useLinkEvent";
import {useTranslations} from "next-intl";

interface errorFields {
    status: number;
    data: {
        field?: {[key: string]: string | {[key: string]: string}} | null;
        message: string;
    };
}

type UpdatePostPage = UpdatePost & {
    commentReview?: string | null;
    tempPublish?: boolean;
};

function MainFormPost({
    Tags,
    commentReview,
    tempPublish,
    ...body
}: UpdatePostPage) {
    const [messageApi, contextMessage] = message.useMessage();
    const [updatePost, {isLoading, error}] = useUpdatePostMutation();
    const [publishPost, {isLoading: publishing, error: errorPublish}] =
        usePublishPostMutation();
    const [sendToReview, {isLoading: sendingReview, error: errorReview}] =
        useSendToReviewMutation();
    const tLink = useTranslations("components.form");
    const tError = useTranslations("errors.response");
    const {handler} = useLinkEvent();
    const dispatch = useDispatch();
    const {id} = useParams();
    const route = useRouter();

    const {
        control,
        handleSubmit,
        setError,
        getValues,
        formState: {isDirty},
    } = useForm<UpdatePost>({
        defaultValues: {
            ...body,
            Tags: (Tags ?? []).map((tag) =>
                typeof tag === "object" ? tag.id : tag
            ),
        },
    });

    const errorShow = (errorPublish: errorFields) => {
        const errors = errorPublish;
        console.log(errors);
        if (errors.data.message == "formInvalid") {
            if (errors.data.field) {
                Object.entries(errors.data.field).forEach(([key, val]) =>
                    setError(key as Path<UpdatePost>, {
                        message: tError(`${errors.data.message}.code.${val}`),
                    })
                );
            }
        }
        return messageApi.error(
            tError(
                `${(errorPublish as {data: {message: ""}}).data.message}.title`
            )
        );
    };

    // Update post and handle form submission
    const submit = async (e: UpdatePost) => {
        await updatePost({id: id, ...e});
        if (error) return errorShow(error as errorFields);
        messageApi.success(tLink("success"));
    };

    // Handle review and publish
    const review = async (e: UpdatePost) => {
        await sendToReview({id: id, ...e});
        if (errorReview) {
            return errorShow(errorReview as errorFields);
        }
        messageApi.success(tLink("success"));
    };

    // Handle preventing form submission
    const publish = async (e: UpdatePost) => {
        await publishPost({
            ...e,
            status: "PUBLISHED",
        });
        if (errorPublish) {
            return errorShow(errorPublish as errorFields);
        }
        if (tempPublish) {
            route.refresh();
        }
        messageApi.success(tLink("success"));
    };

    useEffect(() => {
        handler({
            title: "Se esta editando una publicación",
            description: "Está a punto de editar una publicación",
            type: "WARNING",
            isPrevent: isDirty,
            okText: tLink("preventOk"),
            cancelText: tLink("preventCancel"),
        });
    }, [isDirty, handler, tLink]);

    useEffect(() => {
        dispatch(setText({text: body.title, matchWith: `${id}`}));
        return () => {
            dispatch(resetText());
        };
    }, [dispatch, body.title, id]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = "";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () =>
            window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isDirty]);

    return (
        <div className="relative flex overflow-auto snap-y flex-col-reverse gap-2 h-full xl:flex-row">
            {contextMessage}
            <PostEditor name="body" control={control} />
            <FormPost
                control={control}
                isDirty={isDirty}
                category={getValues("categoryId") ?? 0}
                saveDraft={handleSubmit(submit)}
                publish={handleSubmit(publish)}
                review={handleSubmit(review)}
                commentReview={commentReview}
                tempPublish={tempPublish}
            />
            {(isLoading || sendingReview || publishing) && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1}}
                    className="absolute w-full h-full flex justify-center items-center top-0 left-0 right-0 text-center bg-neutral-800/75 z-20"
                >
                    <Spin />
                </motion.div>
            )}
        </div>
    );
}

export default MainFormPost;
