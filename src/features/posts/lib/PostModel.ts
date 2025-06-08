import {prisma} from "@/lib/prisma";
import slugify from "slugify";

const cliente = prisma.$extends({
    query: {
        posts: {
            create({args, query}) {
                if (args.data.draftId) {
                    if (args.data.title) {
                        args.data.slug = slugify(args.data.title, {
                            lower: true,
                            strict: true,
                        });
                    }
                }
                return query(args);
            },
            update({args, query}) {
                if (args.data.draftId) {
                    if (
                        args.data.title &&
                        typeof args.data.title === "string"
                    ) {
                        args.data.slug = slugify(args.data.title, {
                            lower: true,
                            strict: true,
                        });
                    }
                }
                return query(args);
            },
        },
    },
});

const PostModel = cliente.posts;

export default PostModel;
