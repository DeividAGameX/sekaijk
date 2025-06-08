"use client";
import DashboardTable from "@/components/dashboard/DashboarTable";
import {Button, Popconfirm, TableColumnProps, Typography} from "antd";
import {useTranslations} from "next-intl";
import {useGetAllTagsQuery} from "@/features/tags/lib/Tags.reducer";
import moment from "moment";
import {useDispatch} from "react-redux";
import {setId, toggleOpen} from "@/features/tags/lib/TagModal.reducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";

function TagsTable({
    canEdit,
    canDelete,
}: {
    canEdit: boolean;
    canDelete: boolean;
}) {
    const tTable = useTranslations("components.table");
    const tForm = useTranslations("components.form");
    const tTag = useTranslations("tags");
    const {data, isFetching, isLoading} = useGetAllTagsQuery({});
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
            key: "color",
            dataIndex: "color",
            title: tTable("color"),
            render: (color) => (
                <div className="flex items-center gap-2">
                    <div
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{backgroundColor: color}}
                    />
                    <span>{color}</span>
                </div>
            ),
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

    if (canEdit || canDelete)
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

export default TagsTable;
