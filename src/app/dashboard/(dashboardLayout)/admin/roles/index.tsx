"use client";
import HeaderPage from "@/components/admin/HeaderPage";
import {
    useDeleteRolesMutation,
    useGetRolesQuery,
} from "@/lib/storage/Api/admin/roles";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Popconfirm, Table, Tag} from "antd";
import {useTranslations} from "next-intl";
import {useState} from "react";
import RolesForm from "./components/RoleForm";

function RolesPage() {
    const t = useTranslations("roles");
    const {isLoading, data} = useGetRolesQuery({});
    const [deleteRole, {isLoading: deleting}] = useDeleteRolesMutation();
    const [openForm, setOpenForm] = useState(false);
    const [idRole, setIdRole] = useState(0);

    const columns = [
        {
            title: t("columns.id"),
            dataIndex: "id",
            key: "id",
        },
        {
            title: t("columns.name"),
            dataIndex: "name",
            key: "name",
            width: "300px",
        },
        Table.EXPAND_COLUMN,
        {
            title: t("columns.permissions"),
            dataIndex: "Permissions",
            key: "Permissions",
            render: (Permissions: [any]) => (
                <>
                    <b>
                        {t("columns.permissions")} ({Permissions.length}):
                    </b>
                    <div className="flex flex-wrap">
                        {Permissions.slice(0, 8).map((e: any) => (
                            <Tag key={e.permissions}>{t(e.name)}</Tag>
                        ))}
                        {Permissions.length > 8 && <Tag>...</Tag>}
                    </div>
                </>
            ),
        },
        {
            title: t("columns.action.title"),
            key: "action",
            dataIndex: "id",
            width: "150px",
            render: (idInfo: any) => (
                <div className="flex gap-2">
                    <Button
                        type="primary"
                        icon={<FontAwesomeIcon icon={faEdit} />}
                        onClick={() => {
                            setIdRole(idInfo);
                            setOpenForm(true);
                        }}
                    />
                    <Popconfirm
                        title={t("columns.action.deleteTitle")}
                        onConfirm={() => deleteRole(idInfo)}
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

    return (
        <div className="flex flex-col w-full h-full gap-5">
            <HeaderPage
                formItems={{
                    add: true,
                    search: true,
                    filter: false,
                }}
                newElement={() => setOpenForm(true)}
                onFinish={console.log}
            />
            <div className="bg-body rounded-xl flex-1 p-2 tabla-jk tabla-jk-transparent h-full w-full flex flex-col">
                <Table
                    bordered={false}
                    columns={columns}
                    loading={isLoading || deleting}
                    rowKey={"id"}
                    dataSource={data}
                    expandable={{
                        expandedRowRender: (record: any) => (
                            <div className="p-2">
                                <b>{t("columns.permissions")}:</b>{" "}
                                {record.Permissions.map((e: any) => (
                                    <Tag key={e.permissions}>{t(e.name)}</Tag>
                                ))}
                            </div>
                        ),
                        rowExpandable: (record: any) =>
                            record.Permissions.length > 8,
                    }}
                />
            </div>
            <RolesForm
                open={openForm}
                id={idRole}
                onClose={() => {
                    setOpenForm(false);
                    setIdRole(0);
                }}
            />
        </div>
    );
}

export default RolesPage;
