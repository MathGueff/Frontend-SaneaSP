import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { IUserCredentials } from '@features/usuario/models/user.model';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm : FormGroup;

  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  constructor(private fb: NonNullableFormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if(this.loginForm.invalid){
      this.toastService.show({
        message : "Informe email e senha para entrar",
        error: true
      })
      return;
    }
    const user : IUserCredentials = this.loginForm.value;
    this.authService.login(user).subscribe({
      next: () => {
        this.router.navigate(['/cidadao']);
      },
    })
  }
}
