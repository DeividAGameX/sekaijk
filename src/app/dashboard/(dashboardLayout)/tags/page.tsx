"use client";
import HeaderPage from "@/components/admin/HeaderPage";
import ModalForm from "@/components/admin/ModelForm";
import {
    useCreateTagMutation,
    useDeleteTagMutation,
    useGetTagsQuery,
    useGetTagByIdQuery,
    useUpdateTagMutation,
} from "@/lib/storage/Api/tags";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Form, Input, Popconfirm, Table, ColorPicker} from "antd"; // Importar ColorPicker
import {useTranslations} from "next-intl";
import {useState} from "react";

interface TagsFormType {
    id?: number;
    isOpen: boolean;
    onClose: () => void;
}

function TagsForm({id, isOpen, onClose}: TagsFormType) {
    const t = useTranslations("tags");
    const {data: tag, isFetching} = useGetTagByIdQuery(id, {
        skip: !id,
    });
    const [createTag] = useCreateTagMutation();
    const [updateTag] = useUpdateTagMutation();

    const onSubmit = (e: any) => {
        const colorHex = e.color.toHexString();
        return id
            ? updateTag({id, ...e, color: colorHex}).then(console.log)
            : createTag({...e, color: colorHex}).then(console.log);
    };

    return (
        <ModalForm
            open={isOpen}
            title={t("header")}
            values={id ? tag : null}
            onFinish={onSubmit}
            onCancel={onClose}
            isLoading={isFetching}
        >
            <Form.Item
                name={"name"}
                label={t("form.nameLabel")}
                rules={[
                    {required: true, message: t("form.nameRequired")},
                    {max: 150, message: t("form.nameMaxLength")},
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={"description"}
                label={t("form.descriptionLabel")}
                rules={[
                    {required: true, message: t("form.descriptionRequired")},
                    {max: 500, message: t("form.descriptionMaxLength")},
                ]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                name={"color"}
                label={t("form.colorLabel")}
                rules={[{required: true, message: t("form.colorRequired")}]}
            >
                <ColorPicker format="hex" showText />
            </Form.Item>
        </ModalForm>
    );
}

function Tags() {
    const t = useTranslations("tags");
    const [deleteTag, {isLoading: deleting}] = useDeleteTagMutation();
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
            key: "color",
            dataIndex: "color",
            title: t("columns.color"),
            render: (color: string) => (
                <div style={{width: 20, height: 20, backgroundColor: color}} />
            ),
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
                        onConfirm={() => deleteTag(idInfo)}
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
    const {data, isLoading} = useGetTagsQuery(null);

    return (
        <div className="flex flex-col w-full h-full gap-5">
            <HeaderPage
                formItems={{
                    add: true,
                    search: true,
                    filter: false,
                }}
                onFinish={console.log}
                newElement={() => setOpenModal(true)}
            >
                Total elementos: {data?.length || 0}
            </HeaderPage>
            <div className="bg-body rounded-xl flex-1 p-2 tabla-jk tabla-jk-transparent h-full w-full flex flex-col">
                <Table
                    bordered={false}
                    columns={columns}
                    loading={isLoading || deleting}
                    dataSource={data}
                />
            </div>
            <TagsForm
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

export default Tags;