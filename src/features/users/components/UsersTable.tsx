"use client";
import {useTranslations} from "next-intl";
import {useDeleteUserMutation, useGetAllUsersQuery} from "../lib/user.reducer";
import {useDispatch} from "react-redux";
import {Avatar, Button, Popconfirm, Table, TableColumnProps, Tag} from "antd";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {setId, toggleOpen} from "../lib/userModal.reducer";
import DashboardTable from "@/components/dashboard/DashboarTable";
import {TeamRole} from "@/features/teamRole/types/teamRole";

function UsersTable(
    {canEdit, canDelete}: {canEdit: boolean; canDelete: boolean} = {
        canDelete: false,
        canEdit: false,
    }
) {
    const tTable = useTranslations("components.table");
    const tForm = useTranslations("components.form");
    const tFormU = useTranslations("users.form");
    const tTag = useTranslations("tags");
    const {data, isFetching, isLoading} = useGetAllUsersQuery({});
    const [deleteUser] = useDeleteUserMutation();
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
            render: (name, data) => {
                return (
                    <>
                        <Avatar src={data.avatar} size={"large"} />
                        <span className="ml-2">{name}</span>
                    </>
                );
            },
        },
        {
            key: "email",
            dataIndex: "email",
            title: tFormU("email"),
        },
        {
            key: "email",
            dataIndex: "Roles",
            title: tFormU("role"),
            render: (role) => {
                return role.name;
            },
        },
        Table.SELECTION_COLUMN,
        {
            key: "email",
            dataIndex: "TeamRoles",
            title: tFormU("team"),
            render: (team: TeamRole[]) => {
                if (team) {
                    if (team.length > 0) {
                        if (team.length > 3) {
                            return (
                                <>
                                    {team.slice(0, 3).map((e: TeamRole) => (
                                        <Tag key={e.id}>{e.name}</Tag>
                                    ))}
                                    <Tag>+ {team.length - 3}</Tag>
                                </>
                            );
                        }
                        return (team ?? []).map((e: TeamRole) => (
                            <Tag key={e.id}>{e.name}</Tag>
                        ));
                    }
                }
                return "Sin equipo asignado";
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
                            onClick={() => editUser(id)}
                        />
                    )}
                    {canDelete && (
                        <Popconfirm
                            title={tTag("delete")}
                            onConfirm={() => deleteUser(id)}
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

    const editUser = (id: number) => {
        dispatch(setId(id));
        dispatch(toggleOpen());
    };

    return (
        <div className="flex-1 flex overflow-hidden">
            <DashboardTable
                columns={columns}
                loading={isFetching || isLoading}
                dataSource={data ?? []}
                expandable={{
                    expandedRowRender: ({TeamRoles: team}) => {
                        return (
                            <>
                                <h4 className="font-bold text-lg mb-2">
                                    Roles de equipo:
                                </h4>
                                {(team ?? []).map((e: TeamRole) => (
                                    <Tag key={e.id}>{e.name}</Tag>
                                ))}
                            </>
                        );
                    },
                    rowExpandable: (record) => record.TeamRoles?.length > 3,
                }}
            />
        </div>
    );
}

export default UsersTable;
