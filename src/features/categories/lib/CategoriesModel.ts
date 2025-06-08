import {prisma} from "@/lib/prisma";
import slugify from "slugify";

const PrismaClient = prisma.$extends({
    query: {
        categories: {
            create({args, query}) {
                if (args.data.name) {
                    args.data.slug = slugify(args.data.name, {
                        lower: true,
                        strict: true,
                    });
                }
                return query(args);
            },
            update({args, query}) {
                if (args.data.name && typeof args.data.name === "string") {
                    args.data.slug = slugify(args.data.name, {
                        lower: true,
                        strict: true,
                    });
                }
                return query(args);
            },
        },
    },
});

export default PrismaClient.categories;
