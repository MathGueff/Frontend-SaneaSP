import { ILabel } from "./label.model"

export type AccessRoles = 'cidadao' | 'organizacao' |  'prefeitura'| 'admin' 
export interface ILink extends ILabel{
    path : string
}

export interface IProtectedLink extends ILink {
    access: {
        requiresAuth: boolean;
        allowedRoles?: AccessRoles[]; 
    };
}