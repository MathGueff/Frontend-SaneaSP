import { Injectable } from '@angular/core';
import { IResponse } from '../models/interface/IResponse.model';
import { IToast } from '../models/interface/IToast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: IToast[] = [];
  private readonly MAX_TOASTS =3
  private readonly DURATION_TOAST = 3000 //Em ms

  /** 
   * @param response mensagem e erro (true ou false), pode ser passado com um retorno de uma chamada de service
  */
  show(response : IResponse) {
    const image = response.error ? "error_icon.svg" : "success_icon.svg"
    const iconUrl = `assets/icones/operacoes/color/${image}`;
    const toast = {
      id : Date.now(), //Para evitar IDs repetidos, utilizando a data de criação 
      ...response,
      iconUrl
    }
    //Evita que muitos toast se acumulem na tela, remove o toast mais antigo para criação do novo
    if(this.toasts.length >= this.MAX_TOASTS){
      this.remove(this.toasts[0])
    }
    this.toasts.push(toast);
    //Após o DURATION_TOAST passar, remove esse toast
    setTimeout(() => this.remove(toast), this.DURATION_TOAST);
  }

  //Reinicia a lista ignorando o id do toast passado
  remove(toast: IToast) {
    this.toasts = this.toasts.filter(t => t.id !== toast.id);
  }

  removeOldest(){
    const oldest = this.toasts.reduce((prev, current) => (prev.id < current.id) ? prev : current)
    this.remove(oldest);
  }
}