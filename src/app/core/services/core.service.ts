import { AuthTokenStorageService } from "./../auth/services/auth-token-storage.service";
import { HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CoreService {
  private authTokenStorageService = inject(AuthTokenStorageService);
  protected setHeader(): HttpHeaders {
    const token = this.authTokenStorageService.get();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set("Authorization", token);
    }
    return headers;
  }
}
