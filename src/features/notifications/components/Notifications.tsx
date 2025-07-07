import {
    faBell,
    faCheck,
    faCheckDouble,
    faClock,
    faRefresh,
    faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Badge, Button, Dropdown, Empty, Spin} from "antd";
import {
    useGetNotificationsQuery,
    useMarkAllReadMutation,
    useMarkReadMutation,
} from "../lib/Notifications.reducer";
import {useTranslations} from "next-intl";
import {NotificationType} from "../types/notifications";
import {Separator} from "@/components/ui/separator";
import moment from "moment";
import Link from "next/link";
import {NotificationType as NotificationEnum} from "@prisma/client";
import {AnimatePresence, motion} from "framer-motion";
import {toast} from "sonner";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";

const iconNotification: {[key in NotificationEnum]: string} = {
    INFO: "bi bi-info-circle-fill", // Información general
    WARNING: "bi bi-exclamation-triangle-fill", // Advertencia
    SUCCESS: "bi bi-check-circle-fill", // Éxito
    SYSTEM: "bi icon-ajk", // Ícono personalizado del sistema
    POST_REVIEW: "bi bi-chat-left-text", // Notificación de revisión pendiente
    POST_REVIEW_ACCEPTED: "bi bi-hand-thumbs-up", // Revisión aceptada
    POST_REVIEW_CHANGED: "bi bi-pencil-square", // Revisión modificada
    POST_PUBLISHED: "bi bi-globe", // Publicación visible/publicada
    POST_ARCHIVED: "bi bi-archive", // Publicación archivada
    VIDEO: "bi bi-play-btn-fill", // Video o contenido multimedia
};

interface NotificationComponentProps extends NotificationType {
    onMarkRead: (id: string) => Promise<void>;
}

function NotificationComponent({
    id,
    title,
    message,
    type,
    createdAt,
    targetUrl,
    onMarkRead,
}: NotificationComponentProps) {
    const [isLoading, setIsLoading] = useState(false);
    const tNotifications = useTranslations("notifications");

    const markRead = async () => {
        setIsLoading(true);
        await onMarkRead(id);
        setIsLoading(false);
    };
    return (
        <motion.div
            key={id}
            className="flex items-start gap-2 py-2 px-3"
            variants={{
                initial: {x: "384px"},
                animate: {x: 0},
                exit: {x: "384px"},
            }}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="bg-neutral-950 rounded-full px-2 py-1">
                <i className={`${iconNotification[type]}`}></i>
            </div>
            <div className="flex-1">
                <h1 className="text-md font-lato font-bold py-1">{title}</h1>
                <p className="text-xs">{message}</p>
                <Separator className="my-2" />
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground text-xs">
                        <FontAwesomeIcon icon={faClock} />
                        <span className="ml-2">
                            {moment(createdAt).format("LLL")}
                        </span>
                    </p>
                    {targetUrl && (
                        <Link href={targetUrl} onClick={markRead}>
                            <FontAwesomeIcon icon={faUpRightFromSquare} />
                        </Link>
                    )}
                </div>
            </div>
            <Button
                type="text"
                size="small"
                onClick={markRead}
                disabled={isLoading}
                title={tNotifications("markAsRead")}
            >
                {isLoading ? <Spin /> : <FontAwesomeIcon icon={faCheck} />}
            </Button>
        </motion.div>
    );
}

function Notifications() {
    const {isLoading, data, refetch} = useGetNotificationsQuery(null);
    const [markRead, {error}] = useMarkReadMutation();
    const [markAsReadAll] = useMarkAllReadMutation();
    const tNotifications = useTranslations("notifications");
    const pathName = usePathname();
    const onMarkRead = async (id: string) => {
        await markRead({id, read: true});
        if (error) toast.error("Error");
        return Promise.resolve();
    };

    useEffect(() => {
        return () => {
            refetch();
        };
    }, [pathName, refetch]);

    return (
        <Dropdown
            menu={{
                items: [],
            }}
            dropdownRender={() => (
                <div className="max-w-sm w-full min-w-sm bg-neutral-800 rounded-lg py-4 px-3 overflow-hidden">
                    <div className="w-full py-2 px-3 border-b-2 border-neutral-600 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg w-full text-white font-bold font-lato">
                                {tNotifications("title")}
                            </h3>
                            <span className="w-5 h-5 p-3 text-sm flex justify-center items-center rounded-full bg-neutral-900">
                                {data?.length}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                type="text"
                                size="small"
                                onClick={refetch}
                                className="text-white"
                                title={tNotifications("refresh")}
                            >
                                <FontAwesomeIcon icon={faRefresh} />
                            </Button>
                            <Button
                                type="text"
                                size="small"
                                onClick={markAsReadAll}
                                className="text-white"
                                title={tNotifications("markAsReadAll")}
                            >
                                <FontAwesomeIcon icon={faCheckDouble} />
                            </Button>
                        </div>
                    </div>
                    <div className="w-full max-h-80 overflow-y-auto overflow-x-hidden">
                        <AnimatePresence>
                            {data ? (
                                data.length > 0 ? (
                                    (data ?? []).map((d) => (
                                        <NotificationComponent
                                            key={d.id}
                                            {...d.notification}
                                            onMarkRead={onMarkRead}
                                        />
                                    ))
                                ) : (
                                    <motion.div
                                        key={"empty"}
                                        variants={{
                                            initial: {x: "384px"},
                                            animate: {x: 0},
                                            exit: {x: "384px"},
                                        }}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                    >
                                        <Empty
                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                            description={tNotifications(
                                                "empty"
                                            )}
                                        />
                                    </motion.div>
                                )
                            ) : (
                                <motion.div
                                    key={"empty"}
                                    variants={{
                                        initial: {x: "384px"},
                                        animate: {x: 0},
                                        exit: {x: "384px"},
                                    }}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                >
                                    <Empty
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        description={tNotifications("empty")}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        >
            <Badge
                count={
                    isLoading ? (
                        <FontAwesomeIcon icon={faClock} />
                    ) : (
                        data?.length
                    )
                }
                size="small"
            >
                <FontAwesomeIcon
                    className="text-xl hover:text-primary transition duration-150"
                    icon={faBell}
                />
            </Badge>
        </Dropdown>
    );
}

export default Notifications;
