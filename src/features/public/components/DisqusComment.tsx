"use client";
import {DiscussionEmbed} from "disqus-react";
import {useTheme} from "next-themes";

function DisqusComments({
    slug,
    title,
    url,
}: {
    slug: string;
    title: string;
    url: string;
}) {
    const {theme} = useTheme();
    const disqusShortname = process.env.NEXT_PUBLIC_DISQUS ?? "";
    const disqusConfig = {
        url: url,
        identifier: slug, // Single post id
        title: title, // Single post title
        language: "es_MX",
    };
    return (
        <div className="not-prose isolate ">
            <DiscussionEmbed
                key={theme}
                shortname={disqusShortname}
                config={disqusConfig}
            />
        </div>
    );
}

export default DisqusComments;
