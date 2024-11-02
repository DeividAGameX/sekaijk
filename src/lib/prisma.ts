import {PrismaClient} from "@prisma/client";

const globalForPrisma = global as unknown as {prisma: PrismaClient};

const prismaClient =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["query"],
    });

// prismaClient = prismaClient.$extends({
//     name: "SlugExtension",
//     query: {
//         categories: {
//             create({args, query}: any) {
//                 // Generar slug a partir del name
//                 console.log(args);
//                 if (args.data.name) {
//                     args.data.slug = slugify(args.data.name, {lower: true});
//                 }
//                 return query(args);
//             },
//             update: async (args: any) => {
//                 // Generar slug a partir del name si se actualiza
//                 if (args.data.name) {
//                     args.data.slug = slugify(args.data.name, {lower: true});
//                 }
//                 return args;
//             },
//         },
//     },
// });

export const prisma = prismaClient;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
