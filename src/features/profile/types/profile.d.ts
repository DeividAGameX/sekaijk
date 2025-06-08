import {Roles} from "@/features/roles/types/roles";
import {TeamRole} from "@/features/teamRole/types/teamRole";
import {Social} from "@/features/users/types/social";

export interface Profile {
    id: number;
    name: string;
    email: string;
    avatar: string;
    banner?: string | null;
    description?: string | null;
    slug?: string | null;
    createdAt: Date;
    updatedAt: Date;
    TeamRoles: TeamRole[];
    Roles: Roles;
    social: Social[];
}

export interface ProfileForm {
    name: string;
    email: string;
    avatar: string;
    banner?: string | null;
    description?: string | null;
    social: Social[];
}
