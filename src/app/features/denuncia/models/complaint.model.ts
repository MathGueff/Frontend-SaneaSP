import { IImage } from "@features/denuncia/models/image.model";
import { ICategory } from "@features/categoria/models/category.model";
import { IUser } from "@features/usuario/models/user.model";
import { IAddress } from "@shared/models/address.model";
import { IBaseApiFilters } from "@core/models/base-api.model";

export enum ComplaintStatus{
    Aberto,
    Visualizada,
    Analise,
    Resolvida
}

// Crie uma interface base comum
export interface IComplaintBase {
    titulo: string;
    descricao: string;
    cep: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero?: string;
    complemento?: string;
    idUsuario: string | number;
    imagens?: any[];
    categorias?: any[];
}

export interface IComplaint extends IComplaintBase {
    id: number;
    dataPublicacao: string;
    status: ComplaintStatus;
    pontuacao: number;
    imagens?: IImage[];
    categorias?: ICategory[];
}

export interface ICreateComplaint extends IComplaintBase {
    idUsuario: number;
    imagens?: string[];
    categorias?: number[];
}

export interface IComplaintFilter extends IBaseApiFilters{
    status : ComplaintStatus
}