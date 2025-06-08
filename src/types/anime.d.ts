export type AnimeStatus = "ONGOING" | "COMPLETED" | "CANCELLED";

export interface Anime {
    id: number;
    title: string;
    description: string;
    body?: string;
    banner?: string;
    episodes: number;
    slug?: string;
    draftId?: number;
    postStatus: PostsStatus;
    status: AnimeStatus;
    createdAt: string;
    updatedAt: string;
}
