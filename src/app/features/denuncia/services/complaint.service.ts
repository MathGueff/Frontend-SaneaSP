import {
  CategoryGroup,
  ICategory,
} from "@features/categoria/models/category.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "@core/services/auth.service";
import { environment } from "environments/environment";
import {
  ICreateComplaint,
  IComplaint,
  ComplaintStatus,
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
      params = this.setFilterQuery(filter); // não precisa embrulhar em { filter }
    }

    return this.httpClient.get<IComplaint[]>(`${this.urlApi}/`, { params });
  }

  public getComplaintById(id: number): Observable<IComplaint> {
    return this.httpClient.get<IComplaint>(`${this.urlApi}/${id}`);
  }

  public getUserComplaint(filter: IComplaintFilter): Observable<IComplaint[]> {
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
  public createComplaint(reclamacao: ICreateComplaint): Observable<IComplaint> {
    const headers = this.setAuthHeader();
    const user = this.authService.getCurrentUser();
    if (user) {
      reclamacao.idUsuario = user.id as number;
    }
    return this.httpClient.post<IComplaint>(`${this.urlApi}`, reclamacao, {
      headers,
    });
  }
  // PUT
  public putComplaint(reclamacao: ICreateComplaint, idReclamacao: number) {
    const headers = this.setAuthHeader();
    return this.httpClient.put<IComplaint>(
      `${this.urlApi}/${idReclamacao}`,
      reclamacao,
      { headers }
    );
  }

  // DELETE
  public deleteComplaint(idReclamacao: number) {
    const headers = this.setAuthHeader();
    return this.httpClient.delete<IComplaint>(
      `${this.urlApi}/${idReclamacao}`,
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
    const date = new Date(dateStr);
    const now = new Date();
    // Convert both dates to Brasília time (UTC-3)
    const toBrasilia = (d: Date) => {
      // Get UTC time and subtract 3 hours
      return new Date(
        d.getTime() - d.getTimezoneOffset() * 60000 - 3 * 60 * 60 * 1000
      );
    };
    const dateBR = toBrasilia(new Date(date));
    const nowBR = toBrasilia(now);

    const diffMs = nowBR.getTime() - dateBR.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 24) {
      return `${diffHours} hora${diffHours === 1 ? "" : "s"}`;
    }
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      return `${diffDays} dia${diffDays === 1 ? "" : "s"}`;
    }
    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 4) {
      return `${diffWeeks} semana${diffWeeks === 1 ? "" : "s"}`;
    }
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) {
      return `${diffMonths} mês${diffMonths === 1 ? "" : "es"}`;
    }
    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears} ano${diffYears === 1 ? "" : "s"}`;
  }
}
