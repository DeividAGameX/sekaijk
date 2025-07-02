"use client";
import {Post, PostReview} from "../../types/posts";
import {
    Avatar,
    Button,
    Form,
    Input,
    message,
    Modal,
    Spin,
    Timeline,
} from "antd";
import ReviewEditorController from "./ReviewEditorController";
import {useTranslations} from "next-intl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClose, faInfo} from "@fortawesome/free-solid-svg-icons";
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {resetText, setText} from "@/lib/store/features/layout/Navbar.reducer";
import {
    useGetReviewsQuery,
    usePublishPostMutation,
    useUpdateReviewMutation,
} from "../../lib/Posts.reducer";
import {motion} from "framer-motion";
import ReviewInfoModal from "./ReviewInfo";

interface ReviewFormProps {
    postReview: PostReview;
    post: Post & {
        Categories: {
            name: string;
        } | null;
        author: {
            name: string;
            avatar: string;
        };
    };
}

interface ReviewProps {
    reviewBody: string;
    comment: string;
}

const regText =
    /<span\b[^>]*\bdata-comment-id="[^"]*"\s+data-comment-type="[^"]*"\s+data-comment-author="[^"]*"\s+data-comment-text="[^"]*"[^>]*>.*?<\/span>/g;

function ReviewForm({postReview, post}: ReviewFormProps) {
    const [form] = Form.useForm();
    const [messageApi, contextMessage] = message.useMessage();
    const [modalApi, contextModal] = Modal.useModal();
    const [openInfo, setOpenInfo] = useState(false);
    const tError = useTranslations("errors.response");
    const tForm = useTranslations("posts.review");
    const {id} = useParams();
    const dispatch = useDispatch();
    const {data: historyReview} = useGetReviewsQuery(post.id);
    const [publishPost, {error: publishError}] = usePublishPostMutation();
    const [updateReview, {isLoading: updateLoading, error: updateError}] =
        useUpdateReviewMutation();
    const navigate = useRouter();

    const submitReview = () => {
        form.validateFields().then(async (values: ReviewProps) => {
            await updateReview({
                comment: values.comment,
                reviewBody: values.reviewBody,
                id: postReview.id,
                postId: post.id,
                status: "REJECTED",
            });
            if (updateError)
                return messageApi.error(tError("unknownError.message"));
            messageApi.success(tForm("success"));
            navigate.push("/dashboard/posts");
        });
    };

    const submitPublish = () => {
        form.validateFields().then((values: ReviewProps) => {
            if (values.reviewBody.match(regText)) {
                return messageApi.error(tForm("error.has_comment"));
            }
            modalApi.confirm({
                title: tForm("approve_step.title"),
                content: tForm("approve_step.message"),
                okText: tForm("approve_step.bt1"),
                cancelText: tForm("approve_step.bt2"),
                onOk: () => {
                    return new Promise(async (resolve) => {
                        await publishPost({
                            id: post.id,
                            title: post.title,
                            description: post.description,
                            categoryId: post.categoryId,
                            banner: post.banner,
                            body: values.reviewBody,
                            authorId: post.authorId,
                            Tags: (post.Tags ?? []).map((i) => i.id),
                            comment: values.comment,
                        });
                        if (publishError) {
                            resolve(false);
                            return messageApi.error(
                                tError("unknownError.message")
                            );
                        }
                        messageApi.success(tForm("success"));
                        resolve(true);
                    });
                },
                onCancel: () => {
                    return new Promise(async (resolve) => {
                        await updateReview({
                            comment: values.comment,
                            reviewBody: values.reviewBody,
                            id: postReview.id,
                            postId: post.id,
                            status: "APPROVED",
                        });
                        if (updateError) {
                            resolve(false);
                            return messageApi.error(
                                tError("unknownError.message")
                            );
                        }
                        messageApi.success(tForm("success"));
                        resolve(true);
                        navigate.push("/dashboard/posts");
                    });
                },
            });
        });
    };

    useEffect(() => {
        dispatch(setText({text: post.title, matchWith: `${id}`}));
        return () => {
            dispatch(resetText());
        };
    }, [dispatch, post.title, id]);

    return (
        <Form
            form={form}
            className="w-full h-full relative overflow-hidden"
            initialValues={postReview}
            layout="vertical"
        >
            {contextMessage}
            {contextModal}
            <ReviewInfoModal
                open={openInfo}
                onClose={() => setOpenInfo(false)}
                data={post}
            />
            <div className="flex flex-col-reverse gap-2 h-full overflow-auto md:flex-row">
                <Form.Item name={"reviewBody"} noStyle>
                    <ReviewEditorController />
                </Form.Item>
                <div className="flex-1 flex flex-col gap-4">
                    <div className="bg-neutral-950 px-4 pt-3 rounded-xl">
                        <Form.Item
                            name={"comment"}
                            label={tForm("comment")}
                            rules={[
                                {
                                    required: true,
                                    message: tForm("error.comment_required"),
                                },
                            ]}
                        >
                            <Input.TextArea rows={5} style={{resize: "none"}} />
                        </Form.Item>
                        <div className="my-4">
                            <Button
                                type="text"
                                icon={<FontAwesomeIcon icon={faInfo} />}
                                onClick={() => setOpenInfo(true)}
                            >
                                {tForm("viewInfo")}
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            <Form.Item name={"status"}>
                                <Button
                                    color="green"
                                    variant="solid"
                                    value={"APPROVED"}
                                    icon={<FontAwesomeIcon icon={faCheck} />}
                                    onClick={submitPublish}
                                >
                                    {tForm("approve")}
                                </Button>
                            </Form.Item>
                            <Form.Item name={"status"}>
                                <Button
                                    color="red"
                                    variant="solid"
                                    value={"REJECTED"}
                                    icon={<FontAwesomeIcon icon={faClose} />}
                                    onClick={submitReview}
                                >
                                    {tForm("reject")}
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="flex-1 overflow-x-hidden hidden overflow-auto h-full md:block">
                        <h2 className="mb-4 text-xl">{tForm("history")}</h2>
                        <Timeline
                            mode="left"
                            items={(historyReview ?? []).map(
                                (review, index) => ({
                                    key: index,
                                    className: "bg-transparent",
                                    dot: (
                                        <FontAwesomeIcon
                                            className={` ${
                                                review.status === "APPROVED"
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                            icon={
                                                review.status === "APPROVED"
                                                    ? faCheck
                                                    : faClose
                                            }
                                        />
                                    ),
                                    children: (
                                        <div className="bg-neutral-950 p-2 rounded-xl">
                                            <div className="border-b-[1px] border-b-neutral-800 py-2 px-4 flex items-center gap-2">
                                                <Avatar
                                                    src={review.editor.avatar}
                                                />
                                                <p>{review.editor.name}</p>
                                            </div>
                                            <div className=" py-2 px-4">
                                                {review.comment ?? ""}
                                            </div>
                                        </div>
                                    ),
                                })
                            )}
                        />
                    </div>
                </div>
            </div>
            {updateLoading && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1}}
                    className="absolute w-full h-full flex justify-center items-center top-0 left-0 right-0 text-center bg-neutral-800/75 z-20"
                >
                    <Spin />
                </motion.div>
            )}
        </Form>
    );
}

export default ReviewForm;
