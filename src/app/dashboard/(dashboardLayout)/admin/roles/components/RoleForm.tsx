import React, {useMemo} from "react";
import {Form, Input, Select} from "antd";
import {useTranslations} from "next-intl";
import {
    useCreateRolesMutation,
    useGetRolesByIdQuery,
    useUpdateRolesMutation,
} from "@/lib/storage/Api/admin/roles";
import {AllowedCheck, AllowedCheckData} from "@/lib/allowed/allowed";
import ModalForm from "@/components/admin/ModelForm";
interface RoleFormType {
    open: boolean;
    id?: number;
    onClose: () => void;
}

function RolesForm({open, id, onClose}: RoleFormType) {
    const t = useTranslations("roles");
    const {data, isLoading: roleFetching} = useGetRolesByIdQuery(id, {
        skip: !id,
    });
    const [createRole] = useCreateRolesMutation();
    const [updateRole] = useUpdateRolesMutation();

    const defaultRole = useMemo(() => {
        if (id) {
            if (data) {
                return {
                    ...data,
                    Permissions: data?.Permissions.map(
                        (p: any) => p.permissions
                    ),
                };
            } else {
                return {
                    name: "",
                    Permissions: [],
                };
            }
        } else {
            return {
                name: "",
                Permissions: [],
            };
        }
    }, [data, id]);

    const handleSubmit = async (values: any) => {
        const dataRole = values;
        dataRole.Permissions = values.Permissions.map((p: any) => ({
            name: AllowedCheckData[p as keyof typeof AllowedCheckData],
            permissions: p,
        }));
        if (id) {
            dataRole.id = id;
        }
        return id ? updateRole(dataRole) : createRole(dataRole);
    };

    return (
        <ModalForm
            open={open}
            title={t("header")}
            onFinish={handleSubmit}
            onCancel={onClose}
            values={defaultRole}
            isLoading={roleFetching}
        >
            <Form.Item
                name={"name"}
                label={t("form.name")}
                rules={[
                    {required: true, message: t("form.nameRequired")},
                    {max: 150, message: t("form.nameMaxLength")},
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={"Permissions"}
                label={t("form.permissions")}
                rules={[
                    {
                        required: true,
                        message: t("form.permissionsRequired"),
                        type: "array",
                    },
                ]}
            >
                <Select
                    allowClear
                    mode="multiple"
                    options={AllowedCheck.map((a) =>
                        a.options
                            ? {
                                  ...a,
                                  label: t(a.label),
                                  options: (a.options || []).map((o) => ({
                                      ...o,
                                      label: t(o.label),
                                  })),
                              }
                            : {...a, label: t(a.label)}
                    )}
                />
            </Form.Item>
        </ModalForm>
    );
}

export default RolesForm;
