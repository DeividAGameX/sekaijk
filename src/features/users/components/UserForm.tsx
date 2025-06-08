"use client";
import {RootState} from "@/lib/store";
import {Form, Input, Modal, Select} from "antd";
import {useTranslations} from "next-intl";
import {useDispatch, useSelector} from "react-redux";
import {setId, toggleOpen} from "../lib/userModal.reducer";
import {useEffect} from "react";
import {
    useCreateUserMutation,
    useGetUserQuery,
    useUpdateUserMutation,
} from "../lib/user.reducer";
import AvatarComponent from "./Form/AvatarComponent";
import {useGetAllRolesQuery} from "@/features/roles/lib/Roles.reducer";
import {Roles} from "@/features/roles/types/roles";
import {useGetAllTeamRolesQuery} from "@/features/teamRole/lib/TeamRole.reducer";
import {TeamRole} from "@/features/teamRole/types/teamRole";

function UserForm() {
    const {id, open} = useSelector((state: RootState) => state.userModal);
    const [createTag, {isLoading}] = useCreateUserMutation();
    const [updateTag, {isLoading: updating}] = useUpdateUserMutation();
    const {data: user, isLoading: loadingUser} = useGetUserQuery(id ?? "", {
        skip: !id,
    });
    const {data: roles, isLoading: loadingRol} = useGetAllRolesQuery({});
    const {data: teams, isLoading: loadingTeams} = useGetAllTeamRolesQuery({});
    const tUserForm = useTranslations("users.form");
    const tForm = useTranslations("components.form");
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const closeForm = () => {
        form.resetFields();
        dispatch(toggleOpen());
        dispatch(setId(null));
    };

    const finish = () => {
        form.resetFields();
        dispatch(toggleOpen());
        dispatch(setId(null));
    };

    const onSubmit = async () => {
        form.validateFields()
            .then((data) => {
                data.confirm = undefined;
                if (id) {
                    updateTag({id, ...data}).then(finish);
                } else {
                    createTag({...data}).then(finish);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (id) {
            if (!loadingUser && user) {
                form.setFieldValue("name", user.name);
                form.setFieldValue("email", user.email);
                form.setFieldValue("avatar", user.avatar);
                form.setFieldValue("rolesId", user.rolesId);
                form.setFieldValue(
                    "TeamRoles",
                    (user.TeamRoles ?? []).map((tr: TeamRole) => tr.id)
                );
            }
        }
    }, [id, user, loadingUser, form]);

    return (
        <Modal
            open={open}
            onCancel={closeForm}
            title={tUserForm("title")}
            okText={id ? tForm("save") : tForm("create")}
            cancelText={tForm("cancel")}
            onOk={onSubmit}
            okButtonProps={{
                loading: isLoading || updating,
            }}
            loading={loadingUser || loadingRol || loadingTeams}
        >
            <Form form={form} layout="vertical">
                <div className="flex gap-4 mb-3">
                    <Form.Item
                        name={"avatar"}
                        label={tUserForm("avatar")}
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
                    <div className="w-full">
                        <Form.Item
                            name={"name"}
                            label={tUserForm("name")}
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
                        <Form.Item
                            name={"email"}
                            label={tUserForm("email")}
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
                </div>
                <Form.Item
                    name={"rolesId"}
                    label={tUserForm("role")}
                    rules={[
                        {
                            required: true,
                            message: tForm("error.require"),
                        },
                    ]}
                >
                    <Select
                        options={(roles ?? []).map((r: Roles) => ({
                            label: r.name,
                            value: r.id,
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    name={"TeamRoles"}
                    label={tUserForm("team")}
                    rules={[
                        {
                            required: true,
                            message: tForm("error.require"),
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        options={(teams ?? []).map((r: TeamRole) => ({
                            label: r.name,
                            value: r.id,
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: !id,
                            message: tForm("error.require"),
                        },
                    ]}
                    hasFeedback
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
                            required: !id,
                            message: tForm("error.require"),
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(tForm("error.password_match"))
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default UserForm;
