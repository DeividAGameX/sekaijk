export type ResourceType = "VIDEO" | "AUDIO" | "DOCUMENT" | "IMAGE";

export interface UserResource {
    id: number;
    name: string;
    userId: number;
    resourceId: string;
    url: string;
    type: ResourceType;
}
