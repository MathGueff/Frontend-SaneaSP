import { inject, Injectable } from '@angular/core';
import { IStorage } from '@core/models/storage.model';
import { LocalStorageService } from '@core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenStorageService implements IStorage{
  private readonly key : string = 'auth-token'
  private localStorageService = inject(LocalStorageService);

  set(token : string){
    this.localStorageService.set(this.key, token);
  }

  get(){
    return this.localStorageService.get(this.key)
  }

  remove(){
    this.localStorageService.remove(this.key);
  }
}
