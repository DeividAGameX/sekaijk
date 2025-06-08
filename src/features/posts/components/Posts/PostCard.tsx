import {Button, Image} from "antd";
import {Post} from "../../types/posts";
import {useTranslations} from "next-intl";
import moment from "moment";
import Link from "next/link";

type PostData = Post & {
    author: {
        name: string;
        avatar: string;
    };
    Categories: {
        name: string;
    };
} & {
    permissions: {
        canEdit: boolean;
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
    permissions: {canEdit, canDelete},
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
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3 flex-grow">
                        {description}
                    </p>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                            {moment(createdAt).format("LLL")}
                        </span>
                        <span
                            className={`text-xs px-2 py-1 rounded ${
                                status === "PUBLISHED"
                                    ? "bg-green-800 text-green-200"
                                    : "bg-yellow-800 text-yellow-200"
                            }`}
                        >
                            {tCard(status)}
                        </span>
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
                    <div className="flex justify-between gap-2 flex-col mt-4 md:flex-row">
                        {canEdit && (
                            <Link
                                href={`posts/${id}`}
                                className="w-full sm:w-auto"
                            >
                                <Button type="primary" block>
                                    {tCard("edit")}
                                </Button>
                            </Link>
                        )}
                        {canDelete && <Button danger>{tCard("delete")}</Button>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostCard;
