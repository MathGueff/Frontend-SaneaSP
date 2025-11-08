import { UserType } from "@features/usuario/enums/user-type";
import { ILabel } from "./label.model"

export interface ILink extends ILabel{
    path : string
}

export interface IProtectedLink extends ILink {
    accessRules : {
        requiresAuth: boolean;
        allowedRoles: UserType[]; 
    };
}