export interface Roles {
    id: number;
    name: string;
    description: string;
    Permissions?: Permissions[];
    createdAt: Date;
    updatedAt: Date;
}

export interface RoleForm {
    name: string;
    description: string;
    Permissions: Permissions[];
}

export interface Permissions {
    id: number;
    permission: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RolModal {
    open: boolean;
    id: number | null;
}
