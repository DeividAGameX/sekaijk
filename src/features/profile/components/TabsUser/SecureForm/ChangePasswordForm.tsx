import {useChangePasswordMutation} from "@/features/profile/lib/Profile.reducer";
import {Button, Form, Input, message} from "antd";
import {useTranslations} from "next-intl";

interface PasswordChange {
    currentPassword: string;
    newPassword: string;
    confirm: string;
}

function ChangePassword() {
    const [form] = Form.useForm();
    const tSecure = useTranslations("profile");
    const [messageApi, contextHolder] = message.useMessage();
    const [updatePassword, {isLoading, error}] = useChangePasswordMutation();

    const handleFinish = async (values: PasswordChange) => {
        await updatePassword({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
        }).then(
            () => {
                if (error) {
                    const err = error as {
                        status: number;
                        data: {message: string};
                    };
                    switch (err.status) {
                        case 401:
                            messageApi.error(tSecure("invalidToken"));
                            break;
                        case 403:
                            messageApi.error(tSecure(err.data.message));
                            break;
                        default:
                            messageApi.error(err.data.message);
                    }
                    return;
                }
                messageApi.success(tSecure("passwordChanged"));
            },
            () => {
                console.log("has error");
            }
        );
        console.log(error);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            className="relative"
            onFinish={handleFinish}
        >
            {contextHolder}
            <Form.Item
                name={"currentPassword"}
                label={tSecure("currentPassword")}
                className="w-full"
                rules={[
                    {
                        required: true,
                        message: tSecure("passwordRequired"),
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="newPassword"
                label={tSecure("newPassword")}
                dependencies={["currentPassword"]}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: tSecure("passwordRequired"),
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: tSecure("passwordRequired"),
                    },
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (
                                !value ||
                                getFieldValue("newPassword") === value
                            ) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error(tSecure("passwordMismatch"))
                            );
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Button type="primary" loading={isLoading} htmlType="submit" block>
                Guardar
            </Button>
        </Form>
    );
}

export default ChangePassword;
