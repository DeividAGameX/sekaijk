"use client";

import {Divider} from "antd";
import Image from "next/image";
import {motion} from "framer-motion";

function InfoAU() {
    return (
        <div className="max-w-6xl w-full mx-auto py-20 overflow-hidden">
            <div className="text-center">
                <h1 className="text-7xl font-bold">SekAiJK</h1>
                <p className="text-center p-4 md:px-40">
                    Bienvenido a nuestro increíble rincón digital!
                </p>
            </div>
            <article className="h-full flex flex-wrap md:flex-nowrap items-center">
                <div className="bg-body p-6 -rotate-3">
                    <Divider>
                        <h1 className="text-3xl">Bienvenidos</h1>
                    </Divider>
                    <p className="text-center">
                        Sumérgete en un universo donde el anime y los
                        videojuegos se fusionan para brindarte la dosis perfecta
                        de entretenimiento. 🎮🎬
                        <br />
                        ¡Prepárate para vivir emocionantes aventuras, descubrir
                        los secretos mejor guardados del anime y explorar el
                        vasto mundo de los videojuegos con nosotros! Siéntete
                        como en casa y disfruta al máximo de nuestro contenido.
                        ¡Suscríbete, activa la campana y únete a esta comunidad
                        llena de diversión y camaradería!
                    </p>
                </div>
                <motion.div
                    initial={{translateX: "100%", opacity: 0}}
                    whileInView={{translateX: 0, opacity: 1}}
                    viewport={{once: true}}
                    transition={{duration: 0.75, ease: "easeOut"}}
                    className="flex-1 w-full md:w-[420px] relative"
                >
                    <Image
                        src="/assets/Perfil.jpg"
                        alt="Perfil de SekAiJK"
                        className="rounded-lg z-[1] left-0 w-full max-w-[420px] md:w-[420px] h-[420px] rotate-6"
                        width={1080}
                        height={1080}
                    />
                </motion.div>
            </article>
            <div className="w-full flex justify-center items-center">
                <p className="bg-body p-6 rounded-lg my-10">
                    ✨¡Te esperamos con los brazos abiertos!🎉
                </p>
            </div>
        </div>
    );
}

export default InfoAU;
