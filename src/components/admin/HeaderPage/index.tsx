"use client";
import {faAdd, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    Button,
    Cascader,
    CascaderProps,
    Form,
    Input,
    MenuProps,
    Select,
    Tooltip,
} from "antd";
import {useTranslations} from "next-intl";

export type HeaderPageProps = {
    children?: React.ReactNode;
    filters?: CascaderProps["options"];
    sort?: MenuProps["items"];
    formItems: {
        search?: boolean;
        filter?: boolean;
        add?: boolean;
        sort?: any[];
    };
    sortDefault?: any;
    onFinish: (form: any) => void;
    newElement?: () => void;
};

function HeaderPage({
    filters,
    newElement,
    formItems,
    onFinish,
    sortDefault,
}: HeaderPageProps) {
    const t = useTranslations("headerPages");

    return (
        <div className="w-full bg-body flex flex-col gap-3 p-5 rounded-xl md:flex-row">
            <Form
                name="formulario"
                onFinish={onFinish}
                className="flex flex-wrap md:flex-nowrap gap-3 w-full items-center justify-end"
            >
                {formItems.search && (
                    <div className="md:max-w-xlp7 md:mr-12 w-full">
                        <Form.Item name="search" style={{margin: 0}}>
                            <Input
                                size="large"
                                style={{width: "100%"}}
                                placeholder={t("searchPlaceholder")}
                            />
                        </Form.Item>
                    </div>
                )}
                {formItems.filter && (
                    <div className="md:max-w-36 w-full">
                        <Form.Item name="filters" style={{margin: 0}}>
                            <Cascader
                                style={{width: "100%"}}
                                size="large"
                                placeholder={t("filtres")}
                                options={filters}
                                multiple
                                maxTagCount="responsive"
                                showCheckedStrategy={"SHOW_CHILD"}
                            />
                        </Form.Item>
                    </div>
                )}
                {formItems.sort && (
                    <div className="md:max-w-36 w-full">
                        <Form.Item name="sort" style={{margin: 0}}>
                            <Select
                                placeholder={t("sort")}
                                size="large"
                                style={{width: "100%"}}
                                defaultValue={sortDefault}
                                options={formItems.sort}
                            />
                        </Form.Item>
                    </div>
                )}
                {(formItems.search || formItems.filter || formItems.sort) && (
                    <Button
                        className="w-full md:w-auto"
                        htmlType="submit"
                        type="primary"
                        size="large"
                        icon={<FontAwesomeIcon icon={faSearch} />}
                    >
                        {t("search")}
                    </Button>
                )}
            </Form>
            {newElement && (
                <Tooltip title={t("posts.add")}>
                    <Button type="primary" size="large" onClick={newElement}>
                        <FontAwesomeIcon icon={faAdd} />
                    </Button>
                </Tooltip>
            )}
        </div>
    );
}

export default HeaderPage;
