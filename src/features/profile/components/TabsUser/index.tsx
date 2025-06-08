"use client";
import {Tabs} from "antd";
import {useTranslations} from "next-intl";
import PostListTab from "./PostListTab";
import InfoForm from "./InfoForm";
import SecureTab from "./Secure";
import {Profile} from "../../types/profile";

function TabUser(user: Profile) {
    const tProfile = useTranslations("profile.labels");
    return (
        <Tabs
            defaultActiveKey="1"
            className="tabs-jk"
            items={[
                {
                    key: "posts",
                    label: tProfile("posts"),
                    className: "overflow-auto h-full md:px-2",
                    children: <PostListTab />,
                },
                {
                    key: "info",
                    label: tProfile("info"),
                    className: "overflow-auto h-full md:px-2",
                    children: <InfoForm {...user} />,
                },
                {
                    key: "secure",
                    label: tProfile("secure"),
                    className: "overflow-auto h-full md:px-2",
                    children: <SecureTab />,
                },
            ]}
        />
    );
}

export default TabUser;
