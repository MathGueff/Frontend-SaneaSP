import { Injectable } from '@angular/core';
import { IResponse } from '../models/interface/IResponse.model';
import { IToast } from '../models/interface/IToast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: IToast[] = [];
  private readonly MAX_TOASTS =3
  private readonly DURATION_TOAST = 3000 //Em ms

  show(response : IResponse) {
    const image = response.error ? "icon_error.svg" : "icon_success.svg"
    const iconUrl = `assets/icones/operacoes/color/${image}`;
    const toast = {
      id : Date.now(), //Para evitar IDs repetidos
      ...response,
      iconUrl
    }
    if(this.toasts.length >= this.MAX_TOASTS){
      this.remove(this.toasts[0])
    }
    this.toasts.push(toast);
    setTimeout(() => this.remove(toast), this.DURATION_TOAST);
  }

  remove(toast: IToast) {
    this.toasts = this.toasts.filter(t => t.id !== toast.id);
  }

  removeOldest(){
    const oldest = this.toasts.reduce((prev, current) => (prev.id < current.id) ? prev : current)
    this.remove(oldest);
  }
}