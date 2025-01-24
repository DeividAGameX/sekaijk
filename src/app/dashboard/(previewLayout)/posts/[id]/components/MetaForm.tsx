import {useGetCategoriesQuery} from "@/lib/storage/Api/categories";
import {useGetTagsQuery} from "@/lib/storage/Api/tags";
import {RootState} from "@/lib/storage/store";
import {Collapse, Drawer, FloatButton, Form, Input, Select, Tag} from "antd";
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import BannerImg from "@/components/admin/Forms/ImageSelect";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfo} from "@fortawesome/free-solid-svg-icons";

const TagRender = (props: any) => {
    const {label, value, closable, onClose, tagList} = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    const color = tagList.find((i: any) => i.id === value)?.color;
    return (
        <Tag
            color={color}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{marginInlineEnd: 4}}
        >
            {label}
        </Tag>
    );
};

function InformationPost({
    data,
    infoPost,
    isRequired,
}: {
    data: any;
    infoPost: any;
    isRequired: boolean;
}) {
    const t = useTranslations("posts.editForm");
    const {data: categories} = useGetCategoriesQuery({});
    const {data: tags} = useGetTagsQuery({});
    const {breakPoint} = useSelector((root: RootState) => root.layout);
    const [openInfo, setOpenInfo] = useState(false);

    useEffect(() => {
        if (data) {
            infoPost.setFieldsValue({
                id: data?.id,
                title: data?.title,
                description: data?.description,
                banner: data?.banner,
                categoryId: data?.categoryId,
                Tags: data?.Tags?.map((i: any) => i.id),
            });
        }
    }, [data]);

    return (
        <div className="max-w-96 md:min-w-96 px-1 md:p-2">
            {!breakPoint ? (
                <Collapse
                    bordered={false}
                    defaultActiveKey={"Info"}
                    className="w-full bg-body p-4 rounded-lg"
                    items={[
                        {
                            label: "Info",
                            key: "Info",
                            children: (
                                <Form form={infoPost} layout="vertical">
                                    <Form.Item
                                        name={"banner"}
                                        rules={[
                                            {
                                                required: isRequired,
                                                message: t("bannerRequired"),
                                            },
                                        ]}
                                    >
                                        <BannerImg
                                            className="h-48"
                                            sizeImg={1920 / 1080}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="title"
                                        label={t("titleLabel")}
                                        rules={[
                                            {
                                                required: true,
                                                message: t("titleRequired"),
                                            },
                                        ]}
                                    >
                                        <Input maxLength={200} />
                                    </Form.Item>
                                    <Form.Item
                                        name="description"
                                        label={t("descriptionLabel")}
                                        rules={[
                                            {
                                                required: true,
                                                message: t(
                                                    "descriptionRequired"
                                                ),
                                            },
                                        ]}
                                    >
                                        <Input.TextArea />
                                    </Form.Item>
                                    <Form.Item
                                        name="categoryId"
                                        label={t("category")}
                                        rules={[
                                            {
                                                required: isRequired,
                                                message: t("categoryRequired"),
                                            },
                                        ]}
                                    >
                                        <Select
                                            options={(categories || []).map(
                                                (i: any) => ({
                                                    value: i.id,
                                                    label: i.name,
                                                })
                                            )}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="Tags"
                                        label={t("tags")}
                                        rules={[
                                            {
                                                required: isRequired,
                                                message: t("tagsRequired"),
                                            },
                                        ]}
                                    >
                                        <Select
                                            mode="multiple"
                                            tagRender={(props) => (
                                                <TagRender
                                                    {...{
                                                        ...props,
                                                        tagList: tags || [],
                                                    }}
                                                />
                                            )}
                                            options={(tags || []).map(
                                                (i: any) => ({
                                                    value: i.id,
                                                    label: i.name,
                                                    color: i.color,
                                                })
                                            )}
                                        />
                                    </Form.Item>
                                </Form>
                            ),
                        },
                    ]}
                />
            ) : (
                <>
                    <FloatButton
                        icon={<FontAwesomeIcon icon={faInfo} />}
                        onClick={() => setOpenInfo(true)}
                    />
                    <Drawer open={openInfo} onClose={() => setOpenInfo(false)}>
                        <Form form={infoPost} layout="vertical">
                            <Form.Item
                                name={"banner"}
                                rules={[
                                    {
                                        required: isRequired,
                                        message: t("bannerRequired"),
                                    },
                                ]}
                            >
                                <BannerImg
                                    className="h-48"
                                    sizeImg={1920 / 1080}
                                />
                            </Form.Item>
                            <Form.Item
                                name="title"
                                label={t("titleLabel")}
                                rules={[
                                    {
                                        required: true,
                                        message: t("titleRequired"),
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label={t("descriptionLabel")}
                                rules={[
                                    {
                                        required: true,
                                        message: t("descriptionRequired"),
                                    },
                                ]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                                name="categoryId"
                                label={t("category")}
                                rules={[
                                    {
                                        required: isRequired,
                                        message: t("categoryRequired"),
                                    },
                                ]}
                            >
                                <Select
                                    options={(categories || []).map(
                                        (i: any) => ({
                                            value: i.id,
                                            label: i.name,
                                        })
                                    )}
                                />
                            </Form.Item>
                            <Form.Item
                                name="Tags"
                                label={t("tags")}
                                rules={[
                                    {
                                        required: isRequired,
                                        message: t("tagsRequired"),
                                    },
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    tagRender={(props) => (
                                        <TagRender
                                            {...{
                                                ...props,
                                                tagList: tags || [],
                                            }}
                                        />
                                    )}
                                    options={(tags || []).map((i: any) => ({
                                        value: i.id,
                                        label: i.name,
                                        color: i.color,
                                    }))}
                                />
                            </Form.Item>
                        </Form>
                    </Drawer>
                </>
            )}
        </div>
    );
}

export default InformationPost;
