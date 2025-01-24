"use client";
import {Divider} from "antd";
import Image from "next/image";
import {motion} from "framer-motion";

function WhatUs() {
    return (
        <div className="w-full bg-body py-40">
            <div className="max-w-7xl w-full mx-auto overflow-hidden">
                <h1 className="text-6xl font-bold w-full text-center">
                    ¿Qué es SekAiJK?
                </h1>
                <div className="h-full flex flex-wrap md:flex-nowrap items-center justify-center">
                    <motion.div
                        initial={{translateX: "-100%", opacity: 0}}
                        whileInView={{translateX: 0, opacity: 1}}
                        viewport={{once: true}}
                        transition={{duration: 0.75, ease: "easeOut"}}
                        className="sm:w-full max-w-full flex justify-center"
                    >
                        <Image
                            className="w-[400px] h-[400px] rotate-6"
                            src="/renders/questions.png"
                            alt="Que es SekAiJK"
                            width={1000}
                            height={1000}
                        />
                    </motion.div>
                    <motion.div
                        initial={{translateX: "100%", opacity: 0}}
                        whileInView={{translateX: 0, opacity: 1}}
                        viewport={{once: true}}
                        transition={{duration: 0.75, ease: "easeOut"}}
                        className="w-full p-4"
                    >
                        <p>
                            Bueno, <b className="text-primary">SekAiJK</b> es un
                            proyecto nacido por la idea de crear un canal de
                            anime, videojuegos y todo lo relacionado con el
                            mundo Geek o Friki. Un lugar donde te puedas sentir
                            cómodo viendo nuestras payasadas y leyendo nuestros
                            post.
                        </p>
                        <Divider>
                            <h3 className="text-2xl">Que Significa SekAiJK</h3>
                        </Divider>
                        <p className="md:text-end">
                            El nombre de <b className="text-primary">SekAiJK</b>{" "}
                            proviene de una historia antigua japonesa que cuenta
                            sobre un mundo antiguo llamado{" "}
                            <b>セクア・アイジェイク (Sekua aijeiku)</b>, este
                            mundo pretende ser un mundo donde las personas
                            pueden tener momentos pacifico y dedicarse a sus
                            jobis sin necesidad de ser molestado por el tiempo o
                            algún otro problema banal. Bonita esa historia
                            verdad?, ojala fuera verdad, pero{" "}
                            <b className="text-primary">SekAiJK</b> nace de
                            pensar en un mundo donde puedas hablar de anime y
                            videojuegos, por ello se eligió <b>世界 (Sekai)</b>{" "}
                            y ahora la <b>JK</b> son iniciales, aunque parece
                            que hacer referencia al <b>JK</b> de algunos
                            términos que adoptaron en japón, pero no solo son
                            las iniciales de los primero integrantes del canal,
                            esto incluye la A mayúscula en <b>sekai</b>
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default WhatUs;
