import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { IUserCredentials } from '@features/usuario/models/user.model';
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

  constructor(private fb: NonNullableFormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]]
    });
  }

  onSubmit() {
    if(this.loginForm.invalid){
      console.log('Formulário inválido');
      return;
    }
    const user : IUserCredentials = {
      email : this.loginForm.get('email')?.value,
      senha : this.loginForm.get('password')?.value
    };
    this.authService.login(user).subscribe((next) => {
      console.log("Fez login:" + next.name);
    });
  }
}
