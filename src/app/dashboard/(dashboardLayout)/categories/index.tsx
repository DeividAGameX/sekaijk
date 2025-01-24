"use client";
import HeaderPage from "@/components/admin/HeaderPage";
import {
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
} from "@/lib/storage/Api/categories";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Popconfirm, Table} from "antd";
import {useTranslations} from "next-intl";
import {useState} from "react";
import CategoriesForm from "./components/CategoriesForm";

function Categories() {
    const t = useTranslations("categories");
    const [deleteCategory, {isLoading: deleting}] = useDeleteCategoryMutation();
    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState(0);
    const columns = [
        {
            key: "id",
            dataIndex: "id",
            title: t("columns.id"),
        },
        {
            key: "name",
            dataIndex: "name",
            title: t("columns.name"),
        },
        {
            key: "description",
            dataIndex: "description",
            title: t("columns.description"),
        },
        {
            key: "action",
            title: t("columns.action.title"),
            dataIndex: "id",
            render: (idInfo: any) => (
                <div className="flex gap-2">
                    <Button
                        type="primary"
                        icon={<FontAwesomeIcon icon={faEdit} />}
                        onClick={() => {
                            setId(idInfo);
                            setOpenModal(true);
                        }}
                    />
                    <Popconfirm
                        title={t("columns.action.deleteTitle")}
                        onConfirm={() => deleteCategory(idInfo)}
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
    const {data, isLoading} = useGetCategoriesQuery(null);

    return (
        <div className="flex flex-col w-ful h-full gap-5">
            <HeaderPage
                formItems={{
                    add: true,
                    search: true,
                    filter: false,
                }}
                onFinish={console.log}
                newElement={() => setOpenModal(true)}
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
            <CategoriesForm
                id={id}
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setId(0);
                }}
            />
        </div>
    );
}

export default Categories;
