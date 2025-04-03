import { Component, inject, Input, OnInit } from '@angular/core';
import { ModalType } from '../../models/enums/ModalType.enum';
import { IModalTagInfos } from '../../models/interface/IModalTagInfos';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from "../../Common/form-field/form-field.component";
import { FormValidatorEnum } from '../../models/enums/FormValidatorEnum.enum';

@Component({
  selector: 'app-tag-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormFieldComponent],
  templateUrl: './tag-modal.component.html',
  styleUrl: './tag-modal.component.css'
})
export class TagModalComponent{
  private fb = inject(NonNullableFormBuilder)
  formValidatorsEnum = FormValidatorEnum
  //Binding para o HTML
  modalTypes = ModalType;
  @Input() modalId !: string;
  @Input() modalTypeSelected !: ModalType;

  get ModalInfo(): IModalTagInfos{
    const titles: Record<ModalType, IModalTagInfos> = {
      [ModalType.None]: {title:'Informe o tipo de modal', buttonText:'Tipo faltando'},
      [ModalType.Adicao]:  {title:'Cadastre uma nova tag', buttonText:'Salvar tag'},
      [ModalType.PesquisaEdicao]:  {title:'Pesquise por uma tag para editar', buttonText:'Confirmar'},
      [ModalType.PesquisaExclusao]:  {title:'Pesquise por uma tag para excluir', buttonText:'Excluir'},
      [ModalType.Edicao]:  {title:'Edite a tag', buttonText:'Confirmar edição'},
      [ModalType.Exclusao]:  {title:'Confirmar exclusão', buttonText:'Confirmar'}
    };
    
    return titles[this.modalTypeSelected] || titles[ModalType.None];
  }

  protected formCadastroTag = this.fb.group({
    'nome' : ['', [Validators.required, Validators.minLength(5)]]
  })

  protected formPesquisaTag = this.fb.group({
    'nome' : ['',Validators.required]
  })

  onSubmit(){
    
  }
}