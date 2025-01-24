"use client";

import HeaderPage from "@/components/admin/HeaderPage";
import useUserSession from "@/hooks/useUserSession";
import {
    useDeleteUserMutation,
    useGetUserQuery,
} from "@/lib/storage/Api/admin/users";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Avatar, Button, Popconfirm, Table} from "antd";
import {useTranslations} from "next-intl";
import {useState} from "react";
import UserForm from "./components/UserForm";

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
