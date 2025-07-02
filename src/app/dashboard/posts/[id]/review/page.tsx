import {authOptions as config} from "@/utils/AuthOptions";
import Unauthorized from "@/components/dashboard/Unauthorized";
import ReviewForm from "@/features/posts/components/PostReview/ReviewForm";
import PostModel from "@/features/posts/lib/PostModel";
import PostReviewModel from "@/features/posts/lib/PostReviewModel";
import validatePermission from "@/utils/ValidatePermissions";
import {getServerSession} from "next-auth";

type props = {
    params: Promise<{id: string}>;
};

async function PostReview({params}: props) {
    const session = await getServerSession(config);
    if (!session) return <Unauthorized />;
    const idUser = (session?.user as {id: number}).id;
    const result = await validatePermission("@post-publish", idUser);
    if (!result) return <Unauthorized />;
    const {id} = await params;
    const review = await PostReviewModel.findFirst({
        where: {
            postId: parseInt(id),
            active: true,
            status: "PENDING",
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    if (!review) return <div>Review not found</div>;
    const post = await PostModel.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            Tags: true,
            Categories: {
                select: {
                    name: true,
                },
            },
            author: {
                select: {
                    name: true,
                    avatar: true,
                },
            },
        },
    });
    if (!post) {
        return <div>Post not found</div>;
    }
    return <ReviewForm post={post} postReview={review} />;
}

export default PostReview;
