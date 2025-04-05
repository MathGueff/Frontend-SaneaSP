import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class SweetAlertService {
  /**
   * 
   * @param message String com a mensagem a ser exibida
   * @param error Boolean para manipulação de ícone de erro/sucesso
   * @param modalElement (opcional) Modal que chamou o alerta
   * @returns Promisse para manipular os eventos de resultado do Alert
   */
  public showMessage(
    message: string, 
    error?: boolean,
    modalElement?: HTMLElement 
  ): Promise<SweetAlertResult> {
    
    // Desativa tabindex do modal Bootstrap se existir
    if (modalElement) {
      modalElement.setAttribute('tabindex', '-1');
    }

    return Swal.fire({
      title: message,
      icon: error ? 'error' : 'success',
      confirmButtonText: 'Ok',
      background: '#295A80',
      color: '#e8e3e3',
      customClass: {
        confirmButton: 'sweet_btn_success',
        title: 'sweet_title',
      },
      willClose: () => {
        // Restaura tabindex quando o SweetAlert fecha
        if (modalElement) {
          modalElement.removeAttribute('tabindex');
          console.log('removeu' + modalElement.tabIndex)
        }
      }
    });
  }
}
