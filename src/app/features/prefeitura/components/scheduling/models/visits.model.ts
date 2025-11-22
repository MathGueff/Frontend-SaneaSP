export interface IVisits {
  id: number;
  motivo: string,
  dataInicio: Date;   
  dataFinal: Date; 
  idRegistro: number; 
}

export type IVisitCreate = Pick<IVisits, 'dataFinal' | 'dataInicio' | 'motivo'> & {
  idUsuario : number,
  idDenuncia : number
}