export interface Tag {
    id: number;
    name: string;
    color: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface TagForm {
    name: string;
    color: string;
    description: string;
}
