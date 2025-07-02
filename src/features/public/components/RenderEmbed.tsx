"use client";
import {useEffect} from "react";

function RenderEmbed() {
    // Dependencias vacías, solo se ejecuta una vez

    useEffect(() => {
        const info = document.getElementsByClassName("tweet-embed");
        for (let index = 0; index < info.length; index++) {
            const element = info[index];
            console.log(element);
            const tweetUrl = element.getAttribute("url") ?? "";

            // Extraer el ID del tweet de la URL
            const tweetIdMatch = tweetUrl.match(/status\/(\d+)/); // Buscar el ID en la URL
            const tweetId = tweetIdMatch ? tweetIdMatch[1] : null;

            if (!tweetId) {
                element.textContent = "Error: ID del tweet no válido";
            }

            const iframe = document.createElement("iframe");
            iframe.src = `https://platform.twitter.com/embed/Tweet.html?id=${tweetId}`;
            iframe.style.width = "550px";
            iframe.style.height = "673px";
            iframe.setAttribute("scrolling", "no");
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allowtransparency", "true");
            iframe.setAttribute("allowfullscreen", "true");

            element.appendChild(iframe);
        }
    }, []);

    return <br />;
}

export default RenderEmbed;
