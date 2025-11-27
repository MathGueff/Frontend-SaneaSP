import { IUser } from '@features/usuario/models/user.model';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
import { BaseApiService } from '@core/services/base-api.service';
import { EnviromentService } from '@core/services/enviroment.service';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseApiService {
  private envService = inject(EnviromentService);
  private API_URL = this.envService.getUrl() + "user"
  private httpClient = inject(HttpClient)

  getUserById(id : number){
    return this.httpClient.get<IUser>(this.API_URL + id);;
  }

  public getUserNameById(userId : number) {
    const headers = this.setAuthHeader();
    return this.httpClient.get(`${this.API_URL}/${userId}/nome`,{headers})
  }
  
  private users: IUser[] = [];

  /* Pega todos os usuários existentes local */
  public getAllUsers(): IUser[] {
    return this.users;
  }

  //CADASTRO

  
}
