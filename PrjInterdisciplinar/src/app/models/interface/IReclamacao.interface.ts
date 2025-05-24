import { StatusReclamacao } from "../enums/StatusReclamacao.enum";
import { ITag } from "./ITag.model";
import { IUser } from "./IUser.model";

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
    Imagem ?: string[],
    tags : ITag[],
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
    Imagem ?: string,
    tags ?: ITag
}
