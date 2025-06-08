"use client";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Image, Tag} from "antd";
import Link from "next/link";
import useGetProfile from "../hooks/useGetProfile";
import {TeamRole} from "@/features/teamRole/types/teamRole";
import {Profile} from "@/features/profile/types/profile";

function UserInfo(userInit: Profile) {
    const {data: user} = useGetProfile(userInit);
    return (
        <div className="w-full">
            <div
                className="w-full mx-auto rounded-xl overflow-hidden bg-cover bg-center"
                style={{
                    backgroundImage: `url(${user.banner})`,
                }}
            >
                <div className="w-full bg-neutral-950/75 px-3 py-2 flex flex-col justify-between md:flex-row">
                    <div className="flex gap-5 justify-between items-center">
                        <Image
                            wrapperClassName="w-30 h-30 rounded-full object-cover overflow-hidden"
                            className="w-full h-full rounded-full object-cover"
                            src={user.avatar}
                            alt={user.name}
                        />
                        <div>
                            <h1 className="text-3xl font-bold">{user.name}</h1>
                            <h2 className="text-lg text-neutral-400">
                                {user.Roles.name}
                            </h2>
                            <div>
                                {user.TeamRoles.filter(
                                    (r: TeamRole) => !r.isSection
                                ).map((r: TeamRole) => (
                                    <Tag key={r.id}>{r.name}</Tag>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 w-full md:mt-0 md:w-auto">
                        <Link
                            href={`/teams/${user.slug}`}
                            className="text-lg w-full"
                        >
                            <Button
                                type="primary"
                                icon={
                                    <FontAwesomeIcon
                                        icon={faArrowUpRightFromSquare}
                                    />
                                }
                                block
                            >
                                Ver perfil
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
