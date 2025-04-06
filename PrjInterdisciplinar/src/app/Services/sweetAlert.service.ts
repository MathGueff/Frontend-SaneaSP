import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult, SweetAlertOptions } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class SweetAlertService {

  public showMessage(
    message: string, 
    error?: boolean,
    modalElementRef?: HTMLElement
  ): Promise<SweetAlertResult> {
    let backdrop: HTMLElement | null = null;

    if (modalElementRef) {
      // Esconde o modal e seu backdrop
      modalElementRef.style.display = 'none';
      modalElementRef.setAttribute('aria-hidden', 'true');
      
      backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.classList.remove('show');
      }
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
        // Restaura o modal quando o SweetAlert fecha
        if (modalElementRef) {
          modalElementRef.style.display = 'block';
          modalElementRef.removeAttribute('aria-hidden');
          
          if (backdrop) {
            backdrop.classList.add('show');
          }
        }
      }
    };

    return Swal.fire(swalConfig);
  }
}