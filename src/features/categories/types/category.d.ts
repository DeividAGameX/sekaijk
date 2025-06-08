export interface Category {
    id: number;
    name: string;
    description: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CategoryForm {
    name: string;
    description: string;
}
