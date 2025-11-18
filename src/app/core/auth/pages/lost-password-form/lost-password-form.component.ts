import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '@shared/services/toast.service';
import { SweetAlertService } from '@shared/services/sweet-alert.service';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-lost-password-form',
  imports: [ReactiveFormsModule],
  templateUrl: './lost-password-form.component.html',
  styleUrls: ['./lost-password-form.component.css', '../../../../features/cidadao/styles/auth-form.style.css']
})
export class LostPasswordFormComponent {
  lostPasswordForm: FormGroup;

  private toastService = inject(ToastService);
  private sweetAlertService = inject(SweetAlertService);
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor(private fb: NonNullableFormBuilder) {
    this.lostPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.lostPasswordForm.invalid) {
      this.toastService.show({
        message: 'Informe um email válido',
        error: true,
      });
      return;
    }
    const email = this.lostPasswordForm.value.email;
    this.authService.lostPassword(email).subscribe({
      next: () => {
        this.sweetAlertService.confirmLostPassword(email);
        this.router.navigate(['/login']);
      }, error: (err) => {
        this.toastService.show({
          message: err.error.message || 'Erro ao solicitar redefinição de senha',
          error: true,
        });
      }
    });
  }
  back() {
    this.router.navigate(['/login']);
  }
}