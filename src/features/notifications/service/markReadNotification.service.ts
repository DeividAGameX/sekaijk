import {RespCommon} from "@/types/Resp";
import {NotificationUserModel} from "../lib/NotificationsModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";

interface NotificationRead {
    id: string;
    read: boolean;
}

export default async function markReadNotification(
    userId: number,
    data: NotificationRead
): Promise<[RespCommon, ResponseInit]> {
    try {
        const notification = await NotificationUserModel.updateMany({
            where: {
                userId,
                notificationId: data.id,
            },
            data: {
                read: data.read,
            },
        });
        if (!notification) {
            return [{message: "Notification not found"}, {status: 404}];
        }
        return [{message: "READ"}, {status: 200}];
    } catch (error) {
        console.log(error);
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
