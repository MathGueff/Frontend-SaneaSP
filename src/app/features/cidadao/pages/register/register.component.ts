
import { Component, inject } from '@angular/core';
import { Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ErrorHandlerService } from '@core/services/error-handler.service';
import { ICreateUser, IUser } from '@features/usuario/models/user.model';
import { SweetAlertService } from '@shared/services/sweet-alert.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule, RouterModule],
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
    confirmacao_senha: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.hasFormErrors()) return;

    const {controls} = this.registerForm;
    const user: ICreateUser = {
      nome : controls.nome.value,
      email : controls.email.value,
      senha : controls.senha.value
    };

    this.authService.register(user).subscribe({
      next: () => {
        this.sweetAlertService.confirmRegister();
        this.router.navigate(['/cidadao']);
      },
      error: (e) => {
        this.errorHandlerService.handleError(e)
      }
    });
  }

  private hasFormErrors(): boolean {
    const { invalid : invalidForm, controls } = this.registerForm;
    const senha = controls['senha'].value;
    const confirmacaoSenha = controls['confirmacao_senha'].value;
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
