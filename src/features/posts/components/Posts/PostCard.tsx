import {Button, Image, Tooltip} from "antd";
import {Post, PostReview} from "../../types/posts";
import {useTranslations} from "next-intl";
import moment from "moment";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faFilePen,
    faPenToSquare,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

type PostData = Post & {
    author: {
        name: string;
        avatar: string;
    };
    Categories: {
        name: string;
    };
    PostsReview: PostReview[];
} & {
    permissions: {
        canEdit: boolean;
        canReview: boolean;
        canDelete: boolean;
    };
};

function PostCard({
    id,
    title,
    banner,
    description,
    createdAt,
    status,
    Categories,
    author,
    PostsReview,
    permissions: {canEdit, canReview, canDelete},
}: PostData) {
    const tCard = useTranslations("posts.card");
    return (
        <div
            key={id}
            className="bg-neutral-950 rounded-lg shadow-md overflow-hidden flex flex-col h-[450px]"
        >
            <Image
                src={banner || "/assets/fondoPortada.jpg"}
                alt={title}
                className="w-full max-h-48 h-48 object-cover"
                preview={banner ? true : false}
            />
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex-1 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 h-14">
                        {title}
                    </h3>
                    <div className="flex-grow">
                        <p className="text-gray-400 text-sm line-clamp-3">
                            {description}
                        </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                            {moment(createdAt).format("LLL")}
                        </span>
                        {(PostsReview ?? []).length > 0 &&
                        PostsReview[0].active ? (
                            PostsReview[0].status == "REJECTED" ? (
                                <span className="text-xs px-2 py-1 rounded bg-red-500">
                                    {tCard("REJECT")}
                                </span>
                            ) : PostsReview[0].status == "APPROVED" ? (
                                <span className="text-xs px-2 py-1 rounded bg-green-600">
                                    {tCard("READY")}
                                </span>
                            ) : (
                                <span
                                    className={`text-xs px-2 py-1 rounded ${
                                        status === "PUBLISHED"
                                            ? "bg-green-800 text-green-200"
                                            : "bg-yellow-800 text-yellow-200"
                                    }`}
                                >
                                    {tCard(status)}
                                </span>
                            )
                        ) : (
                            <span
                                className={`text-xs px-2 py-1 rounded ${
                                    status === "PUBLISHED"
                                        ? "bg-green-800 text-green-200"
                                        : "bg-yellow-800 text-yellow-200"
                                }`}
                            >
                                {tCard(status)}
                            </span>
                        )}
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                            {tCard("author")}: {author?.name || "Unknown"}
                        </span>
                        <span className="text-xs text-gray-500">
                            {Categories?.name || tCard("unknown_category")}
                        </span>
                    </div>
                </div>
                {(canEdit || canDelete) && (
                    <div className="w-full flex items-center flex-col mt-4 md:flex-row">
                        {canEdit && (
                            <Tooltip title={tCard("edit")}>
                                <Link href={`posts/${id}`} className="w-full">
                                    <Button type="text" block>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </Button>
                                </Link>
                            </Tooltip>
                        )}
                        {canReview &&
                            PostsReview.length > 0 &&
                            PostsReview[0].status == "PENDING" && (
                                <Tooltip title={tCard("review")}>
                                    <Link
                                        href={`posts/${id}/review`}
                                        className="w-full"
                                    >
                                        <Button type="text" block>
                                            <FontAwesomeIcon icon={faFilePen} />
                                        </Button>
                                    </Link>
                                </Tooltip>
                            )}
                        {canDelete && (
                            <Tooltip title={tCard("edit")}>
                                <Button type="text" danger block>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </Tooltip>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostCard;
