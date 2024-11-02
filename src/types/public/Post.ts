import {AuthorType} from "./Author";
import {Category} from "./Categories";

export type PostType = {
    slug: number;
    banner: string;
    title: string;
    description: string;
    createdAt: Date;
    category?: Category;
    author?: AuthorType;
};
