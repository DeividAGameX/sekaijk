"use client";

import HeaderPage from "@/components/admin/HeaderPage";
import ModalForm from "@/components/admin/ModelForm";
import FileManager from "@/components/admin/FileManager/FileManager";
import useUserSession from "@/hooks/useUserSession";
import {
    useCreateUserMutation,
    useDeleteUserMutation,
    useGetUserByIdQuery,
    useGetUserQuery,
    useUpdateUserMutation,
} from "@/lib/storage/Api/admin/users";
import {faEdit, faImage, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    Avatar,
    Button,
    Dropdown,
    Form,
    Image,
    Input,
    Popconfirm,
    Select,
    Table,
} from "antd";
import {useTranslations} from "next-intl";
import {useState} from "react";
import {useGetRolesQuery} from "@/lib/storage/Api/admin/roles";

interface UserFormType {
    id?: number;
    isOpen: boolean;
    onClose: () => void;
}

const BannerImg = ({
    value,
    onChange,
}: {
    id: any;
    value?: any;
    onChange?: (e: any) => void;
}) => {
    const [open, setOpen] = useState(false);
    const [previewImg, setPreviewImg] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const t = useTranslations("posts.editForm");

    const selectFile = (e: any) => {
        if (onChange) {
            console.log(e);
            onChange(e);
            setOpen(false);
        }
    };

    return (
        <div className="h-48 cursor-pointer">
            {value ? (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: 1,
                                label: "Ver imagen",
                                onClick: () => {
                                    setPreviewOpen(true);
                                    setPreviewImg(value);
                                },
                            },
                            {
                                key: 2,
                                label: "Cambiar de imagen",
                                onClick: () => {
                                    setOpen(true);
                                },
                            },
                        ],
                    }}
                    trigger={["contextMenu", "click"]}
                >
                    <div className="w-full h-full rounded-lg relative overflow-hidden border-2 border-transparent transition duration-150 hover:border-[var(--primary)]">
                        <Image
                            src={value}
                            alt=""
                            style={{width: "100%", height: "100%"}}
                            preview={false}
                        />
                    </div>
                </Dropdown>
            ) : (
                <div
                    onClick={() => setOpen(true)}
                    className="w-full h-full flex flex-col justify-center items-center bg-primary border-solid border-2 border-body rounded-lg transition duration-150 hover:border-[var(--primary)] hover:text-primary"
                >
                    <FontAwesomeIcon
                        icon={faImage}
                        style={{fontSize: "72px"}}
                    />
                    <p>{t("banner")}</p>
                </div>
            )}
            <Image
                src=""
                alt=""
                preview={{
                    src: previewImg,
                    visible: previewOpen,
                    onVisibleChange: (value) => {
                        setPreviewOpen(value);
                    },
                }}
            />
            <FileManager
                open={open}
                size={1080 / 1080}
                onClose={() => setOpen(false)}
                selectFile={selectFile}
            />
        </div>
    );
};

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
            <Form.Item
                name={"password"}
                label={t("form.password")}
                rules={[{required: true, message: t("form.nameRequired")}]}
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
                        required: true,
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

function UserPage() {
    const t = useTranslations("users");
    const [deleteUser, {isLoading: deleting}] = useDeleteUserMutation();
    const {loading, user} = useUserSession();
    const [openForm, setOpenForm] = useState(false);
    const [idUser, setIdUser] = useState(0);
    const columns = [
        {
            key: "avatar",
            dataIndex: "avatar",
            title: t("columns.avatar"),
            render: (avatar: string) => <Avatar size={72} src={avatar} />,
        },
        {
            key: "name",
            dataIndex: "name",
            title: t("columns.name"),
        },
        {
            key: "email",
            dataIndex: "email",
            title: t("columns.email"),
        },
        {
            key: "Roles",
            dataIndex: "Roles",
            title: t("columns.role"),
            render: (role: any) => role?.name,
        },
        {
            key: "action",
            title: t("columns.action.title"),
            dataIndex: "id",
            render: (idInfo: any) =>
                !loading &&
                user.id != idInfo && (
                    <div className="flex gap-2">
                        <Button
                            type="primary"
                            icon={<FontAwesomeIcon icon={faEdit} />}
                            onClick={() => {
                                setOpenForm(true);
                                setIdUser(idInfo);
                            }}
                        />
                        <Popconfirm
                            title={t("columns.action.deleteTitle")}
                            onConfirm={() => deleteUser(idInfo)}
                            okText={t("columns.action.deleteConfirm")}
                            cancelText={t("columns.action.deleteCancel")}
                        >
                            <Button
                                danger
                                type="default"
                                icon={<FontAwesomeIcon icon={faTrash} />}
                            />
                        </Popconfirm>
                    </div>
                ),
        },
    ];
    const {data, isLoading} = useGetUserQuery(null);

    return (
        <div className="flex flex-col w-ful h-full gap-5">
            <HeaderPage
                formItems={{
                    add: true,
                    search: true,
                    filter: false,
                }}
                newElement={() => setOpenForm(true)}
                onFinish={console.log}
            >
                Total elementos: 100
            </HeaderPage>
            <div className="bg-body rounded-xl flex-1 p-2 tabla-jk tabla-jk-transparent h-full w-full flex flex-col">
                <Table
                    bordered={false}
                    columns={columns}
                    loading={isLoading || deleting}
                    dataSource={data}
                />
            </div>
            <UserForm
                isOpen={openForm}
                id={idUser}
                onClose={() => {
                    setOpenForm(false);
                    setIdUser(0);
                }}
            />
        </div>
    );
}

export default UserPage;
