import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { IUser } from '../../models/interface/IUser.model';
import { IEndereco } from '../../models/interface/IEndereco.model';
import { CadastroErrorStatus } from '../../models/enums/CadastroErrorStatus.enum';
import { ViacepService } from '../../Services/viacep.service';
import { IFieldForm } from '../../models/interface/IFieldForm.model';
import { FormFieldComponent } from "../../Common/form-field/form-field.component";
import { FormValidatorEnum } from '../../models/enums/FormValidatorEnum.enum';
import { ToastService } from '../../Services/toast.service';
import { ToastComponent } from '../../Common/toast/toast.component';

@Component({
  selector: 'app-form-cadastro',
  standalone: true,
  imports: [RouterLink, CommonModule, FormFieldComponent, ToastComponent, ReactiveFormsModule],
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.css', '../links-redes.css']
})

export class FormCadastroComponent implements OnInit{
  private formBuilderService = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);
  private viacepService = inject(ViacepService);
  private toastService = inject(ToastService);

  formName : string = "cadastro"; //Nome do formulário para concatenar ao nome do control (email-cadastro)
  passwordMinLength = 6;

  protected formCadastro = this.formBuilderService.group({
    nome : ['',[Validators.required, Validators.minLength(2)]],
    email : ['', [Validators.required, Validators.email]],
    senha : ['', [Validators.required, Validators.minLength(this.passwordMinLength)]],
    confirmaSenha : ['', [Validators.required, Validators.minLength(this.passwordMinLength)]],
    telefone : ['', [Validators.minLength(11), Validators.maxLength(11)]], //Opcional
    cpf: ['',[Validators.minLength(11), Validators.maxLength(11)]],
    cep : ['', [Validators.minLength(8), Validators.maxLength(8)]],  //Opcional
    numero : [''],  //Opcional
    logradouro : [''],  //Opcional
    bairro : [''],  //Opcional
    localidade : [''],  //Opcional
    complemento : ['']
  })

  inputs : IFieldForm[] = [
    {
      controlName:'nome',
      type : 'text',
      icon:'assets/login/usuario_icon.svg',
      label:'Nome:',
      placeholder: 'Nome de usuário',
      required: true,
      validators: [FormValidatorEnum.Required, FormValidatorEnum.MinLength],
    },
    {
      controlName:'email',
      type : 'email',
      icon:'assets/login/email_icon.svg',
      label:'Email:',
      placeholder: 'Email de usuário',
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
    },
    {
      controlName:'confirmaSenha',
      type : 'password',
      icon:'assets/login/senha_icon.svg',
      label:'Confirme sua senha:',
      placeholder: 'Confirmação da senha',
      required: true,
      validators: [FormValidatorEnum.Required, FormValidatorEnum.MinLength]
    },
    {
      controlName:'telefone',
      type : 'tel',
      icon:'assets/login/telefone_icon.svg',
      label:'Telefone:',
      placeholder: 'Telefone para contato',
      required: false,
      validators: [FormValidatorEnum.MaxLength, FormValidatorEnum.MinLength]
    },
    {
      controlName:'cpf',
      type : 'text',
      icon:'assets/login/cpf_icon.svg',
      label:'CPF:',
      placeholder: 'Digite seu CPF',
      required: false,
      validators: [FormValidatorEnum.MaxLength, FormValidatorEnum.MinLength]
    }
  ]

  addressInputs : IFieldForm[] = [
    {
      controlName:'cep',
      type : 'text',
      icon:'assets/login/endereco_icon.svg',
      label:'CEP:',
      placeholder: 'Digite seu CEP',
      required: false,
      validators: [FormValidatorEnum.MaxLength, FormValidatorEnum.MinLength]
    },
    {
      controlName:'logradouro',
      type : 'text',
      icon:'assets/login/endereco_icon.svg',
      label:'Rua:',
      placeholder: 'Digite sua rua',
      required: false,
    },
    {
      controlName:'bairro',
      type : 'text',
      icon:'assets/login/endereco_icon.svg',
      label:'Bairro:',
      placeholder: 'Digite seu bairro',
      required: false,
    },
    {
      controlName:'localidade',
      type : 'text',
      icon:'assets/login/endereco_icon.svg',
      label:'Cidade:',
      placeholder: 'Digite sua cidade',
      required: false,
    },
    {
      controlName:'numero',
      type : 'text',
      icon:'assets/login/endereco_icon.svg',
      label:'Número:',
      placeholder: 'Digite seu número',
      required: false,
    },
    {
      controlName:'complemento',
      type : 'text',
      icon:'assets/login/endereco_icon.svg',
      label:'Complemento:',
      placeholder: 'Digite seu complemento',
      required: false,
    }
  ]

  onSubmit(){
    if(this.formCadastro.valid){  //Caso o formulário seja válido
      let senha = this.formCadastro.controls.senha.value;
      let confirmSenha = this.formCadastro.controls.confirmaSenha.value;

      if(senha === confirmSenha){
        //Interface de endereço para guardar as informações de endereço
        const userAddress : IEndereco = {
          cep : this.formCadastro.controls.cep.value,
          bairro : this.formCadastro.controls.bairro.value,
          logradouro : this.formCadastro.controls.logradouro.value,
          cidade : this.formCadastro.controls.localidade.value,
          numero : this.formCadastro.controls.numero.value,
          complemento : this.formCadastro.controls.complemento.value
        }

        //Interface de usuário para guardar as informações do usuário e passar para o userService
        const newUser : IUser = {
          id: this.userService.getCurrentID(),
          nome : this.formCadastro.controls.nome.value,
          email : this.formCadastro.controls.email.value,
          senha : this.formCadastro.controls.senha.value,
          endereco : userAddress,
          telefone : this.formCadastro.controls.telefone.value,
          cpf : this.formCadastro.controls.cpf.value,
          nivel: 0  //Nivel default
        }

        //Chamando função para verificar se usuário já existe com base no email
        if(!this.userService.checkEmailExists(newUser)){
          //Caso não haja usuário, cadastra um novo com os dados preenchidos
          this.userService.newUser(newUser);
          //Retorna à pagina de login para que o usuário possa logar
          this.router.navigate(['/login']);
        }
        else {
          //Informa erro de usuário existente
          this.toastService.show({
            message : 'Esse email já está sendo usado no sistema',
            error : true
          })
        }
      }
      else{
        //Informa erro de senhas não coincidentes
        this.toastService.show({
          message : 'As senhas não coincidem',
          error : true
        })
      }
    }
    else{
      //Informa erro de campos inválidos
      this.toastService.show({
        message : 'Campos obrigatórios não preenchidos',
        error : true
      })
    }
  }

  ngOnInit() {
    //VIACEP
    this.formCadastro.controls.cep.valueChanges.subscribe(() => {
      if(this.formCadastro.controls.cep.valid && this.formCadastro.controls.cep.value.length == 8){
        this.searchAddress();
      }
      else{
        this.resetAddressControls();
      }
    });
  }

  searchAddress(){
      this.viacepService.getAddress(this.formCadastro.controls.cep.value).subscribe({
        next: (response) => {
          if (response.logradouro) {
            this.setAddressControl('logradouro', response.logradouro);
          } else {
            console.log("O logradouro não foi encontrado para o CEP informado.");
          }

          if (response.bairro) {
            this.setAddressControl('bairro', response.bairro);
          } else {
            console.log("O bairro não foi encontrado para o CEP informado.");
          }

          if (response.localidade) {
            this.setAddressControl('localidade', response.localidade);
          } else {
            console.log("A cidade não foi encontrada para o CEP informado.");
          }

        },
        error: (e) =>  {
          console.log(e);
        }
      })
  }

  resetAddressControls() {
    let addressControls = ['logradouro', 'bairro', 'localidade'];
    addressControls.forEach((field) => {
      this.formCadastro.get(field)!.reset();
    });
  }

  private setAddressControl(control : string, value : string){
    this.formCadastro.get(control)?.setValue(value)
  }
}
