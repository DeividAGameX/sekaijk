"use client";
import {faAdd, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Form, Input, Select, Typography} from "antd";
import {useTranslations} from "next-intl";
import {useDispatch} from "react-redux";
import {setQuery, toggleOpen} from "../../lib/PostsStore.reducer";

interface FormProps {
    sort: string;
    search: string;
}

interface PostsHeaderProps {
    canAdd: boolean;
    viewAll: boolean;
}

function PostsHeader({canAdd}: PostsHeaderProps) {
    const tPost = useTranslations("posts");
    const dispatch = useDispatch();
    const onSubmit = (values: FormProps) => {
        dispatch(
            setQuery(
                `${values.search ? `search=${values.search}` : ""}${
                    values.sort ? `&sort=${values.sort}` : ""
                }`
            )
        );
    };
    const openCreate = () => {
        dispatch(toggleOpen());
    };
    return (
        <div className="py-2 px-3 flex flex-col md:flex-row item-center border-b-neutral-700 border-b-[1px]">
            <div className="flex gap-3 justify-between items-center w-full md:justify-start">
                {canAdd && (
                    <>
                        <Typography>{tPost("add")}</Typography>
                        <Button
                            type="text"
                            onClick={openCreate}
                            icon={<FontAwesomeIcon icon={faAdd} />}
                        />
                    </>
                )}
            </div>
            <Form
                className="flex flex-col items-center gap-2 md:flex-row"
                onFinish={onSubmit}
            >
                <Form.Item
                    name="sort"
                    style={{margin: 0}}
                    className="w-full md:min-w-60"
                >
                    <Select
                        placeholder="Seleccione algo"
                        options={[
                            {
                                value: "createdAt:desc",
                                label: "Publicaciones mas recientes",
                            },
                            {
                                value: "createdAt:asc",
                                label: "Publicaciones menos recientes",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    name="search"
                    style={{margin: 0}}
                    className="w-full md:max-w-72 md:min-w-56"
                >
                    <Input
                        placeholder={tPost("search")}
                        className="w-full md:max-w-72"
                    />
                </Form.Item>
                <Button
                    className="flex-shrink-0"
                    type="primary"
                    htmlType="submit"
                    icon={<FontAwesomeIcon icon={faSearch} />}
                />
            </Form>
        </div>
    );
}

export default PostsHeader;
