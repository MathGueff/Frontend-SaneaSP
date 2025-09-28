import { IImage } from "@features/denuncia/models/image.model";
import { ICategory } from "@features/categoria/models/category.model";
import { IUser } from "@features/usuario/models/user.model";
import { IAddress } from "@shared/models/address.model";

export enum ComplaintStatus{
    Aberto,
    Visualizada,
    Analise,
    Resolvida
}

export interface IComplaint{
    id : number,
    title: string,
    description: string,
    date: Date,
    status: ComplaintStatus,
    score : number,
    address : IAddress,
    user : IUser,
    images ?: IImage[],
    categories ?: ICategory[],
}
export interface ICreateDenuncia{
    title: string,
    description : string,
    address : IAddress
    idUsuario: number,
    images : string[],
    categories : number[]
}