"use client";

import {faAdd} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Input, Typography} from "antd";
import {useTranslations} from "next-intl";
import {useDispatch} from "react-redux";
import {toggleOpen} from "../lib/TagModal.reducer";

function TagsHeader({canAdd}: {canAdd: boolean} = {canAdd: false}) {
    const tTag = useTranslations("tags");
    const dispatch = useDispatch();

    const newTag = () => {
        dispatch(toggleOpen());
    };

    return (
        <div className="py-2 px-3 flex flex-col md:flex-row item-center border-b-neutral-700 border-b-[1px]">
            <div className="flex gap-3 justify-between items-center w-full md:justify-start">
                {canAdd && (
                    <>
                        <Typography>{tTag("add")}</Typography>
                        <Button
                            type="text"
                            onClick={newTag}
                            icon={<FontAwesomeIcon icon={faAdd} />}
                        />
                    </>
                )}
            </div>
            <Input.Search
                className="w-full md:max-w-72"
                placeholder={tTag("search")}
            />
        </div>
    );
}

export default TagsHeader;
