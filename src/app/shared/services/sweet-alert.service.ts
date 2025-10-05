import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult, SweetAlertOptions } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class SweetAlertService {
  /**
   *
   * @param swalConfig objeto de configuração para o modal sweetAlert
   * @description exibe um sweetAlert dependendo das configurações passadas
   */
  public showMessage(swalConfig : SweetAlertOptions,){
    Swal.fire(swalConfig);
  }

  public showConfirmationMessage(swalConfig : SweetAlertOptions,): Promise<SweetAlertResult> {
    return Swal.fire(swalConfig);
  }

  public async confirmLogin(){
    const swalConfig: SweetAlertOptions = {
      icon: 'success',
      html: `
        <div class="swal__container flex-column">
          <h1 class="swal__title--h1"> Você entrou na sua conta! </h2>
          <h2 class="swal__title--h2"> Agora você pode: </h2>
          <div class="swal__options flex-row">
            <div class="swal__option flex-column">
              <img class="medium-icon" src="icons/actions/black/add.svg">
              <span class="text-md">Criar uma denúncia</span>
            </div>
            <div class="swal__option flex-column">
              <img class="medium-icon" src="icons/entities/black/complaint.svg">
              <span class="text-md">Ver suas denúncias</span>
            </div>
          </div>
        </div>
      `,
      iconColor: '#295a80',
      background: '#f8f8f8',
      customClass: {
        title : 'sweet-alert__title',
        confirmButton: 'button--primary'
      },
    }

    this.showMessage(swalConfig);
  }
  
  //Função assincrona. Ela retorna uma Promessa, isso quer dizer deve ser usada junto com asyc e await
  public async confirmExclusion(message:string):Promise<SweetAlertResult>{
      const swalConfig : SweetAlertOptions = {
        title: message,
        showConfirmButton: true,
        showDenyButton: true,
        icon:'question',
        background: '#295A80',
        color: '#e8e3e3',
        confirmButtonText: 'Excluir',
        denyButtonText: `Cancelar`,
        reverseButtons: true,
        customClass: {
          denyButton: ['sweet_btn_success','sweet_btn'],
          confirmButton: ['sweet_btn_danger','sweet_btn'],
          title : 'sweet_title',
        },
      };
      return this.showConfirmationMessage(swalConfig);
  }
    public async confirmUpdate(message:string):Promise<SweetAlertResult>{
      const swalConfig : SweetAlertOptions = {
        title: message,
        showConfirmButton: true,
        showDenyButton: true,
        icon:'question',
        background: '#295A80',
        color: '#e8e3e3',
        confirmButtonText: 'Salvar',
        denyButtonText: `Cancelar`,
        reverseButtons: true,
        customClass: {
          confirmButton: 'sweet_btn_success',
          title : 'sweet_title',
        },
      };
    return this.showConfirmationMessage(swalConfig);
  }
}
