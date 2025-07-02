import {Avatar, Image, Modal, Tag} from "antd";
import {Post} from "../../types/posts";
import {useTranslations} from "next-intl";

interface ReviewInfoModalProps {
    open: boolean;
    onClose: () => void;
    data: Post & {
        Categories: {
            name: string;
        } | null;
        author: {
            name: string;
            avatar: string;
        };
    };
}

function ReviewInfoModal({open, onClose, data}: ReviewInfoModalProps) {
    const tForm = useTranslations("posts.form");
    return (
        <Modal
            title={
                <div className="flex items-center gap-2">
                    <Avatar src={data.author.avatar} size={"large"} />
                    <p>{data.author.name}</p>
                </div>
            }
            open={open}
            footer={null}
            onCancel={onClose}
            onClose={onClose}
        >
            <div className="m-3">
                <p className="font-bold text-lg py-1">{tForm("title")}</p>
                <p>{data.title}</p>
            </div>
            <div className="m-3">
                <p className="font-bold text-lg py-1">{tForm("description")}</p>
                <p>{data.description}</p>
            </div>
            <div className="m-3">
                <p className="font-bold text-lg py-1">{tForm("banner")}</p>
                <Image src={data.banner ?? ""} alt="" />
            </div>
            <div className="m-3">
                <p className="font-bold text-lg py-1">{tForm("category")}</p>
                <p>{(data.Categories ?? {name: ""}).name}</p>
            </div>
            <div className="m-3">
                <p className="font-bold text-lg py-1">{tForm("tags")}</p>
                <div>
                    {(data.Tags ?? []).map((tag) => (
                        <Tag key={tag.id} color={tag.color}>
                            {tag.name}
                        </Tag>
                    ))}
                </div>
            </div>
        </Modal>
    );
}

export default ReviewInfoModal;
