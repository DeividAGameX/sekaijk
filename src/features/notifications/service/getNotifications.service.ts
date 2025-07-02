import {validateErrorPrisma} from "@/utils/validateError";
import {NotificationUserType} from "../types/notifications";
import {Prisma} from "@prisma/client";
import {NotificationUserModel} from "../lib/NotificationsModel";
import {RespCommon} from "@/types/Resp";
export default async function getNotifications(
    userId: number
): Promise<[NotificationUserType[] | RespCommon, ResponseInit]> {
    try {
        const notifications = await NotificationUserModel.findMany({
            where: {
                userId,
                read: false,
            },
            include: {
                notification: true,
            },
            orderBy: {
                notification: {
                    createdAt: "desc",
                },
            },
        });
        return [notifications, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
