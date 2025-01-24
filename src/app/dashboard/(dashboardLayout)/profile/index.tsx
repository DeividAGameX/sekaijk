"use client";
import useUserSession from "@/hooks/useUserSession";
import {useProfileQuery} from "@/lib/storage/Api/profile";
import {setTitulo} from "@/lib/storage/Reducers/layout.reducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Image, Tabs, Tag, Typography} from "antd";
import {useTranslations} from "next-intl";
import {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
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
import UserSettings from "./components/UserForm";
import UserPost from "./components/Posts";

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
                                __html: userData?.description,
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
