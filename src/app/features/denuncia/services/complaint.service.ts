import {
  ICategory,
} from "@features/categoria/models/category.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "@core/services/auth.service";
import { environment } from '../../../../environments/environment'

import {
  ICreateComplaint,
  IComplaint,
  IComplaintFilter,
} from "../models/complaint.model";
import { IIcon } from "@shared/models/icon.model";
import { BaseApiService } from "@core/services/base-api.service";

@Injectable({ providedIn: "root" })
export class ComplaintService extends BaseApiService {
  //
  private urlApi: string = environment.domain + "denuncia";

  private authService = inject(AuthService);
  private httpClient = inject(HttpClient);

  // GET
  public getComplaints(filter?: IComplaintFilter): Observable<IComplaint[]> {
    let params: HttpParams | undefined;

    if (filter) {
      params = this.setFilterQuery(filter);
    }

    return this.httpClient.get<IComplaint[]>(`${this.urlApi}/`, { params });
  }

  public getComplaintById(id: number): Observable<IComplaint> {
    return this.httpClient.get<IComplaint>(`${this.urlApi}/${id}`);
  }

  public getUserComplaint(filter?: IComplaintFilter): Observable<IComplaint[]> {
    let params: HttpParams | undefined;

    if (filter) {
      params = this.setFilterQuery(filter);
    }

    const headers = this.setAuthHeader();

    const options: any = {
      params,
      headers,
    };
    return this.httpClient.get<IComplaint[]>(`${this.urlApi}/my`, {
      params,
      headers,
    });
  }

  public getByTag(
    tags: ICategory[],
    idUsuario?: number
  ): Observable<IComplaint[]> {
    let query: string = "";
    tags.forEach((tag, i) => {
      query += `tags=${tag.id}`;
      if (i + 1 !== tags.length) query += "&";
    });
    if (idUsuario) {
      query += `&idUsuario=${idUsuario}`;
    }
    return this.httpClient.get<IComplaint[]>(`${this.urlApi}/tags/?${query}`);
  }

  // POST
  public createComplaint(denuncia: ICreateComplaint): Observable<IComplaint> {
    const headers = this.setAuthHeader();
    const user = this.authService.currentUser();
    if (user) {
      denuncia.idUsuario = user.id as number;
    }
    return this.httpClient.post<IComplaint>(`${this.urlApi}`, denuncia, {
      headers,
    });
  }
  // PUT
  public putComplaint(denuncia: ICreateComplaint, idDenuncia: number) {
    const headers = this.setAuthHeader();
    return this.httpClient.put<IComplaint>(
      `${this.urlApi}/${idDenuncia}`,
      denuncia,
      { headers }
    );
  }

  // DELETE
  public deleteComplaint(idDenuncia: number) {
    const headers = this.setAuthHeader();
    return this.httpClient.delete<IComplaint>(
      `${this.urlApi}/${idDenuncia}`,
      { headers }
    );
  }

  //UTILS

  getFullAddress(complaint: IComplaint | ICreateComplaint): string {
    if (!complaint) return "";
    const { rua, numero, complemento, bairro, cidade } = complaint;
    const parts: string[] = [];

    if (rua) parts.push(rua);
    if (numero) parts.push(numero);
    if (complemento) parts.push(complemento);

    const main = parts.join(", ");
    const location = [bairro, cidade].filter(Boolean).join(", ");

    return [main, location].filter(Boolean).join(" - ");
  }

  getCategoryIcon(category: any): IIcon {
    const sewageIcon: IIcon = { folder: "entities", name: "sewage", alt: "" };
    return sewageIcon;
  }

  getFormattedDate(dateStr: string | null): string {
    const date = dateStr ? new Date(dateStr) : new Date();
    if (!date) return "";
    const pad = (n: number) => n.toString().padStart(2, "0");
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `Publicado dia: ${day}/${month}/${year} as ${hours}:${minutes} horas`;
  }

  getCalculatedDate(dateStr: string): string {
    // Converte a string para Date (assume que dateStr está em UTC ou formato ISO)
    const date = new Date(dateStr);
    const now = new Date();

    // Calcula a diferença em milissegundos
    const diffMs = now.getTime() - date.getTime();

    // Converte para diferentes unidades de tempo
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    // Retorna a unidade mais apropriada
    if (diffSeconds < 60) {
      return "Agora mesmo";
    } else if (diffMinutes < 60) {
      return `Há ${diffMinutes} minuto${diffMinutes === 1 ? "" : "s"}`;
    } else if (diffHours < 24) {
      return `Há ${diffHours} hora${diffHours === 1 ? "" : "s"}`;
    } else if (diffDays < 7) {
      return `Há ${diffDays} dia${diffDays === 1 ? "" : "s"}`;
    } else if (diffDays < 30) {
      const diffWeeks = Math.floor(diffDays / 7);
      return `Há ${diffWeeks} semana${diffWeeks === 1 ? "" : "s"}`;
    } else if (diffDays < 365) {
      const diffMonths = Math.floor(diffDays / 30);
      return `Há ${diffMonths} ${diffMonths === 1 ? "mês" : "meses"}`;
    } else {
      const diffYears = Math.floor(diffDays / 365);
      return `Há ${diffYears} ano${diffYears === 1 ? "" : "s"}`;
    }
  }
}
