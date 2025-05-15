import { StatusReclamacao } from "../enums/StatusReclamacao.enum";
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
    Tag ?: string[],
}
