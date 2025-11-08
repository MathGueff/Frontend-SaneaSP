import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastService } from "@shared/services/toast.service";

@Injectable({ providedIn: "root" })
export class ErrorHandlerService {
  constructor(private toastService: ToastService) {}

  handleError(error: Error) {
    const message = this.getErrorMessage(error);
    this.toastService.show({ message, error: true });
  }

  getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      return error.status === 0
        ? "Não foi possível conectar ao servidor. Verifique sua conexão."
        : error.error?.message ||
            "Erro inesperado ao comunicar com o servidor.";
    }

    if (error instanceof Error) {
      return error.message;
    }

    // Caso seja um erro totalmente fora do padrão (string, number, etc.)
    return "Ocorreu um erro desconhecido. Tente novamente mais tarde.";
  }
}
