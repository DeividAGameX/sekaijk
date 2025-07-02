import {authOptions as config} from "@/utils/AuthOptions";
import Unauthorized from "@/components/dashboard/Unauthorized";
import MainFormPost from "@/features/posts/components/PostEditor/MainForm";
import PostModel from "@/features/posts/lib/PostModel";
import PostReviewModel from "@/features/posts/lib/PostReviewModel";
import {compileMarkdownToHtml} from "@/utils/MarkdownToHtml";
import validatePermission from "@/utils/ValidatePermissions";
import {getServerSession} from "next-auth";

type props = {
    params: Promise<{id: string}>;
};

async function PageEditor({params}: props) {
    const session = await getServerSession(config);
    if (!session) return <Unauthorized />;
    const idUser = (session?.user as {id: number}).id;
    const result = await validatePermission("@post", idUser);
    if (!result) return <Unauthorized />;
    const {id} = await params;
    const post = await PostModel.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            Tags: true,
        },
    });
    if (!post) {
        return <div>Post not found</div>;
    }
    const review = await PostReviewModel.findFirst({
        where: {
            postId: parseInt(id),
            active: true,
        },
    });
    let commentReview = null;
    let tempPublish = false;
    if (review) {
        if (review.status === "REJECTED") {
            post.body = review.reviewBody;
            commentReview = review.comment;
        }
        if (review.status === "APPROVED") {
            tempPublish = true;
            post.body = compileMarkdownToHtml(post.body ?? "");
        }
        if (review.status === "PENDING") {
            post.body = compileMarkdownToHtml(post.body ?? "");
        }
    } else {
        post.body = compileMarkdownToHtml(post.body ?? "");
    }
    return (
        <MainFormPost
            {...{...post, commentReview: commentReview, tempPublish}}
        />
    );
}

export default PageEditor;
