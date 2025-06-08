"use client";
import {Checkbox, Form, Input, Modal} from "antd";
import {useEffect} from "react";
import {TeamRoleForm as TeamRoleFormType} from "@/features/teamRole/types/teamRole";
import {useTranslations} from "next-intl";
import {useDispatch, useSelector} from "react-redux";
import {
    useCreateTeamRoleMutation,
    useGetTeamRoleQuery,
    useUpdateTeamRoleMutation,
} from "../lib/TeamRole.reducer";
import {RootState} from "@/lib/store";
import {setId, toggleOpen} from "../lib/TeamRoleModal.reducer";

function TeamRoleForm() {
    const {id, open} = useSelector((state: RootState) => state.teamRoleModal);
    const [createTag, {isLoading}] = useCreateTeamRoleMutation();
    const [updateTag, {isLoading: updating}] = useUpdateTeamRoleMutation();
    const {data: teamRole, isLoading: loadingTag} = useGetTeamRoleQuery(
        id ?? "",
        {
            skip: !id,
        }
    );
    const tTeamRoleForm = useTranslations("teamRoles.form");
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
                console.log(data);
                if (id) {
                    updateTag({id, ...data}).then(finish);
                } else {
                    createTag({...data}).then(finish);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (id) {
            if (!loadingTag && teamRole) {
                form.setFields(
                    Object.entries(teamRole as TeamRoleFormType).map((t) => ({
                        name: t[0],
                        value: t[1],
                    }))
                );
            }
        }
    }, [id, teamRole, loadingTag, form]);

    return (
        <Modal
            open={open}
            onCancel={closeForm}
            title={tTeamRoleForm("title")}
            okText={id ? tForm("save") : tForm("create")}
            cancelText={tForm("cancel")}
            onOk={onSubmit}
            okButtonProps={{
                loading: isLoading || updating,
            }}
            loading={loadingTag}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name={"name"}
                    label={tTeamRoleForm("name")}
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
                    name="isSection"
                    label={null}
                    valuePropName="checked"
                >
                    <Checkbox>{tTeamRoleForm("isSection")}</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default TeamRoleForm;
