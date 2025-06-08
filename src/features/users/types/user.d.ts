import {Roles} from "@/features/roles/types/roles";
import {TeamRole} from "@/features/teamRole/types/teamRole";
import {Role} from "@/types/role";

export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    banner?: string | null;
    description?: string | null;
    slug?: string | null;
    rolesId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserInfo {
    id: number;
    name: string;
    email: string;
    avatar: string;
    banner?: string | null;
    description?: string | null;
    slug?: string | null;
    Roles: Roles;
    TeamRoles: TeamRole[];
    createdAt: Date;
    updatedAt: Date;
}

export interface UserTable {
    id: number;
    name: string;
    email: string;
    avatar: string;
    Roles: Role;
    TeamRoles: TeamRole[];
    createdAt: Date;
    updatedAt: Date;
}

export interface UserForm {
    id: number;
    name: string;
    email: string;
    avatar: string;
    password: string;
    rolesId: number;
    TeamRoles: number[];
}

export interface UserReturn {
    id: number;
    name: string;
    email: string;
    avatar: string;
    rolesId: number;
    TeamRoles: TeamRole[];
}

export interface UserModal {
    open: boolean;
    id: number | null;
}
