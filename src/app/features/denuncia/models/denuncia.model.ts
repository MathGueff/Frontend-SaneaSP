import { IImagem } from "@features/denuncia/models/imagem.model";
import { ICategoria } from "@features/categoria/models/categoria.model";
import { IUser } from "@features/usuario/models/usuario.model";
import { IEndereco } from "@shared/models/endereco.model";

export enum StatusDenuncia{
    Aberto,
    Visualizada,
    Analise,
    Resolvida
}

export class Denuncia implements IDenuncia{
    id !: number;
    titulo !: string;
    descricao !: string;
    data!: Date;
    status !: StatusDenuncia;
    pontuacao !: number;
    Address : IEndereco = {
        cep: "",
        logradouro: "",
        bairro: "",
        cidade: ""
    };
    Usuario ?: IUser;
    Imagens !: IImagem[];
    Categorias !: ICategoria[];
}

export interface IDenuncia{
    id : number,
    titulo: string,
    descricao: string,
    data: Date,
    status: StatusDenuncia,
    pontuacao: number,
    Address : IEndereco,
    Usuario ?: IUser,
    Imagens : IImagem[],
    Categorias : ICategoria[],
}
export interface ICreateDenuncia{
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