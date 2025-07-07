import {RespCommon} from "@/types/Resp";
import {NotificationUserModel} from "../lib/NotificationsModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";

export default async function markReadNotifications(
    userId: number
): Promise<[RespCommon, ResponseInit]> {
    try {
        const notification = await NotificationUserModel.updateMany({
            where: {
                userId,
                read: false,
            },
            data: {
                read: true,
            },
        });
        if (!notification) {
            return [{message: "Notification not found"}, {status: 404}];
        }
        return [{message: "READ"}, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
