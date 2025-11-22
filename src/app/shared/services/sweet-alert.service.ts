import { Injectable } from '@angular/core';
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
   * Exibe um SweetAlert com as configurações fornecidas.
   */
  private showMessage(config: SweetAlertOptions): Promise<SweetAlertResult> {
    return Swal.fire({ ...this.defaultConfig, ...config } as SweetAlertOptions);
  }

  /**
   * Exibe um SweetAlert de confirmação.
   */
  private showConfirmationMessage(config: SweetAlertOptions): Promise<SweetAlertResult> {
    return Swal.fire({ ...this.defaultConfig, ...config } as SweetAlertOptions);
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
    return this.showMessage(this.buildConfig({
      icon: 'success',
      html: `
        <div class="swal__container flex-column">
          <h1 class="swal__title--h1">Você criou sua conta!</h1>
          <h2 class="swal__title--h2">Verifique seu email para confirmar sua identidade</h2>
        </div>
      `
    }));
  }

  /**
   * Exibe mensagem de confirmação de login.
   */
  public confirmLogin(title : string): Promise<SweetAlertResult> {
    return this.showMessage(this.buildConfig({
      icon: 'success',
      html: `
        <div class="swal__container flex-column">
          <h1 class="swal__title--h1">${title}</h1>
          <h2 class="swal__title--h2">Agora você pode:</h2>
          <div class="swal__options flex-row">
            <div class="swal__option flex-column">
              <img class="medium-icon" src="icons/actions/black/add.svg" alt="Criar denúncia">
              <span class="text-md">Criar uma denúncia</span>
            </div>
            <div class="swal__option flex-column">
              <img class="medium-icon" src="icons/entities/black/complaint.svg" alt="Ver denúncias">
              <span class="text-md">Ver suas denúncias</span>
            </div>
          </div>
        </div>
      `
    }));
  }

   public confirmPayment(): Promise<SweetAlertResult> {
    return this.showMessage(this.buildConfig({
      icon: 'success',
      html: `
        <div class="swal__container flex-column">
          <h1 class="swal__title--h1">Pagamento realizado com sucesso</h1>
          <h2 class="swal__title--h2">A sua conta agora possui acesso aos recursos de administração:</h2>
        </div>
      `
    }));
  }

  /**
   * Exibe mensagem de confirmação de cadastro.
   */
  public logout(): Promise<SweetAlertResult> {
    return this.showMessage(this.buildConfig({
      icon: 'success',
      html: `
        <div class="swal__container flex-column">
          <h1 class="swal__title--h1">Você saiu da sua conta</h1>
          <h2 class="swal__title--h2">Tudo bem, nós entendemos, vá tomar um ar</h2>
        </div>
      `
    }));
  }

  /**
   * Exibe confirmação para exclusão.
   */
  public confirmExclusion(message: string): Promise<SweetAlertResult> {
    return this.showConfirmationMessage(this.buildConfig({
      title: message,
      showConfirmButton: true,
      showDenyButton: true,
      icon: 'question',
      background: '#295A80',
      color: '#e8e3e3',
      confirmButtonText: 'Excluir',
      denyButtonText: 'Cancelar',
      reverseButtons: true,
      customClass: {
        denyButton: ['sweet_btn_success', 'sweet_btn'],
        confirmButton: ['sweet_btn_danger', 'sweet_btn'],
        title: 'sweet_title'
      }
    }));
  }

  /**
   * Exibe confirmação para atualização.
   */
  public confirmUpdate(message: string): Promise<SweetAlertResult> {
    return this.showConfirmationMessage(this.buildConfig({
      title: message,
      showConfirmButton: true,
      showDenyButton: true,
      icon: 'question',
      background: '#295A80',
      color: '#e8e3e3',
      confirmButtonText: 'Salvar',
      denyButtonText: 'Cancelar',
      reverseButtons: true,
      customClass: {
        confirmButton: 'sweet_btn_success',
        title: 'sweet_title'
      }
    }));
  }

  /**
   * Exibe esqueci minha senha
   */
  public confirmLostPassword(message: string): Promise<SweetAlertResult> {
    return this.showConfirmationMessage(
      this.buildConfig({
        icon: "info",
        html: `
        <div class="swal__container flex-column">
          <h1 class="swal__title--h1">Instruções enviadas!</h1>
          <h2 class="swal__title--h2">Enviamos um email com as instruções para recuperação de senha para ${message}</h2>
        </div>
      `,
      }),
    );
  }

  public confirmResetPassword(): Promise<SweetAlertResult> {
    return this.showConfirmationMessage(
      this.buildConfig({
        icon: "success",
        html: `
        <div class="swal__container flex-column">
          <h1 class="swal__title--h1">Senha alterada com sucesso!</h1>
        </div>
      `,
      }),
    );
  }
  public showEvent(info:any){
    console.log(info)
  }
}
