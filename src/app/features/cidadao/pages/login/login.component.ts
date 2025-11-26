import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormFieldInputComponent } from '@core/components/forms/form-field-input/form-field-input.component';
import { IFormConfig, IFormFieldInputConfig } from '@core/models/form.model';
import { AuthService } from '@core/services/auth.service';
import { UserType } from '@features/usuario/enums/user-type';
import { IUserCredentials } from '@features/usuario/models/user.model';
import { ToastService } from '@shared/services/toast.service';

@Component({
    selector: 'app-login',
    imports: [RouterModule, ReactiveFormsModule, FormFieldInputComponent],
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

  protected formConfig : IFormConfig<IFormFieldInputConfig> = [
    {
      formControlName: 'email',
      label: {
        text: 'Email',
        for: 'email'
      },
      input: {
        id: 'email',
        placeholder: 'seu@email.com',
        type: 'email'
      },
    },
    {
      formControlName: 'senha',
      label: {
        text: 'Senha',
        for: 'senha'
      },
      input: {
        id: 'senha',
        placeholder: 'Sua senha segura',
        type: 'password'
      },
    }
  ]

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
      next: (user) => {
        switch(user.tipo){
          case UserType.Cidadao:
            this.router.navigate(['/inicio'])
            break;
          case UserType.Funcionario:
            this.router.navigate(['/dashboard'])
            break;
        }
      },
    })
  }
}
