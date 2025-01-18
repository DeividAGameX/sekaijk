import {mergeAttributes, Node} from "@tiptap/core";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        twitterEmbed: {
            /**
             * Comments will be added to the autocomplete.
             */
            insertTwitterEmbed: (someProp: string) => ReturnType;
        };
    }
}

export const TwitterEmbed = Node.create({
    name: "twitterEmbed",

    group: "block", // Define que es un bloque (no inline)

    atom: true, // Los nodos atómicos no se pueden dividir o editar directamente

    // Definición de cómo se almacena en el documento
    addAttributes() {
        return {
            url: {
                default: null,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "a[data-twitter-url]",
                getAttrs: (dom) => {
                    const url = dom.getAttribute("data-twitter-url");
                    return url ? {url} : false;
                },
            },
        ];
    },

    renderHTML({HTMLAttributes}) {
        return [
            "a",
            mergeAttributes(HTMLAttributes, {
                "data-twitter-url": HTMLAttributes.url,
                class: "w-full flex justify-center tweet-embed",
            }),
        ];
    },

    // addNodeView() {
    //     return ({node}) => {
    //         const dom = document.createElement("div");
    //         dom.className = "w-full flex justify-center";
    //         dom.innerHTML = node.attrs.url;
    //         // const dom = document.createElement("blockquote");
    //         // dom.className = "twitter-tweet";
    //         // dom.innerHTML = `<a href="${node.attrs.url}"></a>`;
    //         const ww: any = window;

    //         // Llamar a Twitter para renderizar el widget
    //         if (ww.twttr) {
    //             ww.twttr.widgets.load(dom);
    //         }

    //         return {
    //             dom,
    //             contentDOM: null,
    //         };
    //     };
    // },
    addNodeView() {
        return ({node}) => {
            const dom = document.createElement("a");
            dom.id = "tweet-embed";
            dom.className = "w-full flex justify-center tweet-embed";
            dom.setAttribute("contenteditable", "false");
            dom.setAttribute("draggable", "true");

            // Extraer el ID del tweet de la URL
            const tweetUrl = node.attrs.url;
            const tweetIdMatch = tweetUrl.match(/status\/(\d+)/); // Buscar el ID en la URL
            const tweetId = tweetIdMatch ? tweetIdMatch[1] : null;

            if (!tweetId) {
                dom.textContent = "Error: ID del tweet no válido";
                return {dom};
            }

            const iframe = document.createElement("iframe");
            iframe.src = `https://platform.twitter.com/embed/Tweet.html?id=${tweetId}`;
            iframe.style.width = "550px";
            iframe.style.height = "673px";
            iframe.setAttribute("scrolling", "no");
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allowtransparency", "true");
            iframe.setAttribute("allowfullscreen", "true");

            dom.appendChild(iframe);

            return {
                dom,
                contentDOM: null,
            };
        };
    },
    // addPasteRules() {
    //     return [
    //         nodePasteRule({
    //             find: /https:\/\/twitter\.com\/[a-zA-Z0-9_]+\/status\/\d+/g,
    //             type: this.type,
    //         }),
    //     ];
    // },

    addCommands() {
        return {
            insertTwitterEmbed:
                (url: string) =>
                ({commands}) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: {url},
                    });
                },
        };
    },
});
