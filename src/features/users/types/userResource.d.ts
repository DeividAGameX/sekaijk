export type ResourceType = "VIDEO" | "AUDIO" | "DOCUMENT" | "IMAGE";

export interface UserResource {
    id: number;
    name: string;
    userId: number;
    resourceId: string;
    url: string;
    type: ResourceType;
}

export interface FolderResource {
    id: string;
    name: string;
    parentId: string | null;
    usersId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ImagesResources {
    id: number;
    resourceId: string;
    url: string;
    type: ResourceType;
}

export interface FoldersResources {
    id: string;
    name: string;
}

export interface GetResource {
    id?: string;
    name?: string;
    parentId?: string | null;
    Resources: ImagesResources[];
    children: FoldersResources[];
}
