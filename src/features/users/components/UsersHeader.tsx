"use client";
import {useTranslations} from "next-intl";
import {useDispatch} from "react-redux";
import {toggleOpen} from "../lib/userModal.reducer";
import {Button, Input, Typography} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd} from "@fortawesome/free-solid-svg-icons";

function UsersHeaders({canAdd}: {canAdd: boolean} = {canAdd: false}) {
    const tUsers = useTranslations("users");
    const dispatch = useDispatch();

    const newTeamRole = () => {
        dispatch(toggleOpen());
    };

    return (
        <div className="py-2 px-3 flex flex-col md:flex-row item-center border-b-neutral-700 border-b-[1px]">
            <div className="flex gap-3 justify-between items-center w-full md:justify-start">
                {canAdd && (
                    <>
                        <Typography>{tUsers("add")}</Typography>
                        <Button
                            type="text"
                            onClick={newTeamRole}
                            icon={<FontAwesomeIcon icon={faAdd} />}
                        />
                    </>
                )}
            </div>
            <Input.Search
                className="w-full md:max-w-72"
                placeholder={tUsers("search")}
            />
        </div>
    );
}

export default UsersHeaders;
