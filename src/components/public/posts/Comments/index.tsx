"use client";
import {DiscussionEmbed} from "disqus-react";

function CommentPost({
    title,
    url,
    slug,
}: {
    title: string;
    url: string;
    slug: string;
}) {
    return (
        <DiscussionEmbed
            shortname={process.env.NEXT_PUBLIC_DISQ || ""}
            config={{
                url: url,
                identifier: slug,
                title: title,
                language: "es_MX"
            }}
        />
    );
}

export default CommentPost;
