type SocialOptions = {
    label: string;
    value: string;
    color: string;
};

export const SocialName = {
    youtube: "YouTube",
    facebook: "Facebook",
    instagram: "Instagram",
    twitter: "Twitter",
    tiktok: "TikTok",
    twitch: "Twitch",
    discord: "Discord",
    reddit: "Reddit",
    spotify: "Spotify",
    threads: "Threads",
};

export const SocialClass = {
    youtube: "bg-youtube",
    facebook: "bg-facebook",
    instagram: "bg-instagram",
    twitter: "bg-twitter",
    tiktok: "bg-tiktok",
    twitch: "bg-twitch",
    discord: "bg-discord",
    reddit: "bg-reddit",
    spotify: "bg-spotify",
    threads: "bg-threads",
};

export const SocialBgOutline = {
    youtube:
        "text-youtube border-2 border-youtube hover:text-white hover:bg-youtube transition duration-150",
    facebook:
        "text-facebook border-2 border-facebook hover:text-white hover:bg-facebook transition duration-150",
    instagram:
        "text-instagram border-2 border-instagram hover:text-white hover:bg-instagram transition duration-150",
    twitter:
        "text-twitter border-2 border-twitter hover:text-white hover:bg-twitter transition duration-150",
    tiktok: "text-tiktok border-2 border-tiktok hover:text-white hover:bg-tiktok transition duration-150",
    twitch: "text-twitch border-2 border-twitch hover:text-white hover:bg-twitch transition duration-150",
    discord:
        "text-discord border-2 border-discord hover:text-white hover:bg-discord transition duration-150",
    reddit: "text-reddit border-2 border-reddit hover:text-white hover:bg-reddit transition duration-150",
    spotify:
        "text-spotify border-2 border-spotify hover:text-white hover:bg-spotify transition duration-150",
    threads:
        "text-threads border-2 border-threads hover:text-white hover:bg-threads transition duration-150",
};

export const SocialMedia: SocialOptions[] = [
    {
        label: "YouTube",
        value: "youtube",
        color: "#fe0000",
    },
    {
        label: "Facebook",
        value: "facebook",
        color: "#0866ff",
    },
    {
        label: "Instagram",
        value: "instagram",
        color: "#e4405f",
    },
    {
        label: "Twitter",
        value: "twitter",
        color: "#1da1f2",
    },
    {
        label: "TikTok",
        value: "tiktok",
        color: "#000000",
    },
    {
        label: "Twitch",
        value: "twitch",
        color: "#6441a5",
    },
    {
        label: "Discord",
        value: "discord",
        color: "#7289da",
    },
    {
        label: "Reddit",
        value: "reddit",
        color: "#ff4500",
    },
    {
        label: "Spotify",
        value: "spotify",
        color: "#1db954",
    },
    {
        label: "Threads",
        value: "threads",
        color: "#000000",
    },
];
