import {validateErrorPrisma} from "@/utils/validateError";
import {UserResource} from "../../types/userResource";
import {Prisma} from "@prisma/client";
import ResourceModel from "../../lib/ResourceModel";
import {RespCommon} from "@/types/Resp";

export default async function getResource(
    id: number
): Promise<[UserResource[] | RespCommon, ResponseInit]> {
    try {
        const resources = await ResourceModel.findMany({
            where: {
                userId: id,
            },
        });
        return [resources, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
