import { CategoryGroup, ICategory } from '@features/categoria/models/category.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "@core/services/auth.service";
import { environment } from 'environments/environment';
import { ICreateComplaint, IComplaint, ComplaintStatus } from '../models/complaint.model';
import { AuthTokenStorageService } from '@core/auth/services/auth-token-storage.service';
import { IAddress } from '@shared/models/address.model';
import { IIcon } from '@shared/models/icon.model';
import { BaseApiService } from '@core/services/base-api.service';

@Injectable ({providedIn:'root'})
export class ComplaintService extends BaseApiService{
  //
  private urlApi:string = environment.domain +"denuncia";

  private authService = inject(AuthService);
  private httpClient = inject(HttpClient)

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

 

  getCategoryIcon(category: ICategory): IIcon {
    const waterIcon: IIcon = { folder: "entities", name: "water", alt: "" };
    const drainageIcon: IIcon = { folder: "entities", name: "drainage", alt: "" };
    const sewageIcon: IIcon = { folder: "entities", name: "sewage", alt: "" };
    const cleaningIcon: IIcon = { folder: "entities", name: "cleaning", alt: "" };
    category.grupo = CategoryGroup.SEWAGE;
    let icon: IIcon;
    switch (category.grupo) {
      // case CategoryGroup.WATER:
      //   icon = this.waterIcon;
      //   break;
      // case CategoryGroup.DRAINAGE:
      //   icon = this.drainageIcon;
      //   break;
      case CategoryGroup.SEWAGE:
        icon = sewageIcon;
        break;
      // case CategoryGroup.CLEANING:
      //   icon = this.cleaningIcon;
      //   break;
    }
    return icon;
  }

  getFullAddress(address: IAddress): string {
    if (!address) return "";
    const { logradouro, numero, complemento, bairro, cidade } = address;
    const parts: string[] = [];

    if (logradouro) parts.push(logradouro);
    if (numero) parts.push(numero);
    if (complemento) parts.push(complemento);

    const main = parts.join(", ");
    const location = [bairro, cidade].filter(Boolean).join(", ");

    return [main, location].filter(Boolean).join(" - ");
  }

  getFormattedDate(dateStr: string): string {
    const date = new Date(dateStr)
    if (!date) return "";
    const pad = (n: number) => n.toString().padStart(2, "0");
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `Publicado dia: ${day}/${month}/${year} as ${hours}:${minutes} horas`;
  }

  getCalculatedDate(dateStr : string) : string{
    const date = new Date(dateStr)
    const now = new Date();
    // Convert both dates to Brasília time (UTC-3)
    const toBrasilia = (d: Date) => {
      // Get UTC time and subtract 3 hours
      return new Date(d.getTime() - (d.getTimezoneOffset() * 60000) - (3 * 60 * 60 * 1000));
    };
    const dateBR = toBrasilia(new Date(date));
    const nowBR = toBrasilia(now);

    const diffMs = nowBR.getTime() - dateBR.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 24) {
      return `${diffHours} hora${diffHours === 1 ? '' : 's'}`;
    }
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      return `${diffDays} dia${diffDays === 1 ? '' : 's'}`;
    }
    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 4) {
      return `${diffWeeks} semana${diffWeeks === 1 ? '' : 's'}`;
    }
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) {
      return `${diffMonths} mês${diffMonths === 1 ? '' : 'es'}`;
    }
    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears} ano${diffYears === 1 ? '' : 's'}`;
  }
}