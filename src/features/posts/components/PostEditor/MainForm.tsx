"use client";
import {useForm} from "react-hook-form";
import PostEditor from "./PostEditor";
import FormPost from "./Info";
import {UpdatePost} from "../../types/posts";
import {useUpdatePostMutation} from "../../lib/Posts.reducer";
import {useParams} from "next/navigation";
import {useDispatch} from "react-redux";
import {resetText, setText} from "@/lib/store/features/layout/Navbar.reducer";
import {useEffect} from "react";
import {motion} from "framer-motion";
import {Spin} from "antd";
import useLinkEvent from "@/hooks/useLinkEvent";
import {useTranslations} from "next-intl";

function MainFormPost({Tags, ...body}: UpdatePost) {
    const [updatePost, {isLoading}] = useUpdatePostMutation();
    const tLink = useTranslations("components.form");
    const {handler} = useLinkEvent();
    const dispatch = useDispatch();
    const {id} = useParams();

    const {
        control,
        handleSubmit,
        formState: {isDirty},
    } = useForm<UpdatePost>({
        defaultValues: {
            ...body,
            Tags: (Tags ?? []).map((tag) =>
                typeof tag === "object" ? tag.id : tag
            ),
        },
    });

    // Update post and handle form submission
    const submit = (e: UpdatePost) => {
        updatePost({id: id, ...e})
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // Handle review and publish
    const review = (e: UpdatePost) => {
        submit({
            ...e,
            status: "REVIEW",
        });
    };

    // Handle preventing form submission
    const publish = (e: UpdatePost) => {
        submit({
            ...e,
            status: "PUBLISHED",
        });
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
        dispatch(setText(body.title));
        return () => {
            dispatch(resetText());
        };
    }, [dispatch, body.title]);

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
            <PostEditor name="body" control={control} />
            <FormPost
                control={control}
                isDirty={isDirty}
                saveDraft={handleSubmit(submit)}
                publish={handleSubmit(publish)}
                review={handleSubmit(review)}
            />
            {isLoading && (
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
