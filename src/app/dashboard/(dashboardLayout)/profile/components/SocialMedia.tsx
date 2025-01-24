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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Input, Select, Spin, Tag} from "antd";
import {AnimatePresence, motion} from "framer-motion";
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";
import {SocialMedia as mediaInfo} from "@/utils/SocialMedia";
import {faAdd, faSpinner} from "@fortawesome/free-solid-svg-icons";

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

export default SocialMedia;
