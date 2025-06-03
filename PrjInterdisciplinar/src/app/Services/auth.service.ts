import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IUser } from '../models/interface/IUser.model';
import { UserService } from './user.service';
import { SweetAlertService } from './sweetAlert.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private httpClient : HttpClient, private userService : UserService, private sweetAlertService : SweetAlertService) {}

    private API_URL = 'http://localhost:3000/auth'

    /* Observable para avisar quando um novo usuário é logado */
    private userAtivoSubject = new BehaviorSubject<IUser | null>(null);
    activeUser$: Observable<IUser | null> = this.userAtivoSubject.asObservable();

    // Observable para rastrear se o usuário atual é admin
    private adminSubject = new BehaviorSubject<IUser | null>(null);
    admin$: Observable<IUser | null> = this.adminSubject.asObservable();
    
    autenticate(email : string, senha : string){
        const response = this.httpClient.post<{token : string}>(this.API_URL, {email, senha});

        response.subscribe({
            next: data => {
                const payload : any = jwtDecode(data.token)
                //TODO: Acessar o payload para modificar os valores guardados no localStorage
                this.setStorage(payload.id, data.token)
            },
            error: err => console.log(err)
        })

        return response;
    }
    
    login(id : number){
        this.userService.getUserById(id).subscribe({
            next: user => {
                this.userAtivoSubject.next(user);
                if(user.nivel == 1){
                    this.adminSubject.next(user);
                }
            }
        })
        this.sweetAlertService.showMessage("Login realizado com sucesso");
    }
    
    logout() {
        this.remove("access-token")
        this.remove("user-id-active")
        this.userAtivoSubject.next(null);
        this.adminSubject.next(null);
    }

    setStorage(userId : number, token : string){
        localStorage.setItem('user-id-active', userId.toString())
        localStorage.setItem('access-token', token)
    }

    getStorage(key: 'user-id-active' | 'access-token') : string {
        return localStorage.getItem(key) || ""
    }

    remove(key: 'user-id-active' | 'access-token'){
        localStorage.removeItem(key)
    }

    /* Adquire o IUser atual logado */
    public getCurrentUser(): IUser | null {
        return this.userAtivoSubject.value;
    }
}