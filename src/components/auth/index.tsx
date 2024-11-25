"use client";
import {Button, Form, Input, message} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faLock} from "@fortawesome/free-solid-svg-icons";
import {useTranslations} from "next-intl";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

export function LoginForm({callback}: {callback: string}) {
    const t = useTranslations("auth");
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (event: {
        username: string;
        password: string;
        remember: boolean;
    }) => {
        messageApi.open({
            key: "signIn",
            type: "loading",
            content: t("form.sign_in_working"),
        });
        signIn("credentials", {...event, redirect: false}).then((e) => {
            if (!e?.ok) {
                messageApi.open({
                    key: "signIn",
                    type: "error",
                    content: t(e?.error),
                });
                return;
            }
            messageApi.open({
                key: "signIn",
                type: "success",
                content: "Sesión ",
            });
            if (callback) {
                router.replace(callback);
            }
        });
    };
    return (
        <div className="p-5 w-full sm:p-10 sm:w-9/12 md:w-6/12 md:bg-body md:rounded-xl lg:w-80">
            {contextHolder}
            <Form
                name="login"
                initialValues={{remember: true}}
                onFinish={onFinish}
                className="w-full"
            >
                <Form.Item className="text-center my-3 hover:text-primary transition duration-150">
                    <i className="icon-navbar text-7xl"></i>
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: t("form.errors.username_required"),
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <FontAwesomeIcon icon={faUser} className="mr-1" />
                        }
                        placeholder={t("form.username")}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: t("form.errors.password_required"),
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <FontAwesomeIcon icon={faLock} className="mr-1" />
                        }
                        type="password"
                        placeholder={t("form.password")}
                    />
                </Form.Item>
                {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>{t("form.remember_me")}</Checkbox>
                </Form.Item> */}
                <Form.Item>
                    <Button
                        className="mt-2"
                        block
                        type="primary"
                        htmlType="submit"
                    >
                        {t("form.sign_in")}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
