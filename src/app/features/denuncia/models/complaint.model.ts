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
    titulo: string,
    descricao: string,
    dataPublicacao: string,
    status: ComplaintStatus,
    pontuacao : number,
    endereco : IAddress,
    usuario : IUser,
    imagens ?: IImage[],
    categorias ?: ICategory[],
}
export interface ICreateComplaint{
    titulo: string,
    descricao : string,
    endereco : IAddress
    idUsuario: number,
    imagens : string[],
    categorias : number[]
}