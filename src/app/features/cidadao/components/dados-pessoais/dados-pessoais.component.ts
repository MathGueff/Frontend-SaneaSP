import { Component } from '@angular/core';
import { IField } from '@shared/models/field.model';

@Component({
  selector: 'app-dados-pessoais',
  standalone: true,
  imports: [],
  templateUrl: './dados-pessoais.component.html',
  styleUrl: './dados-pessoais.component.css'
})
export class DadosPessoaisComponent {
  accessFields: IField[] = [
    { label: "Email", value: "gueffmatheus@gmail.com" },
    { label: "Senha", value: "********" }
  ];

  idFields: IField[] = [
    { label: "Nome", value: "Matheus Augusto Santos Gueff" },
    { label: "CPF", value: "123.456.789-00" },
    { label: "Telefone", value: "(15) 99261-5827" }
  ];

  addressFields: IField[] = [
    { label: "CEP", value: "18035-100" },
    { label: "Cidade", value: "Sorocaba" },
    { label: "Bairro", value: "Centro" },
    { label: "Rua", value: "Rua do Sol" },
    { label: "Número", value: "123" },
    { label: "Complemento", value: "Apto 45" }
  ];

  profileGroups = [
    {title : "Informações de acesso", modifier : "access", fields : this.accessFields},
    {title : "Informações de identificação", modifier : "identification", fields : this.idFields},
    {title : "Seu endereço", modifier : "address", fields : this.addressFields},
  ]
}
