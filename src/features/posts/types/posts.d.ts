import {Tag} from "@/features/tags/types/tag";

export type PostsStatus = "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";

export interface Post {
    id: number;
    title: string;
    banner?: string | null;
    description: string;
    body?: string | null;
    slug?: string | null;
    draftId?: number | null;
    status: PostsStatus;
    authorId: number;
    categoryId?: number | null;
    Tags?: Tag[] | null;
    createdAt: Date;
    updatedAt: Date;
}

// export interface Post {
//     id: number;
//     title: string;
//     banner?: string | null;
//     description: string;
//     body?: string | null;
//     slug?: string | null;
//     draftId?: number | null;
//     status: PostsStatus;
//     authorId: number;
//     categoryId?: number | null;
//     Tags?: Tag[];
//     createdAt: Date;
//     updatedAt: Date;
// }

export interface CreatePost {
    title: string;
    description: string;
}

export interface UpdatePost {
    title: string;
    banner?: string | null;
    description: string;
    body?: string | null;
    status: PostsStatus;
    authorId: number;
    categoryId?: number | null;
    Tags?: number[] | Tag[];
}

export interface PatchPost {
    title?: string;
    banner?: string;
    description?: string;
    body?: string;
    status?: PostsStatus;
    authorId?: number;
    categoryId?: number;
    Tags?: number[];
}

export interface PostReview {
    id: string;
    postId: number;
    reviewBody: string;
    comment?: string | null;
    status: "PENDING" | "APPROVED" | "REJECTED";
    authorId: number;
    editorId?: number | null;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface PostReviewState {
    isPublish?: boolean;
    reviewBody: string;
    comment: string | null;
    status: "PENDING" | "APPROVED" | "REJECTED";
    editorId?: number | null;
}
