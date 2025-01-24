import ModalForm from "@/components/admin/ModelForm";
import {
    useCreateUserMutation,
    useGetUserByIdQuery,
    useUpdateUserMutation,
} from "@/lib/storage/Api/admin/users";
import {Checkbox, Form, Input, Select} from "antd";
import {useGetRolesQuery} from "@/lib/storage/Api/admin/roles";
import {useTranslations} from "next-intl";
import BannerImg from "./BannerImg";

interface UserFormType {
    id?: number;
    isOpen: boolean;
    onClose: () => void;
}

function UserForm({isOpen, id, onClose}: UserFormType) {
    const t = useTranslations("users");
    const {data: roles, isLoading: fetchingRoles} = useGetRolesQuery({});
    const {data: user, isLoading: fetchingUser} = useGetUserByIdQuery(id, {
        skip: !id,
    });
    const [createUser] = useCreateUserMutation();
    const [updateUser] = useUpdateUserMutation();

    const onSubmit = (value: any) => {
        value.confirm = undefined;
        if (id) value.id = id;
        return id ? updateUser(value) : createUser(value);
    };

    return (
        <ModalForm
            open={isOpen}
            values={id ? user : {}}
            isLoading={fetchingUser}
            onFinish={onSubmit}
            onCancel={onClose}
        >
            <div className="flex gap-2">
                <Form.Item
                    className="flex-1"
                    name={"avatar"}
                    label={t("form.avatar")}
                    rules={[
                        {required: true, message: t("form.avatarRequired")},
                    ]}
                >
                    <BannerImg id={0} />
                </Form.Item>
                <div className="flex-1">
                    <Form.Item
                        name={"name"}
                        label={t("form.name")}
                        rules={[
                            {required: true, message: t("form.nameRequired")},
                            {max: 100, message: t("form.nameMaxLength")},
                        ]}
                    >
                        <Input maxLength={100} />
                    </Form.Item>
                    <Form.Item
                        name={"email"}
                        label={t("form.email")}
                        rules={[
                            {required: true, message: t("form.emailRequired")},
                            {type: "email", message: t("form.emailInvalid")},
                        ]}
                    >
                        <Input maxLength={100} />
                    </Form.Item>
                    <Form.Item
                        name={"rolesId"}
                        label={t("form.role")}
                        rules={[
                            {required: true, message: t("form.roleRequired")},
                        ]}
                    >
                        <Select
                            loading={fetchingRoles}
                            options={(roles || []).map((role: any) => ({
                                value: role.id,
                                label: role.name,
                            }))}
                        />
                    </Form.Item>
                </div>
            </div>
            <Form.Item name={"isPublic"} valuePropName="checked">
                <Checkbox>{t("form.team")}</Checkbox>
            </Form.Item>
            <Form.Item
                name={"password"}
                label={t("form.password")}
                rules={[{required: !id, message: t("form.nameRequired")}]}
            >
                <Input.Password maxLength={100} />
            </Form.Item>
            <Form.Item
                name={"confirm"}
                label={t("form.confirmPassword")}
                dependencies={["password"]}
                hasFeedback
                rules={[
                    {
                        required: !id,
                        message: t("form.confirmPasswordRequired"),
                    },
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error(t("form.confirmPasswordMismatch"))
                            );
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
        </ModalForm>
    );
}

export default UserForm;
