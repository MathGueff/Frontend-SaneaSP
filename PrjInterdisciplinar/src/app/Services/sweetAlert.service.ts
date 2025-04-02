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
  //Função assincrona. Ela retorna uma Promessa, isso quer dizer deve ser usada junto com asyc e await
  public async confirmExclusion(message:string):Promise<boolean>{
      const  result = await Swal.fire({
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
    });
    return result.isConfirmed;
  }
}
