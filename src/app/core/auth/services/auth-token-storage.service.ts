import { inject, Injectable } from '@angular/core';
import { LocalStorageToken } from '../tokens/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenStorageService {
  private readonly key : string = 'auth-token'

  private localStorageToken = inject(LocalStorageToken)

  set(token : string){
    this.localStorageToken.setItem(this.key, token);
  }

  get(){
    this.localStorageToken.getItem(this.key)
  }
}
