import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal, { SweetAlertResult, SweetAlertOptions } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class SweetAlertService {
  private readonly defaultConfig: Partial<SweetAlertOptions> = {
    iconColor: '#295a80',
    background: '#f8f8f8',
    customClass: {
      title: 'sweet-alert__title',
      confirmButton: 'button button--primary'
    }
  };


  /**
   * Exibe uma mensagem de sucesso genérica ou customizada.
   */
  public showSuccess(options: {
    title?: string,
    description?: string,
    html?: string,
    confirmButtonText?: string
  } = {}): Promise<SweetAlertResult> {
    const { title = 'Sucesso!', description = '', html, confirmButtonText = 'OK' } = options;
    return Swal.fire({
      ...this.defaultConfig,
      icon: 'success',
      title,
      html: html ?? `<div class="swal__container flex-column">
        <h1 class="swal__title--h1">${title}</h1>
        ${description ? `<h2 class='swal__title--h2'>${description}</h2>` : ''}
      </div>`,
      confirmButtonText
    } as SweetAlertOptions);
  }

  /**
   * Exibe uma mensagem de erro genérica ou customizada.
   */
  public showError(options: {
    title?: string,
    description?: string,
    html?: string,
    confirmButtonText?: string
  } = {}): Promise<SweetAlertResult> {
    const { title = 'Erro!', description = '', html, confirmButtonText = 'OK' } = options;
    return Swal.fire({
      ...this.defaultConfig,
      icon: 'error',
      title,
      html: html ?? `<div class="swal__container flex-column">
        <h1 class="swal__title--h1">${title}</h1>
        ${description ? `<h2 class='swal__title--h2'>${description}</h2>` : ''}
      </div>`,
      confirmButtonText
    } as SweetAlertOptions);
  }

  /**
   * Gera configuração para mensagem customizada.
   */
  private buildConfig(options: Partial<SweetAlertOptions>): SweetAlertOptions {
    return { ...this.defaultConfig, ...options } as SweetAlertOptions;
  }

  /**
   * Exibe mensagem de confirmação de cadastro.
   */
  public confirmRegister(): Promise<SweetAlertResult> {
    return this.showSuccess({
      html: `<div class="swal__container flex-column">
        <h1 class="swal__title--h1">Você criou sua conta!</h1>
        <h2 class="swal__title--h2">Verifique seu email para confirmar sua identidade</h2>
      </div>`
    });
  }

  /**
   * Exibe mensagem de confirmação de login.
   */
  constructor(private router: Router) {}

  public confirmLogin(title: string): Promise<SweetAlertResult> {
    setTimeout(() => {
      const addBtn = document.getElementById('swal-new-complaint');
      if (addBtn) {
        addBtn.onclick = () => {
          Swal.close();
          this.router.navigate(['/cidadao/new-complaint']);
        };
      }
      const complaintsBtn = document.getElementById('swal-complaints');
      if (complaintsBtn) {
        complaintsBtn.onclick = () => {
          Swal.close();
          this.router.navigate(['/cidadao/complaints']);
        };
      }
    }, 0);
    return this.showSuccess({
      html: `<div class="swal__container flex-column">
        <h1 class="swal__title--h1">${title}</h1>
        <h2 class="swal__title--h2">Agora você pode:</h2>
        <div class="swal__options flex-row">
          <div class="swal__option flex-column" id="swal-new-complaint" style="cursor:pointer;">
            <img class="medium-icon" src="icons/actions/black/add.svg" alt="Criar denúncia">
            <span class="text-md">Criar uma denúncia</span>
          </div>
          <div class="swal__option flex-column" id="swal-complaints" style="cursor:pointer;">
            <img class="medium-icon" src="icons/entities/black/complaint.svg" alt="Ver denúncias">
            <span class="text-md">Ver suas denúncias</span>
          </div>
        </div>
      </div>`
    });
  }

  public confirmPayment(): Promise<SweetAlertResult> {
    return this.showSuccess({
      html: `<div class="swal__container flex-column">
        <h1 class="swal__title--h1">Pagamento realizado com sucesso</h1>
        <h2 class="swal__title--h2">A sua conta agora possui acesso aos recursos de administração:</h2>
      </div>`
    });
  }

  public confirmExport(): Promise<SweetAlertResult> {
    return this.showSuccess({
      html: `<div class="swal__container flex-column">
        <h1 class="swal__title--h1">O documento Excel foi exportado com sucesso</h1>
        <h2 class="swal__title--h2">Acesse a pasta de downloads para visualizar o arquivo exportado</h2>
      </div>`
    });
  }

  /**
   * Exibe mensagem de confirmação de logout.
   */
  public logout(): Promise<SweetAlertResult> {
    return this.showSuccess({
      html: `<div class="swal__container flex-column">
        <h1 class="swal__title--h1">Você saiu da sua conta</h1>
        <h2 class="swal__title--h2">Para entrar novamente, faça o login</h2>
      </div>`
    });
  }

  /**
   * Exibe confirmação para exclusão.
   */
  public confirmExclusion(message: string): Promise<SweetAlertResult> {
    return this.showConfirmation({
      title: message,
      confirmButtonText: 'Excluir',
      denyButtonText: 'Cancelar',
      icon: 'question',
      // Customização extra se necessário
    });
  }

  /**
   * Exibe confirmação para atualização.
   */
  public confirmUpdate(message: string): Promise<SweetAlertResult> {
    return this.showConfirmation({
      title: message,
      confirmButtonText: 'Salvar',
      denyButtonText: 'Cancelar',
      icon: 'question',
      // Customização extra se necessário
    });
  }

  /**
   * Exibe mensagem de sucesso para Feedback.
   */
  public feedbackSuccess(message: string): Promise<SweetAlertResult> {
    return this.showSuccess({ title: message });
  }

  /**
   * Exibe esqueci minha senha
   */
  public confirmLostPassword(message: string): Promise<SweetAlertResult> {
    return this.showConfirmation({
      icon: 'info',
      html: `<div class="swal__container flex-column">
        <h1 class="swal__title--h1">Instruções enviadas!</h1>
        <h2 class="swal__title--h2">Enviamos um email com as instruções para recuperação de senha para ${message}</h2>
      </div>`,
      confirmButtonText: 'OK',
      denyButtonText: 'Cancelar'
    });
  }

  public confirmResetPassword(): Promise<SweetAlertResult> {
    return this.showConfirmation({
      icon: 'success',
      html: `<div class="swal__container flex-column">
        <h1 class="swal__title--h1">Senha alterada com sucesso!</h1>
      </div>`,
      confirmButtonText: 'OK',
      denyButtonText: 'Cancelar'
    });
  }
  public showEvent(info:any){
    console.log(info)
  }

    /**
   * Exibe uma mensagem de confirmação genérica ou customizada.
   */
  public showConfirmation(options: {
    title?: string,
    description?: string,
    html?: string,
    confirmButtonText?: string,
    denyButtonText?: string,
    icon?: SweetAlertOptions['icon']
  } = {}): Promise<SweetAlertResult> {
    const {
      title = 'Confirmação',
      description = '',
      html,
      confirmButtonText = 'Confirmar',
      denyButtonText = 'Cancelar',
      icon = 'question'
    } = options;
    return Swal.fire({
      ...this.defaultConfig,
      icon,
      title,
      html: html ?? `<div class="swal__container flex-column">
        <h1 class="swal__title--h1">${title}</h1>
        ${description ? `<h2 class='swal__title--h2'>${description}</h2>` : ''}
      </div>`,
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText,
      denyButtonText,
      reverseButtons: true
    } as SweetAlertOptions);
  }
}
