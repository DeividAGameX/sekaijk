"use client";
import DashboardTable from "@/components/dashboard/DashboarTable";
import {Button, Popconfirm, TableColumnProps, Typography} from "antd";
import {useTranslations} from "next-intl";
import {useGetAllCategoriesQuery} from "@/features/categories/lib/Categories.reducer";
import moment from "moment";
import {useDispatch} from "react-redux";
import {
    setId,
    toggleOpen,
} from "@/features/categories/lib/CategoryModal.reducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";

function CategoriesTable(
    {canEdit, canDelete}: {canEdit: boolean; canDelete: boolean} = {
        canEdit: false,
        canDelete: false,
    }
) {
    const tTable = useTranslations("components.table");
    const tForm = useTranslations("components.form");
    const tCategory = useTranslations("categories");
    const {data, isFetching, isLoading} = useGetAllCategoriesQuery({});
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
                            onClick={() => editCategory(id)}
                        />
                    )}
                    {canDelete && (
                        <Popconfirm
                            title={tCategory("delete")}
                            onConfirm={() => deleteCategory(id)}
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

    const editCategory = (id: number) => {
        dispatch(setId(id));
        dispatch(toggleOpen());
    };

    const deleteCategory = (id: number) => {
        console.log(id);
    };

    return (
        <div className="flex-1 flex py-4 overflow-hidden">
            <DashboardTable
                columns={columns}
                loading={isFetching || isLoading}
                dataSource={data ?? []}
            />
        </div>
    );
}

export default CategoriesTable;
