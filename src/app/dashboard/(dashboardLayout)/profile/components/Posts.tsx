import usePermissions from "@/hooks/usePermissions";
import {useGetMyPostQuery} from "@/lib/storage/Api/profile";
import {Button, Image, List} from "antd";
import moment from "moment";
import Link from "next/link";

function UserPost() {
    const {isLoading, data} = useGetMyPostQuery({});
    const {validatePermissions} = usePermissions();

    return (
        <div className="w-full h-full overflow-auto">
            <List
                dataSource={data || []}
                size="large"
                loading={isLoading}
                itemLayout="vertical"
                renderItem={(item: any) => (
                    <List.Item
                        key={item.id}
                        actions={[
                            validatePermissions("@post-edit") && (
                                <Link href={`/dashboard/posts/${item.id}`}>
                                    <Button type="text">Editar</Button>
                                </Link>
                            ),
                        ]}
                        extra={
                            <Image
                                src={item.banner || "/assets/FondoPortada.jpg"}
                                alt=""
                                className="rounded-lg overflow-hidden"
                                width={272}
                            />
                        }
                    >
                        <List.Item.Meta
                            title={
                                <h2 className="text-xl font-bold line-clamp-2">
                                    {item.title}
                                </h2>
                            }
                            description={
                                <p>
                                    {item.Categories?.name}
                                    {" - "}
                                    <span className="font-bold">
                                        {moment(item.createdAt).format("LL")}
                                    </span>
                                </p>
                            }
                        />
                        <div className="line-clamp-1">{item.description}</div>
                    </List.Item>
                )}
            />
        </div>
    );
}

export default UserPost;
