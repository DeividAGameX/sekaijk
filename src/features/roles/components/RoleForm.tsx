"use client";
import {RootState} from "@/lib/store";
import {Form, Input, Modal, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useTranslations} from "next-intl";
import {useEffect} from "react";
import {Permissions} from "@/features/roles/types/roles";
import {
    useCreateRolMutation,
    useGetRolQuery,
    useUpdateRolMutation,
} from "../lib/Roles.reducer";
import {setId, toggleOpen} from "../lib/RolModal.reducer";
import Permisos from "@/utils/permissions.json";

function RolForm() {
    const {id, open} = useSelector((state: RootState) => state.roleModal);
    const [createRol, {isLoading}] = useCreateRolMutation();
    const [updateRol, {isLoading: updating}] = useUpdateRolMutation();
    const {data: rol, isLoading: loadingRol} = useGetRolQuery(id ?? "", {
        skip: !id,
    });
    const tRol = useTranslations("roles.form");
    const tPermission = useTranslations("roles.permissions");
    const tForm = useTranslations("components.form");
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const closeForm = () => {
        form.resetFields();
        dispatch(toggleOpen());
        dispatch(setId(null));
    };

    const finish = () => {
        form.resetFields();
        dispatch(toggleOpen());
        dispatch(setId(null));
    };

    const onSubmit = async () => {
        form.validateFields()
            .then((data) => {
                const per = data.permissions.map((p: string) => ({
                    permission: p,
                }));
                if (id) {
                    updateRol({
                        id,
                        name: data.name,
                        description: data.description,
                        Permissions: per,
                    }).then(finish);
                } else {
                    createRol({
                        name: data.name,
                        description: data.description,
                        Permissions: per,
                    }).then(finish);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (id) {
            if (!loadingRol && rol) {
                form.setFieldValue("name", rol.name);
                form.setFieldValue("description", rol.description);
                form.setFieldValue(
                    "permissions",
                    rol.Permissions.map((p: Permissions) => p.permission)
                );
            }
        }
    }, [id, rol, loadingRol, form]);

    return (
        <Modal
            open={open}
            onCancel={closeForm}
            title={tRol("title")}
            okText={id ? tForm("save") : tForm("create")}
            cancelText={tForm("cancel")}
            onOk={onSubmit}
            okButtonProps={{
                loading: isLoading || updating,
            }}
            loading={loadingRol}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name={"name"}
                    label={tRol("name")}
                    rules={[
                        {
                            max: 150,
                            message: tForm("error.max150"),
                        },
                        {
                            required: true,
                            message: tForm("error.require"),
                        },
                    ]}
                >
                    <Input maxLength={150} />
                </Form.Item>
                <Form.Item
                    name={"permissions"}
                    label={tRol("permissions")}
                    rules={[
                        {
                            required: true,
                            message: tForm("error.require"),
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        options={Permisos.map((i) => ({
                            label: tPermission(i),
                            value: i,
                        }))}
                        allowClear
                    />
                </Form.Item>
                <Form.Item
                    name={"description"}
                    label={tRol("description")}
                    rules={[
                        {
                            max: 500,
                            message: tForm("error.max500"),
                        },
                        {
                            required: true,
                            message: tForm("error.require"),
                        },
                    ]}
                >
                    <Input.TextArea maxLength={500} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default RolForm;
