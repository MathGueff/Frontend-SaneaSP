import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult, SweetAlertOptions } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class SweetAlertService {
  /**
   * 
   * @param message mensagem a ser mostrada no alert
   * @param error true - ícone de sucesso | false - ícone de erro
   * @returns Promise com o alert (para manipular estados do sweetAlert aberto)
   */
  public showMessage(
    message: string,
    error?: boolean,
  ): Promise<SweetAlertResult> {
    const swalConfig: SweetAlertOptions = {
      title: message,
      icon: error ? 'error' : 'success',
      confirmButtonText: 'Ok',
      background: '#295A80',
      color: '#e8e3e3',
      customClass: {
        confirmButton: 'sweet_btn_success',
        title: 'sweet_title',
      },
    };
    return Swal.fire(swalConfig);
  }
}
