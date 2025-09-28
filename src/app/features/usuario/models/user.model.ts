import { IAddress } from "@shared/models/address.model";

export interface IUser {
    id?: number,
    name: string,
    password: string,
    email: string,
    phoneNumber?: string,
    cpf?: string,
    address ?: IAddress,
    level?: number
}
