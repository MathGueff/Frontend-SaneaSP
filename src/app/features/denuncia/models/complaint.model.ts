import { IImage } from "@features/denuncia/models/image.model";
import { ICategory } from "@features/categoria/models/category.model";
import { IBaseApiFilters } from "@core/models/base-api.model";

export enum ComplaintStatus{
     Aberto = 'aberto',
    Visualizada = 'visualizada',
    Analise = 'analise',
    Agendado = 'agendado',
    Resolvida = 'resolvida'
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
    idUsuario: number;
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
export interface IComplaintPreview extends IComplaintBase {
    titulo: string;
    descricao: string;
    cep: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero?: string;
    complemento?: string;
    imagens?: File[];
    categorias?: ICategory[];
}

export interface IComplaintFilter extends IBaseApiFilters{
    status : ComplaintStatus
}