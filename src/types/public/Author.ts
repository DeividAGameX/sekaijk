export type AuthorType = {
    slug: string | null;
    name: string;
    description?: string;
    avatar: string;
    banner?: string;
    social?: AuthorSocialType[];
};

export type AuthorSocialType = {
    icon: string;
    url: string;
};
