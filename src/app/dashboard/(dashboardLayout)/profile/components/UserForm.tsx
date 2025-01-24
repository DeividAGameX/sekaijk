import BannerImg from "@/components/admin/Forms/ImageSelect";
import {Button, Form, Typography} from "antd";
import DescriptionEditor from "./Editor";
import SocialMedia from "./SocialMedia";
import {useEffect, useState} from "react";
import DOMPurify from "isomorphic-dompurify";
import {removeBrTags} from "@/utils/removeTags";
import {useTranslations} from "next-intl";
import {
    useAddSocialMutation,
    useDeleteSocialMutation,
    useUpdateProfileMutation,
} from "@/lib/storage/Api/profile";

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
            await updateProfile({
                ...e,
                description: DOMPurify.sanitize(removeBrTags(e.description)),
            });
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
                <div className="flex flex-wrap md:flex-nowrap w-full gap-2">
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
                        <BannerImg sizeImg={1920/1920} className="w-64 h-64" />
                    </Form.Item>
                    <Form.Item
                        name="banner"
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

export default UserSettings;
