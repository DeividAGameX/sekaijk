"use client";

import {Divider} from "antd";
import Link from "next/link";
import {motion} from "framer-motion";
import ParallaxText from "@/components/ParallelText";

function Team({team}: {team: {id: number; name: string}[]}) {
    return (
        <div
            className="w-full h-[640px] bg-cover bg-bottom relative"
            style={{backgroundImage: `url("/assets/teambg.jpg")`}}
        >
            <div className="w-full h-full absolute top-0 left-0 flex flex-col justify-center opacity-40">
                <ParallaxText
                    baseVelocity={2}
                    className="text-9xl uppercase font-bold"
                >
                    {`${team.map((t) => t.name).join(" • ")} •`}
                </ParallaxText>
                <ParallaxText
                    baseVelocity={-2}
                    className="text-9xl uppercase font-bold"
                >
                    {`${team.map((t) => t.name).join(" • ")} •`}
                </ParallaxText>
            </div>
            <div className="w-full py-40 h-full backdrop-blur-sm">
                <div className="max-w-5xl w-full mx-auto text-center overflow-hidden">
                    <motion.h1
                        initial={{translateY: "-100%", opacity: 0}}
                        whileInView={{translateY: 0, opacity: 1}}
                        viewport={{once: true}}
                        transition={{duration: 0.75, ease: "easeOut"}}
                        className="text-6xl font-bold"
                    >
                        Conoce a nuestra equipo
                    </motion.h1>
                    <Divider>
                        <i className="icon-logo text-4xl cursor-pointer p-2 rounded-full transition duration-200 hover:bg-[--primary] hover:text-body"></i>
                    </Divider>
                    <p>
                        Puedes verlos{" "}
                        <Link href={"/team"} className="text-primary">
                            aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Team;
