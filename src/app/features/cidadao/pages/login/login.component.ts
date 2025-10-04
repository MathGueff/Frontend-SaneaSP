import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormFieldComponent } from "@shared/components/form-field/form-field.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormFieldComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../../shared/styles/form.style.css']
})
export class LoginComponent {
  loginForm : FormGroup;

  constructor(private fb: NonNullableFormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.min(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      console.log('Formulário inválido');
    }
  }
}
