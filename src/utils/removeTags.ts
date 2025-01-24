export function removeBrTags(str: string) {
    return str.replace(/<p><\/p>/g, "<br>");
}
