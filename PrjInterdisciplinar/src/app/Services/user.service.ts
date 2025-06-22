import { IUser } from '../models/interface/IUser.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SweetAlertService } from './sweetAlert.service';
import { IAdmin } from '../models/interface/IAdmin.model';
import { error } from 'console';

@Injectable({ providedIn: 'root' })
export class UserService {

  private API_URL = "https://backend-saneasp.onrender.com/user"

  constructor(private httpClient : HttpClient) {}

  getUserById(id : number){
    return this.httpClient.get<IUser>(this.API_URL + id);;
  }
  
  private users: IUser[] = [];

  /* Pega todos os usuários existentes local */
  public getAllUsers(): IUser[] {
    return this.users;
  }

  //CADASTRO

  /* Criação de um novo usuário */
  public newUser(newUser: IUser) {
    return this.httpClient.post<IUser>(`${this.API_URL}`, newUser);
  }
}
