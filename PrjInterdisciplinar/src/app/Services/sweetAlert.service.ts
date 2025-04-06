import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult, SweetAlertOptions } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class SweetAlertService {
  /**
   * Exibe mensagem com SweetAlert2 integrado com modal do Bootstrap
   * @param message Mensagem a ser exibida
   * @param error Se true, exibe ícone de erro
   * @param modalElementRef Referência do modal do bootstrap (opcional - fecha o modal bootstrap aberto para evitar conflito)
   */
  public showMessage(
    message: string, 
    error?: boolean,
    modalElementRef?: HTMLElement
  ) {
    
    if (modalElementRef) {
      //Classe para esconder visualmente mantendo no DOM
      modalElementRef.style.display = 'none'
      modalElementRef.setAttribute('aria-hidden', 'true');
    }

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
      focusConfirm: true,
      allowEscapeKey: true,
      allowEnterKey: true,
      backdrop: true,
      willClose: () => {
        // Restaurar o modal após fechar o SweetAlert
        if (modalElementRef) {
          modalElementRef.style.display = 'block'
          modalElementRef.removeAttribute('aria-hidden');
        }
      }
    };
    Swal.fire(swalConfig);
  }
}