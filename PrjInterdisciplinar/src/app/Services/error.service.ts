import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SweetAlertService } from './sweetAlert.service';
import { SweetAlertResult } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  constructor(private sweetAlertService: SweetAlertService) {}

  handleError(error: unknown): Promise<SweetAlertResult> {
    const message = this.getErrorMessage(error);
    return this.sweetAlertService.showMessage(message, true);
  }

  getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      return error.status === 0
        ? 'Não foi possível conectar ao servidor. Verifique sua conexão.'
        : error.error?.message || 'Erro inesperado ao comunicar com o servidor.';
    }

    if (error instanceof Error) {
      return error.message;
    }

    // Caso seja um erro totalmente fora do padrão (string, number, etc.)
    return 'Ocorreu um erro desconhecido. Tente novamente mais tarde.';
  }
}
