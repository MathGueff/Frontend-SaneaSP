import { Injectable } from '@angular/core';
import { ITag } from '../models/interface/ITag.model';
import { IResponse } from '../models/interface/IResponse.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ITagCadastro } from '../models/interface/ITagCadastro.model';
import { ITagListFilter } from '../models/interface/ITagListFilter.interface';
import { IResponseList } from '../models/interface/IResponseList.model';
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
    return this.httpClient.get<IResponseList<ITag[]>>(this.apiUrl, {
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
    return this.httpClient.get<IResponse<ITag>>(
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
    return this.httpClient.get<ITag>(`${this.apiUrl}/${id}`, { headers });
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
    return this.httpClient.post<IResponse<ITag>>(`${this.apiUrl}`, newTag, {
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
    return this.httpClient.delete<IResponse<ITag>>(`${this.apiUrl}/${idTag}`, {
      headers,
    });
  }

  //PUT
  editTag(idTag: number, updatedTag: ITag) {
    const token = this.authService.getAuthToken();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', token);
    }
    return this.httpClient.put<IResponse<ITag>>(
      `${this.apiUrl}/${idTag}`,
      updatedTag,
      { headers }
    );
  }
}
