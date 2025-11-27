import { inject, Injectable } from '@angular/core';
import { ICategory, TCreateCategory, ICategoryListFilter } from '@features/categoria/models/category.model';
import { IResponse } from '@shared/models/response.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IResponseList } from '@shared/models/response.model';
import { AuthService } from '@core/services/auth.service';
import { environment } from 'environments/environment.prod';
import { AuthTokenStorageService } from '@core/auth/services/auth-token-storage.service';
import { ICategoryGroup } from '../models/category-group.model';
import { EnviromentService } from '@core/services/enviroment.service';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private envService = inject(EnviromentService);
  private apiUrl = this.envService.getUrl() + 'categoria';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private tokenStorageService : AuthTokenStorageService
  ) {}

  //GET
  getTagsList(filters?: ICategoryListFilter) {
    const token = this.tokenStorageService.get();

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
    return this.httpClient.get<ICategory[]>(this.apiUrl, {
      params,
      headers,
    });
  }

  //GET
  getGroups() {
    return this.httpClient.get<ICategoryGroup[]>(this.apiUrl + '/grupos');
  }

  getTagByExactName(nameFilter: string) {
    const token = this.tokenStorageService.get();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', token);
    }
    return this.httpClient.get<IResponse<ICategory>>(
      `${this.apiUrl}/nome/${nameFilter}`,
      { headers }
    );
  }

  //GET/:id
  getTagById(id: number) {
    const token = this.tokenStorageService.get();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', token);
    }
    return this.httpClient.get<ICategory>(`${this.apiUrl}/${id}`, { headers });
  }

  getTagCount() {
    const token = this.tokenStorageService.get();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', token);
    }
    return this.httpClient.get<number>(`${this.apiUrl}/total`, { headers });
  }

  //POST
  createNewTag(newTag: TCreateCategory) {
    const token = this.tokenStorageService.get();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', token);
    }
    return this.httpClient.post<IResponse<ICategory>>(`${this.apiUrl}`, newTag, {
      headers,
    });
  }

  //DELETE
  deleteTag(idTag: number) {
    const token = this.tokenStorageService.get();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', token);
    }
    return this.httpClient.delete<IResponse<ICategory>>(`${this.apiUrl}/${idTag}`, {
      headers,
    });
  }

  //PUT
  editTag(idTag: number, updatedTag: ICategory) {
    const token = this.tokenStorageService.get();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', token);
    }
    return this.httpClient.put<IResponse<ICategory>>(
      `${this.apiUrl}/${idTag}`,
      updatedTag,
      { headers }
    );
  }
}
