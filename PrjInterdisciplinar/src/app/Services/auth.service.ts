import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../models/interface/IUser.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private httpClient : HttpClient) {}
    private API_URL = 'http://localhost:3000/auth'
    
    autenticate(email : string, senha : string){
        const response = this.httpClient.post<string>(this.API_URL, {email, senha});

        response.subscribe({
            next: token => {
                //TODO: Acessar o payload para modificar os valores guardados no localStorage
                this.setStorage(3,'Matheus Gueff',token)
            },
            error: err => console.log(err)
        })

        return response;
    }

    setStorage(userId : number, username : string, token : string){
        localStorage.setItem('username-active', username)
        localStorage.setItem('user-id-active', userId.toString())
        localStorage.setItem('access-token', token)
    }

    getStorage(key: 'username-active' | 'user-id-active' | 'access-token') {
        return localStorage.getItem(key)
    }

    remove(key: string){
        localStorage.removeItem(key)
    }
}