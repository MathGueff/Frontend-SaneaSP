import { UserType } from "../enums/user-type"

export interface IUser {
    id: number,
    nome: string,
    email: string,
    senha: string,
    tipo: UserType,
    verified: boolean
}

export type TUserCreate = Omit<IUser, 'id' | 'verified' | 'tipo' >

export interface IUserCredentials{
    email : string,
    senha : string
}