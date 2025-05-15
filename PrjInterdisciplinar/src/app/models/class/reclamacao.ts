import { StatusReclamacao } from '../enums/StatusReclamacao.enum';
import { IEndereco } from '../interface/IEndereco.model';
import { IReclamacao } from '../interface/IReclamacao.interface';
import { IUser } from './../interface/IUser.model';



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
    Imagem ?: string[];
    Tag ?: string[];
}

