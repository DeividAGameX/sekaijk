import {Button, Tooltip} from "antd";
import {Dropdown} from "antd";
import {RootState} from "@/lib/store";
import {AnimatePresence, motion} from "framer-motion";
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfo, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {signOut} from "next-auth/react";
import useUserSession from "@/hooks/useUserSession";

function UserSider() {
    const {open, isBreak} = useSelector((state: RootState) => state.sideBar);
    const {user} = useUserSession();

    return (
        <motion.div className="flex flex-col pt-5 gap-2 justify-center items-center">
            <motion.img
                src={user?.avatar || "/favicon.png"}
                alt="icon"
                className="w-[140px] rounded-full"
                animate={
                    (isBreak ? false : open)
                        ? {
                              scale: 0.9,
                          }
                        : {
                              scale: 1,
                          }
                }
            />
            <motion.div
                className="overflow-hidden"
                animate={
                    (isBreak ? false : open)
                        ? {
                              x: 10,
                              opacity: 0,
                              height: 0,
                          }
                        : {
                              x: 0,
                              opacity: 1,
                              height: "auto",
                          }
                }
            >
                <p className="font-bold text-lg">{user?.name ?? ""}</p>
            </motion.div>
            <AnimatePresence>
                {(isBreak ? false : open) ? (
                    <Dropdown menu={{items: []}}>
                        <Button type="text">
                            <FontAwesomeIcon icon={faInfo} />
                        </Button>
                    </Dropdown>
                ) : (
                    <div className="mx-auto max-w-20 w-full">
                        <Tooltip
                            placement={false ? "right" : "top"}
                            title={"Usuario"}
                            arrow={{pointAtCenter: true}}
                        >
                            <Link href={`/dashboard/profile`} prefetch>
                                <Button
                                    type="text"
                                    size="large"
                                    icon={<FontAwesomeIcon icon={faInfo} />}
                                />
                            </Link>
                        </Tooltip>
                        <Tooltip
                            placement={false ? "right" : "top"}
                            title={"Salir"}
                            arrow={{pointAtCenter: true}}
                        >
                            <Button
                                type="text"
                                size="large"
                                icon={
                                    <FontAwesomeIcon
                                        icon={faRightFromBracket}
                                    />
                                }
                                onClick={() => signOut()}
                            />
                        </Tooltip>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default UserSider;
