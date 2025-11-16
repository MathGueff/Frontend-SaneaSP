import { IUser } from "@features/usuario/models/user.model";
import { IComplaint } from "./complaint.model";

export interface IComment {
  id: number;
  descricao :string;
  dataPublicacao: string;
  denuncia : IComplaint
  usuario : IUser;
}

export interface ICommentCreate{
  descricao : IComment['descricao']
  idDenuncia : string
  idUsuario : string
}
