import {PostsStatus} from "./posts";

export interface CapReview {
    id: number;
    title: string;
    description: string;
    banner?: string;
    body: string;
    animeId: number;
    slug?: string;
    status: PostsStatus;
    draftId?: number;
    author: number;
    createdAt: string;
    updatedAt: string;
}
