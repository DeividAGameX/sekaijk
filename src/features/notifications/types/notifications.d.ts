import {NotificationType as NotificationEnum} from "@prisma/client";

export interface NotificationType {
    id: string;
    title: string;
    message: string;
    type: NotificationEnum;
    targetUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
    recipients?: NotificationUserType[];
}

export interface NotificationUserType {
    id: string;
    userId: number;
    notificationId: string;
    read: boolean;
    readAt?: Date | null;
    notification: NotificationType;
}

export interface NotificationSendType {
    title: string;
    message: string;
    type: NotificationTypeEnum;
    targetUrl?: string;
    recipientIds: number[];
}
