import { HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthTokenStorageService } from "@core/auth/services/auth-token-storage.service";

@Injectable({ providedIn: "root" })
export abstract class BaseApiService {
    protected authTokenStorageService = inject(AuthTokenStorageService);

    protected setHeader(): HttpHeaders {
    const token = this.authTokenStorageService.get();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set("Authorization", token);
    }
    return headers;
  }
}
