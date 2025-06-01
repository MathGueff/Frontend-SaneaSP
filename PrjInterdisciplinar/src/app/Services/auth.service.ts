import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/interface/IUser.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private httpClient : HttpClient) {}
    private API_URL = 'http://localhost:3000/auth'
    
    autenticate(email : string, senha : string){
        const response = this.httpClient.post<string>(this.API_URL, {email, senha});

        response.subscribe({
            next: token => {
                console.log('Gerou token:' + token)
                this.set(2,"Matheus Gueff",token)
            },
            error: err => console.log(err)
        })
    }

    set(userId : number, username : string, token : string){
        localStorage.setItem('username-active', username)
        localStorage.setItem('user-id-active', userId.toString())
        localStorage.setItem('access-token', token)
    }

    get(key: 'username-active' | 'user-id-active' | 'access-token') {
        return localStorage.getItem(key)
    }

    remove(key: string){
        localStorage.removeItem(key)
    }
}