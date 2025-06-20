import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Reclamacao } from "../models/class/reclamacao";
import { Observable } from "rxjs";
import { ICreateReclamacao, IReclamacao } from "../models/interface/IReclamacao.interface";

@Injectable ({providedIn:'root'})
export class ReclamacaoService{
  private urlApi:string = "https://backend-saneasp.onrender.com/reclamacao";
  private listReclamcao !: IReclamacao[];
  constructor(private httpClient:HttpClient){}

  public getObservableReclamacao() : Observable<IReclamacao[]> {
    return this.httpClient.get<IReclamacao[]>(`${this.urlApi}/`)
  }

  public getByIdReclamacao(id:number):Observable<IReclamacao>{
     return  this.httpClient.get<IReclamacao>(`${this.urlApi}/${id}`);
  }

  public postReclamacao(reclamcao: ICreateReclamacao):Observable<IReclamacao>{
   return this.httpClient.post<IReclamacao>(`${this.urlApi}`, reclamcao)
  }

}
