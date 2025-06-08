import {RespCommon} from "@/types/Resp";
import ResourceModel from "../../lib/ResourceModel";
import {UserResource} from "../../types/userResource";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET,
});

export default async function deleteResource(
    id: number
): Promise<[UserResource | RespCommon, ResponseInit]> {
    try {
        const userResource = await ResourceModel.delete({
            where: {
                id,
            },
        });
        console.log(userResource);
        await cloudinary.v2.uploader.destroy(
            userResource.resourceId,
            {
                resource_type: userResource.type.toLocaleLowerCase(),
            },
            (error, result) => {
                if (error) console.log(error);
                console.log(result);
            }
        );
        return [userResource, {status: 200}];
    } catch (error) {
        console.log(error);
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
