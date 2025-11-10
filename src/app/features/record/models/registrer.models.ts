import { IComplaint } from "@features/denuncia/models/complaint.model";
import { IUser } from "@features/usuario/models/user.model";

export interface IRecordy{
    id:number,
    descricao:string,
    dataPublicacao: Date,
    tipo: number,
    User?: IUser,
    Complain?: IComplaint,
}

export interface ICreateRecord{
    descricao:string,
    dataPublicacao: Date,
    tipo: number,
    arquivo ?: string[],
    fkUsuario: number,
    fkDenuncia: number,
}

