"use client";
import {useTranslations} from "next-intl";
import {useGetAllTeamRolesQuery} from "../lib/TeamRole.reducer";
import {useDispatch} from "react-redux";
import {Button, Popconfirm, TableColumnProps} from "antd";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {setId, toggleOpen} from "../lib/TeamRoleModal.reducer";
import DashboardTable from "@/components/dashboard/DashboarTable";

function TeamRolesTable(
    {canEdit, canDelete}: {canEdit: boolean; canDelete: boolean} = {
        canDelete: false,
        canEdit: false,
    }
) {
    const tTable = useTranslations("components.table");
    const tForm = useTranslations("components.form");
    const tFormT = useTranslations("teamRoles.form");
    const tTag = useTranslations("tags");
    const {data, isFetching, isLoading} = useGetAllTeamRolesQuery({});
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
            key: "isSection",
            dataIndex: "isSection",
            title: tFormT("isSection"),
            render: (isSection) => {
                return isSection ? tFormT("yes") : tFormT("no");
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
                            onClick={() => editTag(id)}
                        />
                    )}
                    {canDelete && (
                        <Popconfirm
                            title={tTag("delete")}
                            onConfirm={() => deleteTag(id)}
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

    const editTag = (id: number) => {
        dispatch(setId(id));
        dispatch(toggleOpen());
    };

    const deleteTag = (id: number) => {
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

export default TeamRolesTable;
