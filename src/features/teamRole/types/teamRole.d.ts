export interface TeamRole {
    id: number;
    name: string;
    isSection: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface TeamRoleForm {
    name: string;
    isSection: boolean;
}

export interface TeamRoleModal {
    open: boolean;
    id: number | null;
}
