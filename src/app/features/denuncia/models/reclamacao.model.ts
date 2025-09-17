import { IImagem } from "@features/denuncia/models/imagem.model";
import { ICategoria } from "@features/categoria/models/categoria.model";
import { IUser } from "@features/usuario/models/usuario.model";

export enum StatusReclamacao{
    Aberto,
    Visualizada,
    Analise,
    Resolvida
}

export class Reclamacao implements IReclamacao{
    id !: number;
    titulo !: string;
    descricao !: string;
    data!: Date;
    status !: StatusReclamacao;
    pontuacao !: number;
    cep ?: string;
    cidade ?: string;
    bairro ?: string;
    rua ?: string;
    numero ?: string;
    complemento ?: string;
    Usuario ?: IUser;
    Imagens !: IImagem[];
    Categorias !: ICategoria[];
}

export interface IReclamacao{
    id : number,
    titulo: string,
    descricao: string,
    data: Date,
    status: StatusReclamacao,
    pontuacao: number,
    cep ?: string,
    cidade ?: string,
    bairro ?: string,
    rua ?: string,
    numero ?: string,
    complemento ?: string,
    Usuario ?: IUser,
    Imagens : IImagem[],
    Categorias : ICategoria[],
}
export interface ICreateReclamacao{
    titulo: string,
    descricao: string,
    cep ?: string,
    cidade ?: string,
    bairro ?: string,
    rua ?: string,
    numero ?: string,
    complemento ?: string,
    idUsuario: number,
    Imagens : string[],
    Categorias : number[]
}