import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
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

  constructor(private fb: NonNullableFormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.min(6)]]
    });
  }

  onSubmit() {
    if(this.loginForm.invalid){
      this.toastService.show({
        message : "Preencha o formulário corretamente",
        error: true
      })
      return;
    }
    const user : IUserCredentials = this.loginForm.value;
    this.authService.login(user).subscribe((next) => {
    });
  }
}
