import {MetadataRoute} from "next";
import icon from "@/app/favicon.ico";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "SekAiJK - Anime, Videojuegos y Cultura Geek",
        description:
            "Somos fanáticos del anime, videojuegos y amantes de la cultura geek. En el 2022 iniciamos nuestro viaje para ofrecer una explosión de contenido creativo y entretenido, lleno de referencias, humor y monas chinas. Entonces, ¿buscas un canal sobre anime y videojuegos? Pues acompáñanos, porque con nuestras voces encantadoras y nuestro carisma desbordante, te prometemos una experiencia llena de diversión y aventuras.",
        icons: [
            {
                src: icon.src,
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: icon.src,
                sizes: "512x512",
                type: "image/png",
            },
        ],
        short_name: "SekAiJK",
        start_url: "/",
        display: "standalone",
        background_color: "#0a0a0a",
        theme_color: "#D94862",
    };
}
