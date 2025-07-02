import {Separator} from "@radix-ui/react-separator";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

interface Post {
    id: number;
    title: string;
    banner?: string | null;
    description: string;
    slug?: string | null;
    createdAt: Date;
    Categories: {
        name: string;
        slug: string;
    } | null;
    author: {
        name: string;
        avatar: string;
    };
}

function PostCard({
    title,
    banner,
    description,
    slug,
    author,
    Categories,
    createdAt,
}: Post) {
    return (
        <article className="max-h-[332px] h-[332px] min-h-[332px] flex flex-col overflow-hidden rounded-xl border-2 border-neutral-800">
            <div className="relative h-6/12">
                <Image
                    src={banner ?? ""}
                    alt={title}
                    width={920}
                    height={570}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 flex flex-col gap-2 px-3 py-2">
                <header className="h-14">
                    <h1 className="text-lg line-clamp-2 text-ellipsis font-lato">
                        <Link
                            href={`/${Categories?.slug}/${slug}`}
                            className="font-semibold hover:text-primary transition duration-150"
                        >
                            {title}
                        </Link>
                    </h1>
                </header>
                <div className="flex-1">
                    <p className="text-neutral-400 text-sm line-clamp-2 text-ellipsis">
                        {description}
                    </p>
                </div>
                <div className="w-full flex justify-between items-centers">
                    <div className="text-sm py-1 text-neutral-400 flex items-center">
                        <div className="flex items-center">
                            <p className="ml-2">{author.name}</p>
                        </div>
                        <Separator />
                        <p className="text-sm py-1 align-middle text-neutral-400">
                            {moment(createdAt).format("LL")}
                        </p>
                    </div>
                    <Link
                        href={`/${Categories?.slug}/${slug}`}
                        className="text-neutral-500 py-1 px-2 hover:text-primary transition duration-150"
                    >
                        Leer
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default PostCard;
