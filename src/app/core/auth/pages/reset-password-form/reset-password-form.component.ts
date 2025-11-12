import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ToastService } from '@shared/services/toast.service';
import { SweetAlertService } from '@shared/services/sweet-alert.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ErrorHandlerService } from '@core/services/error-handler.service';

@Component({
  selector: 'app-reset-password-form',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password-form.component.html',
  styleUrl: './reset-password-form.component.css',
})
export class ResetPasswordFormComponent {
  resetPasswordForm: FormGroup;

  private toastService = inject(ToastService);
  private sweetAlertService = inject(SweetAlertService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private errorHandlerService = inject(ErrorHandlerService);

  constructor(private fb: NonNullableFormBuilder) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    const token = this.token;
    if (!token) {
      this.toastService.show({
        message: "Você não pode acessar essa página sem um link de redefinição de senha.",
        error: true
      })
      this.router.navigate(["/cidadao/login"]);
      return;
    } else {
      return;
    }
  }

  get token() {
    return this.route.snapshot.queryParamMap.get('token');
  }

  onSubmit() {
    if (this.hasFormErrors()) {
      return; // ← Impede a execução se o formulário for inválido
    }

    const token = this.token;
    const newPassword = this.resetPasswordForm.value.password;

    if (!token || !newPassword) {
      this.toastService.show({
        message: "Erro ao redefinir senha. Link inválido ou senha ausente.",
        error: true,
      });
      return;
    }

    this.authService.resetPassword(token, newPassword).subscribe({
      next: () => {
        this.sweetAlertService.confirmResetPassword();
        this.router.navigate(["/cidadao/login"]);
      },
      error: (e) => {
        this.errorHandlerService.handleError(e);
      },
    });
  }

  private hasFormErrors(): boolean {
  const { invalid: invalidForm } = this.resetPasswordForm;
  const senha = this.resetPasswordForm.get('password')?.value;
  const confirmacaoSenha = this.resetPasswordForm.get('confirmPassword')?.value;
  const invalidPassword = senha !== confirmacaoSenha;

  let message = "";
  if (!senha || !confirmacaoSenha) {
    this.toastService.show({ message: "Preencha ambos os campos de senha.", error: true });
    return true;
  }
  if (invalidPassword) {
    message = "As senhas precisam ser iguais!";
  }

  const error = invalidForm || invalidPassword;
  if (error) {
    this.toastService.show({ message, error: true });
  }

  return error;
}
}