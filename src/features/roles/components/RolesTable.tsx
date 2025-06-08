"use client";
import DashboardTable from "@/components/dashboard/DashboarTable";
import {Button, Popconfirm, TableColumnProps, Typography} from "antd";
import {useTranslations} from "next-intl";
import moment from "moment";
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useGetAllRolesQuery} from "../lib/Roles.reducer";
import {setId, toggleOpen} from "../lib/RolModal.reducer";

function RolesTable(
    {canEdit, canDelete}: {canEdit: boolean; canDelete: boolean} = {
        canDelete: false,
        canEdit: false,
    }
) {
    const tTable = useTranslations("components.table");
    const tForm = useTranslations("components.form");
    const tRoles = useTranslations("roles");
    const {data, isFetching, isLoading} = useGetAllRolesQuery({});
    const dispatch = useDispatch();
    const columns: TableColumnProps[] = [
        {
            key: "id",
            dataIndex: "id",
            title: "ID",
        },
        {
            key: "name",
            dataIndex: "name",
            title: tTable("name"),
        },
        {
            key: "description",
            dataIndex: "description",
            title: tTable("description"),
            className: "max-w-96",
            render: (data) => {
                return (
                    <Typography.Paragraph ellipsis={{rows: 2}}>
                        {data}
                    </Typography.Paragraph>
                );
            },
        },
        {
            key: "Permissions",
            dataIndex: "Permissions",
            title: tRoles("form.permissions"),
            className: "max-w-96",
            render: (data) => {
                return (
                    <Typography.Paragraph ellipsis={{rows: 2}}>
                        {data.length}
                    </Typography.Paragraph>
                );
            },
        },
        {
            key: "createdAt",
            dataIndex: "createdAt",
            title: tTable("createdAt"),
            render: (time) => {
                return moment(time).format("DD/MM/YYYY HH:mm A");
            },
        },
        {
            key: "updatedAt",
            dataIndex: "updatedAt",
            title: tTable("updatedAt"),
            render: (time) => {
                return moment(time).format("DD/MM/YYYY HH:mm A");
            },
        },
    ];

    if (canEdit || canDelete) {
        columns.push({
            key: "actions",
            dataIndex: "id",
            title: tTable("actions"),
            render: (id) => (
                <div className="flex gap-2">
                    {canEdit && (
                        <Button
                            type="primary"
                            icon={<FontAwesomeIcon icon={faEdit} />}
                            onClick={() => editRol(id)}
                        />
                    )}
                    {canDelete && (
                        <Popconfirm
                            title={tRoles("delete")}
                            onConfirm={() => deleteRol(id)}
                            okText={tForm("confirm")}
                            cancelText={tForm("noConfirm")}
                        >
                            <Button
                                danger
                                type="default"
                                icon={<FontAwesomeIcon icon={faTrash} />}
                            />
                        </Popconfirm>
                    )}
                </div>
            ),
        });
    }

    const editRol = (id: number) => {
        dispatch(setId(id));
        dispatch(toggleOpen());
    };

    const deleteRol = (id: number) => {
        console.log(id);
    };

    return (
        <div className="flex-1 flex overflow-hidden">
            <DashboardTable
                columns={columns}
                loading={isFetching || isLoading}
                dataSource={data ?? []}
            />
        </div>
    );
}

export default RolesTable;
