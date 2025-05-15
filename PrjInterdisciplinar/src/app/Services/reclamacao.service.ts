import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Reclamacao } from "../models/class/reclamacao";
import { Observable } from "rxjs";
import { IReclamacao } from "../models/interface/IReclamacao.interface";

@Injectable ({providedIn:'root'})
export class ReclamacaoService{
  private urlApi:string = "http://localhost:3000/reclamacao";
  constructor(private httpClient:HttpClient){}

  public getListReclamacao() : Observable<IReclamacao[]> {
    return this.httpClient.get<IReclamacao[]>(`${this.urlApi}/`)
  }
  public getByIdReclamacao(id:number): Observable<IReclamacao>{
    return this.httpClient.get<IReclamacao>(`${this.urlApi}/${id}}`)
  }

}
