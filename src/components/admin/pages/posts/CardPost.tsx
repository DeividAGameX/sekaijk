import {useDeletePostMutation} from "@/lib/storage/Api/posts";
import {Button, Image, Popconfirm, Spin, Typography} from "antd";
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import usePermissions from "@/hooks/usePermissions";
import {useTranslations} from "next-intl";

function CardPost({post}: {post: any}) {
    const t = useTranslations("posts.status");
    const [deletePost, {isLoading}] = useDeletePostMutation();
    const {loading, validatePermissions} = usePermissions();
    return (
        <motion.div
            key={post.id}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            layout
            className="flex relative flex-col rounded-xl overflow-hidden shadow bg-body hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 max-h-[425px] h-[425px] min-h-[425px]"
        >
            <Image
                src={post.banner || "/assets/FondoPortada.jpg"}
                alt={post.title}
                preview={post.banner ? true : false}
                className="w-full h-40"
            />
            <div className="p-4 h-full flex flex-col">
                <div className="flex-1">
                    <span className="text-sm text-neutral-600">
                        {post.author?.name} - {t(post.status)}
                    </span>
                    <h2 className="text-xl font-bold text-ellipsis line-clamp-1">{post.title}</h2>
                    <Typography.Paragraph ellipsis={{rows: 3}} className="mt-2 h-16">
                        {post.description}
                    </Typography.Paragraph>
                </div>
                {!loading && (
                    <div className="mt-4 flex justify-between">
                        {validatePermissions("@post-edit") && (
                            <Link href={`/dashboard/posts/${post.id}`}>
                                <Button type="primary">Editar</Button>
                            </Link>
                        )}
                        {validatePermissions("@post-delete") && (
                            <Popconfirm
                                title="¿Estás seguro de que deseas eliminar esta publicación?"
                                okText="Sí"
                                cancelText="No"
                                onConfirm={() => {
                                    deletePost(post.id);
                                }}
                                okButtonProps={{
                                    loading: isLoading,
                                }}
                            >
                                <Button danger className="ml-2">
                                    Eliminar
                                </Button>
                            </Popconfirm>
                        )}
                    </div>
                )}
            </div>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
                    >
                        <Spin
                            size="large"
                            indicator={
                                <FontAwesomeIcon
                                    className="animate-spin"
                                    icon={faSpinner}
                                />
                            }
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default CardPost;
