import TurndownService from "turndown";

const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
});

// Regla: iframe de YouTube → @[youtube](...)
turndownService.addRule("youtubeEmbed", {
    filter: "iframe",
    replacement: (content, node) => {
        const element = node as HTMLElement;
        const src = element.getAttribute("src") || "";
        console.log(src);
        const match = src.match(
            /youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]+)/
        );
        console.log(`Match: ${match}`);
        if (match) {
            const videoId = match[1];
            return `@[youtube](https://www.youtube.com/watch?v=${videoId})`;
        }
        return "";
    },
});

// Regla: blockquote de Twitter → @[tweet](...)
turndownService.addRule("twitterEmbed", {
    filter: (node) =>
        (node.nodeName === "BLOCKQUOTE" || node.nodeName === "A") &&
        (node as HTMLElement).classList.contains("tweet-embed"),
    replacement: (content, node) => {
        const element = node as HTMLAnchorElement;
        const url =
            element.getAttribute("href") ||
            element.getAttribute("data-url") ||
            element.getAttribute("data-twitter-url") ||
            element.getAttribute("url") ||
            "";
        return url ? `@[tweet](${url})` : "";
    },
});

export function compileHtmlToMarkdown(html: string): string {
    return turndownService.turndown(html);
}
