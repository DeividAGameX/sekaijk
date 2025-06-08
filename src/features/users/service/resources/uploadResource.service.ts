import {RespCommon} from "@/types/Resp";
import ResourceModel from "../../lib/ResourceModel";
import {UserResource} from "../../types/userResource";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";

export default async function uploadResource(
    body: UserResource
): Promise<[UserResource | RespCommon, ResponseInit]> {
    try {
        const userResource = await ResourceModel.create({
            data: body,
        });
        return [userResource, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
