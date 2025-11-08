import { HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthTokenStorageService } from "@core/auth/services/auth-token-storage.service";
import { IBaseApiFilters } from "@core/models/base-api.model";

@Injectable({ providedIn: "root" })
export abstract class BaseApiService {
  protected authTokenStorageService = inject(AuthTokenStorageService);

  protected setAuthHeader(): HttpHeaders {
    const token = this.authTokenStorageService.get();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set("Authorization", token);
    }
    return headers;
  }

  protected setFilterQuery<T extends IBaseApiFilters>(filters: T): HttpParams {
    let params = new HttpParams();

    if (filters) {
      Object.keys(filters).forEach((key) => {
        const value = filters[key as keyof T];
        if (value !== undefined && value !== null) {
          params = params.set(key, String(value));
        }
      });
    }

    return params;
  }
}
