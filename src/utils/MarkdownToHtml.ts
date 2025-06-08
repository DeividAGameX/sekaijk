import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

function filterSpecial(markdown: string): string {
    let filtered = markdown.replace(
        /@\[tweet\]\((.*?)\)/g,
        (_, url) => `@TWEET(${url})`
    );
    filtered = filtered.replace(
        /@\[youtube\]\((.*?)\)/g,
        (_, url) => `@YOUTUBE(${url})`
    );
    return filtered;
}

function executeSpecial(html: string): string {
    let filtered = html.replace(
        /<p>@TWEET\((.*?)\)<\/p>/g,
        (_, url) =>
            `<a url="${url}" data-twitter-url="${url}" class="w-full flex justify-center tweet-embed"></a>`
    );
    filtered = filtered.replace(
        /@YOUTUBE\((.*?)\)/g,
        (_, url) =>
            `<div data-youtube-video=\"\"><iframe width=\"640\" height=\"480\" allowfullscreen=\"true\" autoplay=\"false\" disablekbcontrols=\"false\" enableiframeapi=\"false\" endtime=\"0\" ivloadpolicy=\"0\" loop=\"false\" modestbranding=\"false\" origin=\"\" playlist=\"\" rel=\"1\" src=\"${url}\" start=\"0\"></iframe></div>`
    );
    return filtered;
}

export function compileMarkdownToHtml(markdown: string): string {
    const html = md.render(filterSpecial(markdown));
    return executeSpecial(html);
}
