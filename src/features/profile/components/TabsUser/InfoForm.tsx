import AvatarComponent from "@/features/users/components/Form/AvatarComponent";
import {Button, Form, Input} from "antd";
import {useTranslations} from "next-intl";
import BannerComponent from "./InfoFormComponents/Banner";
import RedesComponent from "./InfoFormComponents/Redes";
import EditorUser from "./InfoFormComponents/EditorComponent";
import {Profile} from "../../types/profile";
import {useUpdateProfileMutation} from "../../lib/Profile.reducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPerson} from "@fortawesome/free-solid-svg-icons";
import {Separator} from "@/components/ui/separator";

function InfoForm(user: Profile) {
    const tUserForm = useTranslations("users.form");
    const tForm = useTranslations("components.form");
    const tProfile = useTranslations("profile");
    const [update, {isLoading}] = useUpdateProfileMutation();
    const [form] = Form.useForm();
    const handleFinish = (e: Profile) => {
        update(e)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={{
                avatar: user.avatar,
                banner: user.banner,
                name: user.name,
                email: user.email,
                description: user.description,
                social: (user.social ?? []).map((s) => ({
                    icon: s.icon,
                    url: s.url,
                })),
            }}
            onFinish={handleFinish}
        >
            <div className="bg-neutral-950 rounded-xl p-1 md:p-4">
                <h2 className="text-2xl mb-2">
                    <FontAwesomeIcon icon={faPerson} className="mr-2" />
                    {tProfile("title")}
                </h2>
                <Separator />
                <div className="flex gap-4 my-3 flex-col items-center lg:flex-row">
                    <div className="w-72 h-72">
                        {/* Avatar */}
                        <Form.Item
                            name={"avatar"}
                            rules={[
                                {
                                    required: true,
                                    message: tForm("error.require"),
                                },
                            ]}
                            noStyle
                        >
                            <AvatarComponent />
                        </Form.Item>
                    </div>
                    <div className="flex-1 h-72">
                        {/* Banner */}
                        <Form.Item
                            name={"banner"}
                            rules={[
                                {
                                    required: true,
                                    message: tForm("error.require"),
                                },
                            ]}
                            noStyle
                        >
                            <BannerComponent />
                        </Form.Item>
                    </div>
                </div>
                <div className="flex gap-0 mb-3 flex-col md:gap-4 md:flex-row">
                    {/* User name */}
                    <Form.Item
                        name={"name"}
                        label={tUserForm("name")}
                        className="w-full"
                        rules={[
                            {
                                max: 150,
                                message: tForm("error.max150"),
                            },
                            {
                                required: true,
                                message: tForm("error.require"),
                            },
                        ]}
                    >
                        <Input maxLength={150} />
                    </Form.Item>
                    {/* Email */}
                    <Form.Item
                        name={"email"}
                        label={tUserForm("email")}
                        className="w-full"
                        rules={[
                            {
                                max: 150,
                                message: tForm("error.max150"),
                            },
                            {
                                required: true,
                                message: tForm("error.require"),
                            },
                        ]}
                    >
                        <Input maxLength={150} />
                    </Form.Item>
                </div>
                <Form.Item name={"social"} label={tProfile("social")}>
                    <RedesComponent />
                </Form.Item>
                <Form.Item name={"description"} noStyle>
                    <EditorUser />
                </Form.Item>
                <Separator className="my-4" />
                <Button
                    htmlType="submit"
                    type="primary"
                    block
                    loading={isLoading}
                >
                    {tForm("save")}
                </Button>
            </div>
        </Form>
    );
}

export default InfoForm;
