import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { IFieldForm } from '../../models/interface/IFieldForm.model';
import { FormFieldComponent } from "../../Common/form-field/form-field.component";
import { FormValidatorEnum } from '../../models/enums/FormValidatorEnum.enum';
import { ToastService } from '../../Services/toast.service';
import { ToastComponent } from '../../Common/toast/toast.component';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormFieldComponent, ToastComponent],
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css', '../links-redes.css']
})

export class FormLoginComponent{
  formName : string = "login";
  /* Injeção de Dependências */
  private formBuilderService = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private userService = inject(UserService)
  private authService = inject(AuthService)
  private toastService = inject(ToastService)

  @ViewChild('formFeedback') formFeedback !: ElementRef;
  
  /* Reactive Form */
  protected formLogin = this.formBuilderService.group({
    email : ['', [Validators.required, Validators.email]],
    senha : ['', [Validators.required, Validators.minLength(4)]]
  })
  
  inputs : IFieldForm[] = [
    { 
      controlName:'email', 
      type : 'email',
      icon:'assets/login/email_icon.svg', 
      label:'Email:', 
      placeholder: 'Email de login', 
      required: true, 
      validators: [FormValidatorEnum.Required, FormValidatorEnum.Email]
    },
    { 
      controlName:'senha', 
      type : 'password',
      icon:'assets/login/senha_icon.svg', 
      label:'Senha:', 
      placeholder: 'Senha de login', 
      required: true, 
      validators: [FormValidatorEnum.Required, FormValidatorEnum.MinLength]
    }
  ]

  /* Método chamado com o btn submit */
  onSubmit(){
    if(this.formLogin.valid){  //Caso o formulário seja válido
      let email = this.formLogin.controls.email.value;
      let senha = this.formLogin.controls.senha.value;
      //Chamando função para verificar usuário      
      this.login(email, senha);
    }
    else{
      this.toastService.show({
        message : 'Todos os campos obrigatórios devem ser preenchidos',
        error: true
      })
    }
  }

  /* Verificação de login */
  login(email : string, senha : string){
    const autenticate = this.authService.autenticate(email, senha);

    autenticate.subscribe({
      next: response => {
        /* Navega para a pagina principal */
        this.authService.login(Number(this.authService.getStorage("user-id-active")))
        this.router.navigate(['pagina-admin']);
      },
      error: e => {
        /* Usuário inexistente */
        this.toastService.show({
          message : e.error.message,
          error: true
        })
      }
    })
    
  }
}
