import { CategoryGroup, ICategory } from '@features/categoria/models/category.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "@core/services/auth.service";
import { environment } from 'environments/environment';
import { ICreateComplaint, IComplaint, ComplaintStatus } from '../models/complaint.model';
import { AuthTokenStorageService } from '@core/auth/services/auth-token-storage.service';

@Injectable ({providedIn:'root'})
export class ComplaintService{
  //
  private urlApi:string = environment.domain +"denuncia";

  private authService = inject(AuthService);
  private authTokenStorageService = inject(AuthTokenStorageService);

  constructor(private httpClient:HttpClient){}

  public getComplaints() : Observable<IComplaint[]> {
    return this.httpClient.get<IComplaint[]>(`${this.urlApi}/`)
  }

  public getComplaintById(id:number):Observable<IComplaint>{
    return  this.httpClient.get<IComplaint>(`${this.urlApi}/${id}`);
  }

  public getByTag(tags:ICategory[],idUsuario?:number):Observable<IComplaint[]>{
    let query:string = ""
    tags.forEach((tag,i)=>{
      query += `tags=${tag.id}`;
      if(i+1 !== tags.length) query += '&'
    })
    if(idUsuario){
      query += `&idUsuario=${idUsuario}`
    }
    return this.httpClient.get<IComplaint[]>(`${this.urlApi}/tags/?${query}`)
  }

  public createComplaint(reclamacao: ICreateComplaint):Observable<IComplaint>{
    const headers = this.setHeader();
    const user = this.authService.getCurrentUser();
    if(user){
      reclamacao.idUsuario = user.id as number;
    }
    return this.httpClient.post<IComplaint>(`${this.urlApi}`, reclamacao,{headers})
  }
  public putComplaint(reclamacao:ICreateComplaint, idReclamacao: number){
    const headers = this.setHeader();
    return this.httpClient.put<IComplaint>(`${this.urlApi}/${idReclamacao}`,reclamacao, {headers})
  }
  public deleteComplaint(idReclamacao:number){
    const headers = this.setHeader();
    return this.httpClient.delete<IComplaint>(`${this.urlApi}/${idReclamacao}`,{headers})
  }

  public getByUser():Observable<IComplaint[]>{
    const headers = this.setHeader();
    return this.httpClient.get<IComplaint[]>(`${this.urlApi}/usuario`,{headers})
  }

  private setHeader():HttpHeaders{
    const token = this.authTokenStorageService.get();
    let headers = new HttpHeaders();
    if(token){
      headers = headers.set('Authorization',token)
    }
    return headers
  }
}