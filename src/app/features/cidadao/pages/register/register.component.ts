
import { Component, inject } from '@angular/core';
import { Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormFieldInputComponent } from '@core/components/forms/form-field-input/form-field-input.component';
import { IFormConfig, IFormFieldInputConfig } from '@core/models/form.model';
import { AuthService } from '@core/services/auth.service';
import { ErrorHandlerService } from '@core/services/error-handler.service';
import { TUserCreate } from '@features/usuario/models/user.model';
import { SweetAlertService } from '@shared/services/sweet-alert.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule, RouterModule, FormFieldInputComponent],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private fb = inject (NonNullableFormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private sweetAlertService = inject(SweetAlertService);
  private router = inject(Router);
  private errorHandlerService = inject(ErrorHandlerService)

  registerForm = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    confirmaSenha: ['', [Validators.required, Validators.minLength(6)]]
  });

  protected formConfig : IFormConfig<IFormFieldInputConfig> = [
    {
      formControlName: 'nome',
      label: {
        text: 'Nome',
        for: 'nome'
      },
      input: {
        id: 'nome',
        placeholder: 'Seu nome',
        type: 'text'
      }
    },
    {
      formControlName: 'email',
      label: {
        text: 'email',
        for: 'email'
      },
      input: {
        id: 'email',
        placeholder: 'seu@email.com',
        type: 'email'
      }
    },
    {
      formControlName: 'senha',
      label: {
        text: 'Senha',
        for: 'senha'
      },
      input: {
        id: 'senha',
        placeholder: 'Sua senha',
        type: 'password'
      }
    },
    {
      formControlName: 'confirmaSenha',
      label: {
        text: 'Confirme sua senha',
        for: 'confirmaSenha'
      },
      input: {
        id: 'confirmaSenha',
        placeholder: 'Confirme sua senha',
        type: 'password'
      }
    }
  ]

  onSubmit() {
    if (this.hasFormErrors()) return;

    const {controls} = this.registerForm;
    const user: TUserCreate = {
      nome : controls.nome.value,
      email : controls.email.value,
      senha : controls.senha.value,
    };

    this.authService.register(user).subscribe({
      next: () => {
        this.sweetAlertService.confirmRegister();
        this.router.navigate(['/inicio']);
      },
      error: (e) => {
        this.errorHandlerService.handleError(e)
      }
    });
  }

  private hasFormErrors(): boolean {
    const { invalid : invalidForm, controls } = this.registerForm;
    const senha = controls['senha'].value;
    const confirmacaoSenha = controls['confirmaSenha'].value;
    const invalidPassword = senha !== confirmacaoSenha

    let message = '';
    if (invalidForm) {
      message = 'Preencha as informações para ter uma conta segura!';
    } else if (invalidPassword) {
      message = 'As senhas precisam ser iguais!';
    }

    const error = invalidForm || invalidPassword;
    if (error) {
      this.toastService.show({ message, error });
    }
    return error;
  }
}
