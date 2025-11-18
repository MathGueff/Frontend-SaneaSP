import { UserType } from "@features/usuario/enums/user-type";
import { ILink } from "./link.model";

export type TCanVIew = 'auth' | 'unauth' | 'both'

export interface IProtectedLink extends ILink {
    canView : TCanVIew
    allowedRoles ?: UserType[]
}