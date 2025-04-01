import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class SweetAlertService {
  public showMessage(message: string) {
    Swal.fire({
      title: message,
      icon: 'success',
      confirmButtonText: 'Ok',
      background: '#295A80',
      color: '#e8e3e3',
      customClass: {
        confirmButton: 'sweet_btn_success',
        title : 'sweet_title',
      },
    });
  }
  public confirmExclusion(message:string):boolean{
    let confirm : boolean = false;
      Swal.fire({
      title: message,
      showConfirmButton: true,
      showDenyButton: true,
      icon:'question',
      background: '#295A80',
      color: '#e8e3e3',
      confirmButtonText: 'Excluir',
      denyButtonText: `Cancelar`,
      customClass: {
        confirmButton: 'sweet_btn_success',
        title : 'sweet_title',
      },
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        confirm = true;
      } else if (result.isDenied) {
        confirm = false;
      }
    });
    return confirm;
  }
}
