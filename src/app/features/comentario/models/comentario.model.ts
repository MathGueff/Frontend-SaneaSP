import { Reclamacao } from "@core/models/reclamacao.model";
import { IUser } from "@core/models/usuario.model";

export class Comentario {
  id: number | null = 0;
  descricaoComentario:string = '';
  dataComentario: string = ''; //por enquanto é tipo String
  objAdmin: string | null = null; // ObjAdmin será do tipo number, como usa-lo como se fosse o Id do Admin. O tipo null é para poder controlar o comentario
  objReclamacao !: Reclamacao;
  objUsuario !: IUser;
}
