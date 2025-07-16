import { Injectable } from '@angular/core';
import { ICategoria } from '../models/categoria.model';
import { IResponse } from '@shared/models/response.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ITagCadastro } from '@features/categoria/models/ITagCadastro.model';
import { ITagListFilter } from '@features/categoria/models/ITagListFilter.interface';
import { IResponseList } from '@shared/models/response.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class TagService {
  //
  private apiUrl = 'https://backend-saneasp.onrender.com/categoria';
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  //GET
  getTagsList(filters?: ITagListFilter) {
    const token = this.authService.getAuthToken();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', token);
    }
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value != undefined && value != null) {
          params = params.set(key, value);
        }
      });
    }
    return this.httpClient.get<IResponseList<ICategoria[]>>(this.apiUrl, {
      params,
      headers,
    });
  }

  getTagByExactName(nameFilter: string) {
    const token = this.authService.getAuthToken();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', token);
    }
    return this.httpClient.get<IResponse<ICategoria>>(
      `${this.apiUrl}/nome/${nameFilter}`,
      { headers }
    );
  }

  //GET/:id
  getTagById(id: number) {
    const token = this.authService.getAuthToken();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', token);
    }
    return this.httpClient.get<ICategoria>(`${this.apiUrl}/${id}`, { headers });
  }

  getTagCount() {
    const token = this.authService.getAuthToken();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', token);
    }
    return this.httpClient.get<number>(`${this.apiUrl}/total`, { headers });
  }

  //POST
  createNewTag(newTag: ITagCadastro) {
    const token = this.authService.getAuthToken();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', token);
    }
    return this.httpClient.post<IResponse<ICategoria>>(`${this.apiUrl}`, newTag, {
      headers,
    });
  }

  //DELETE
  deleteTag(idTag: number) {
    const token = this.authService.getAuthToken();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', token);
    }
    return this.httpClient.delete<IResponse<ICategoria>>(`${this.apiUrl}/${idTag}`, {
      headers,
    });
  }

  //PUT
  editTag(idTag: number, updatedTag: ICategoria) {
    const token = this.authService.getAuthToken();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', token);
    }
    return this.httpClient.put<IResponse<ICategoria>>(
      `${this.apiUrl}/${idTag}`,
      updatedTag,
      { headers }
    );
  }
}
