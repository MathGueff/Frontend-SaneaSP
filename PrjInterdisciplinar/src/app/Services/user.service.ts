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

  constructor(private sweetAlert : SweetAlertService, private httpClient : HttpClient) {
    //this.loadUsers(); Para carregar os usuários local
  }

  getUserById(id : number){
    return this.httpClient.get<IUser>(this.API_URL + id);;
  }
  
  private users: IUser[] = [];

  /*
  private loadUsers(): void {
    this.users = [
      {
        id: 1,
        nome: 'Matheus',
        email: 'gueff@gmail.com',
        senha: 'math',
        endereco:{
          cep: '18075718',
          bairro : 'Jardim Brasilândia',
          logradouro : 'Rua Alonco Muchon',
          cidade : 'Sorocaba'
        },
        nivel:1
      },
      {
        id: 2,
        nome: 'Davy',
        email: 'davy@gmail.com',
        senha: 'davy',
        endereco:{
          cep: '17571802',
          bairro : 'Jardim Europa',
          logradouro : 'Rua Rock',
          cidade : 'Votorantim'
        },
        nivel:1
      },
      {
        id: 3,
        nome: 'Adryann',
        email: 'adryann@gmail.com',
        senha: 'adry',
        endereco:{
          cep: '11111111',
          bairro : 'Bairro tal',
          logradouro : 'Rua tal',
          cidade : 'Sorocaba'
        },
        nivel:1
      },
      {
        id: 4,
        nome: 'Ryan',
        email: 'ryan@gmail.com',
        senha: 'ryan',
        endereco:{
          cep: '77777777777',
          bairro : 'Bairro tal',
          logradouro : 'Rua tal',
          cidade : 'Cidade tal'
        },
        nivel:1
      },
      {
        id: 5,
        nome: 'Pedro',
        email: 'pedro@gmail.com',
        senha: 'pedr',
        endereco:{
          cep: '11111111',
          bairro : 'Bairro tal',
          logradouro : 'Rua tal',
          cidade : 'Sorocaba'
        },
        nivel:1
      },
    ];
  }
  */

  /* Pega todos os usuários existentes local */
  public getAllUsers(): IUser[] {
    return this.users;
  }

  //CADASTRO

  /* Criação de um novo usuário */
  public newUser(newUser: IUser) {
    return this.httpClient.post<IUser>(`${this.API_URL}`, newUser);
  }

  //* Verifica se já existe um usuário com esse email*/
  public checkEmailExists(newUser: IUser): boolean {
    return this.users.some((user) => user.email === newUser.email);
  }

  /* Pega a contagem atual do ID */
  public getCurrentID(): number {
    return this.users.length + 1;
  }
}
