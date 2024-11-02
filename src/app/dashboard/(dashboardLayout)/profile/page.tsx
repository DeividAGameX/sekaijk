"use client";
import DescriptionEditor from "@/components/admin/EditorComponents/DescriptionEditor";
import useUserSession from "@/hooks/useUserSession";
import {
    useAddSocialMutation,
    useDeleteSocialMutation,
    useGetMyPostQuery,
    useProfileQuery,
    useUpdateProfileMutation,
} from "@/lib/storage/Api/profile";
import {setTitulo} from "@/lib/storage/Reducers/layout.reducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    Button,
    Form,
    Image,
    Input,
    List,
    Select,
    Spin,
    Tabs,
    Tag,
    Typography,
} from "antd";
import {useTranslations} from "next-intl";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {SocialMedia as mediaInfo} from "@/utils/SocialMedia";
import {faAdd, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {
    faDiscord,
    faFacebook,
    faGithub,
    faInstagram,
    faPinterest,
    faSpotify,
    faThreads,
    faTiktok,
    faTwitch,
    faTwitter,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {AnimatePresence, motion} from "framer-motion";
import usePermissions from "@/hooks/usePermissions";
import Link from "next/link";
import BannerImg from "@/components/admin/Forms/ImageSelect";
import DOMPurify from "isomorphic-dompurify";

function SocialMedia({
    social,
    onAdd,
    onRemove,
}: {
    social: any[];
    onAdd: (e: any) => Promise<any>;
    onRemove: (e: any) => Promise<any>;
}) {
    const t = useTranslations("social");
    const [socialMedia, setSocialMedia] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");
    const [option, setOption] = useState("");
    const iconsSocialMedia = {
        facebook: faFacebook,
        twitter: faTwitter,
        instagram: faInstagram,
        youtube: faYoutube,
        tiktok: faTiktok,
        discord: faDiscord,
        twitch: faTwitch,
        spotify: faSpotify,
        github: faGithub,
        thread: faThreads,
        pinterest: faPinterest,
    };
    const colorSocialMedia = {
        youtube: "#FE0000",
        facebook: "#0866FF",
        instagram: "#E4405F",
        twitter: "#1DA1F2",
        tiktok: "#000000",
        twitch: "#6441A5",
        discord: "#7289DA",
        reddit: "#FF4500",
        spotify: "#1DB954",
        pinterest: "#BD081C",
        threads: "#000000",
        github: "#181717",
    };

    const handleAdd = () => {
        if (option && url) {
            setLoading(true);
            onAdd({icon: option, url: url})
                .then((e) => {
                    setSocialMedia((old) => [...old, e.data]);
                    setUrl("");
                    setOption("");
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    };

    const handleRemove = (id: any) => {
        setLoading(false);
        onRemove(id)
            .then(() => {
                setSocialMedia((old) => old.filter((m) => m.id !== id));
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (social) setSocialMedia(social);
    }, [social]);

    return (
        <div className="w-full relative">
            <div className="flex flex-wrap my-2">
                {socialMedia.map((item) => (
                    <Tag
                        key={item.id}
                        color={
                            colorSocialMedia[
                                item.icon as keyof typeof colorSocialMedia
                            ]
                        }
                        icon={
                            <FontAwesomeIcon
                                className="mr-2"
                                icon={
                                    iconsSocialMedia[
                                        item.icon as keyof typeof iconsSocialMedia
                                    ]
                                }
                            />
                        }
                        closable={true}
                        onClose={() => handleRemove(item.id)}
                    >
                        {t(`items.${item.icon}`)}
                    </Tag>
                ))}
            </div>
            <div className="flex gap-1 items-center">
                <Select
                    options={mediaInfo.filter(
                        (s) => !socialMedia.some((m) => m.icon === s.value)
                    )}
                    value={option}
                    onChange={(e) => setOption(e)}
                    style={{minWidth: "100px"}}
                />
                <Input
                    placeholder="URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <Button
                    onClick={handleAdd}
                    icon={<FontAwesomeIcon icon={faAdd} />}
                />
            </div>
            <AnimatePresence>
                {loading && (
                    <motion.div className="w-full h-full absolute top-0 left-0 bg-neutral-800/60">
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
        </div>
    );
}

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
                            title={item.title}
                            description={item.author?.name}
                        >
                            {item.description}
                        </List.Item.Meta>
                    </List.Item>
                )}
            />
        </div>
    );
}

function UserSettings({user}: {user: any}) {
    const t = useTranslations("profile.settings");
    const [loading, setLoading] = useState(false);
    const [generalFrom] = Form.useForm();
    const [updateProfile] = useUpdateProfileMutation();
    const [addSocialFetch] = useAddSocialMutation();
    const [deleteSocialFetch] = useDeleteSocialMutation();

    const addSocial = async (value: any) => {
        return addSocialFetch(value);
    };

    const removeSocial = async (value: any) => {
        return deleteSocialFetch(value);
    };

    const submitData = async (e: any) => {
        setLoading(true);
        try {
            await updateProfile(e);
        } catch (err) {}
        setLoading(false);
    };

    useEffect(() => {
        if (user) {
            generalFrom.setFieldsValue({
                avatar: user.avatar,
                banner: user.banner,
                description: user.description,
            });
        }
    }, [user]);
    return (
        <div>
            <Typography.Title level={3}>{t("general.title")}</Typography.Title>
            <SocialMedia
                social={user?.social}
                onAdd={addSocial}
                onRemove={removeSocial}
            />
            <Form
                form={generalFrom}
                defaultValue={user}
                onFinish={submitData}
                layout="vertical"
            >
                <div className="max-h-64 w-full flex-1 flex flex-col h-64">
                    <Form.Item name={"description"} noStyle>
                        <DescriptionEditor />
                    </Form.Item>
                </div>
                <div className="flex w-full gap-2">
                    <Form.Item
                        name="avatar"
                        label={t("general.avatar")}
                        rules={[
                            {
                                required: true,
                                message: t("general.avatarRequired"),
                            },
                        ]}
                    >
                        <BannerImg className="w-64 h-64" />
                    </Form.Item>
                    <Form.Item
                        name="banner"
                        className="w-full"
                        rootClassName="w-full"
                        label={t("general.banner")}
                    >
                        <BannerImg
                            className="w-full h-64"
                            sizeImg={1600 / 640}
                        />
                    </Form.Item>
                </div>
                <Button loading={loading} type="primary" htmlType="submit">
                    {t("general.saveChanges")}
                </Button>
            </Form>
        </div>
    );
}

function User() {
    const dispatch = useDispatch();
    const postTranslation = useTranslations("profile.posts");
    const settingsTranslation = useTranslations("profile.settings");
    const socialT = useTranslations("social");
    const {loading: loadingSession, user} = useUserSession();
    const {data: userData} = useProfileQuery({});
    const editor = useRef<any>();
    const iconsSocialMedia = {
        facebook: faFacebook,
        twitter: faTwitter,
        instagram: faInstagram,
        youtube: faYoutube,
        tiktok: faTiktok,
        discord: faDiscord,
        twitch: faTwitch,
        spotify: faSpotify,
        github: faGithub,
        thread: faThreads,
        pinterest: faPinterest,
    };
    const colorSocialMedia = {
        youtube: "#FE0000",
        facebook: "#0866FF",
        instagram: "#E4405F",
        twitter: "#1DA1F2",
        tiktok: "#000000",
        twitch: "#6441A5",
        discord: "#7289DA",
        reddit: "#FF4500",
        spotify: "#1DB954",
        pinterest: "#BD081C",
        threads: "#000000",
    };

    useEffect(() => {
        if (!loadingSession && user) {
            dispatch(setTitulo(user.name));
        }
    }, [loadingSession, user]);

    useEffect(() => {
        if (userData && editor.current) {
            editor.current.chain().setContent(userData.description).run();
        }
    }, [userData]);

    return (
        <div className="flex flex-wrap w-full h-full gap-10">
            <div className="bg-body rounded-lg p-10 flex flex-col items-center w-full max-w-xl">
                <div className="w-64 h-64 rounded-full overflow-hidden">
                    <Image src={userData?.avatar} alt="User Avatar" />
                </div>
                <div className="flex flex-col items-center w-full gap-2">
                    <h1 className="text-5xl">{userData?.name}</h1>
                    {userData?.social && (
                        <div className="flex flex-wrap my-2">
                            {userData?.social.map((item: any) => (
                                <Tag
                                    key={item.id}
                                    color={
                                        colorSocialMedia[
                                            item.icon as keyof typeof colorSocialMedia
                                        ]
                                    }
                                    icon={
                                        <FontAwesomeIcon
                                            className="mr-2"
                                            icon={
                                                iconsSocialMedia[
                                                    item.icon as keyof typeof iconsSocialMedia
                                                ]
                                            }
                                        />
                                    }
                                >
                                    {socialT(`items.${item.icon}`)}
                                </Tag>
                            ))}
                        </div>
                    )}
                    {userData?.description && (
                        <div
                            className="max-h-64 w-full flex-1 flex flex-col h-full"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                    userData?.description
                                ),
                            }}
                        />
                    )}
                </div>
            </div>
            <div className="p-5 flex-1 bg-body rounded-lg profile-post">
                <Tabs
                    items={[
                        {
                            label: (
                                <Typography.Title level={3}>
                                    {postTranslation("title")}
                                </Typography.Title>
                            ),
                            key: "post",
                            children: <UserPost />,
                        },
                        {
                            label: (
                                <Typography.Title level={3}>
                                    {settingsTranslation("title")}
                                </Typography.Title>
                            ),
                            key: "settings",
                            children: <UserSettings user={userData} />,
                        },
                    ]}
                />
            </div>
        </div>
    );
}

export default User;
