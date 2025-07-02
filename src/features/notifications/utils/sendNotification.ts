import UsersModel from "@/features/users/lib/UsersModel";
import {NotificationModel} from "../lib/NotificationsModel";
import {NotificationSendType} from "../types/notifications";
import PermissionsModel from "@/features/roles/lib/PermissionsModel";
import PostModel from "@/features/posts/lib/PostModel";
import {NotificationType as NotificationEnum} from "@prisma/client";

interface NotificationProp {
    title: string;
    message: string;
    type: NotificationEnum;
    targetUrl?: string;
}

interface SendNotificationProps extends NotificationProp {
    permission?: string;
    id?: number | string;
    users?: number[];
    typeToSend: "ALL" | "PERMISSION" | "USERS" | "ROL" | "POST";
}

async function createNotification({
    title,
    message,
    type,
    targetUrl,
    recipientIds,
}: NotificationSendType) {
    try {
        const notification = await NotificationModel.create({
            data: {
                title,
                message,
                type,
                targetUrl,
                recipients: {
                    create: recipientIds.map((id) => ({
                        user: {connect: {id: id}},
                    })),
                },
            },
        });
        return notification;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function sendAllNotifications({
    title,
    message,
    type,
    targetUrl,
}: NotificationProp) {
    try {
        const users = await UsersModel.findMany({
            select: {
                id: true,
            },
        });
        return await createNotification({
            title,
            message,
            type,
            targetUrl,
            recipientIds: users.map((u) => u.id),
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function sendPermissionNotifications({
    title,
    message,
    type,
    targetUrl,
    permission,
}: NotificationProp & {permission: string}) {
    try {
        const roles = await PermissionsModel.findMany({
            where: {
                permission: permission,
            },
        });
        const users = await UsersModel.findMany({
            where: {
                rolesId: {
                    in: roles.map((r) => r.roleId),
                },
            },
        });
        return await createNotification({
            title,
            message,
            type,
            targetUrl,
            recipientIds: users.map((u) => u.id),
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function sendRolNotifications({
    title,
    message,
    type,
    targetUrl,
    id,
}: NotificationProp & {id: number}) {
    try {
        const users = await UsersModel.findMany({
            where: {
                rolesId: id,
            },
        });
        return await createNotification({
            title,
            message,
            type,
            targetUrl,
            recipientIds: users.map((u) => u.id),
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function sendPostNotifications({
    title,
    message,
    type,
    targetUrl,
    id,
}: NotificationProp & {id: number}) {
    try {
        const post = await PostModel.findUnique({
            where: {
                id: id,
            },
        });
        if (!post) return false;
        return await createNotification({
            title,
            message: (message ?? "").replace("{postName}", post.title),
            type,
            targetUrl,
            recipientIds: [post.authorId],
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default async function sendNotification(
    props: SendNotificationProps
): Promise<boolean> {
    try {
        const {typeToSend, id, permission, users, ...notification} = props;
        let result = null;
        switch (typeToSend) {
            case "ALL":
                result = await sendAllNotifications(notification);
                break;
            case "PERMISSION":
                result = await sendPermissionNotifications({
                    ...notification,
                    permission: permission ?? "@posts",
                });
                break;
            case "USERS":
                result = await createNotification({
                    ...notification,
                    recipientIds: users ?? [],
                });
                break;
            case "ROL":
                result = await sendRolNotifications({
                    ...notification,
                    id: id ? (typeof id == "number" ? id : 0) : 0,
                });
                break;
            case "POST":
                result = await sendPostNotifications({
                    ...notification,
                    id: id ? (typeof id == "number" ? id : 0) : 0,
                });
                break;
            default:
                return false;
        }
        return result ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}
