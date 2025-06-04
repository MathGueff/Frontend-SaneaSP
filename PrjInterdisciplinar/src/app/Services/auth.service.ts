import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IUser } from '../models/interface/IUser.model';
import { SweetAlertService } from './sweetAlert.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'http://localhost:3000/auth';

  /* Observable para avisar quando um novo usuário é logado */
  private activeUserSubject = new BehaviorSubject<IUser | null>(null);
  activeUser$: Observable<IUser | null> = this.activeUserSubject.asObservable();

  // Observable para rastrear se o usuário atual é admin
  private activeAdminSubject = new BehaviorSubject<IUser | null>(null);
  activeAdmin$: Observable<IUser | null> = this.activeAdminSubject.asObservable();

  constructor( private httpClient: HttpClient,private sweetAlertService: SweetAlertService) 
  {
    if (this.getAuthToken()) {
      this.login().subscribe({
        next: (response) => {
          this.setCurrentUser(response);
        },
        error: (e) => {
          sweetAlertService.showMessage(
            'Não foi possível realizar o login',
            true
          );
        },
      });
    }
  }


  /* Adquire o IUser atual logado */
  public getCurrentUser(): IUser | null {
    return this.activeUserSubject.value;
  }

  /* Define o IUser atual logado */
  public setCurrentUser(user: IUser) {
    this.activeUserSubject.next(user);
    if (user.nivel == 1) this.activeAdminSubject.next(user);
  }


  autenticate(email: string, senha: string) {
    return this.httpClient.post<{ token: string }>(this.API_URL, {
      email,
      senha,
    });
  }

  login() {
    const token = this.getAuthToken();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', token);
    }

    return this.httpClient.get<IUser>(this.API_URL + '/me', { headers });
  }


  logout() {
    localStorage.removeItem('access-token');
    this.activeUserSubject.next(null);
    this.activeAdminSubject.next(null);
    this.sweetAlertService.showMessage('Você se desconectou da sua conta')
  }

  getAuthToken(): string | null {
    //Verificando se localStorage está disponível
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('access-token');
      if (token) return token;
    }
    return null;
  }

}
