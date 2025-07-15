import { IUser } from '../models/interface/IUser.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  
}
