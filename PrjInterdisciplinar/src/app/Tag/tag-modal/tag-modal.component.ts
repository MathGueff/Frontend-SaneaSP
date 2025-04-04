import { Component, inject, Input, OnInit } from '@angular/core';
import { ModalType } from '../../models/enums/ModalType.enum';
import { IModalTagInfos } from '../../models/interface/IModalTagInfos';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from "../../Common/form-field/form-field.component";
import { FormValidatorEnum } from '../../models/enums/FormValidatorEnum.enum';
import { TagService } from '../../Services/tag.service';
import { ITag } from '../../models/interface/ITag.model';
import { SweetAlertService } from '../../Services/sweetAlert.service';

@Component({
  selector: 'app-tag-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormFieldComponent],
  templateUrl: './tag-modal.component.html',
  styleUrl: './tag-modal.component.css'
})
export class TagModalComponent{
  private fb = inject(NonNullableFormBuilder)
  private tagService = inject(TagService)
  private sweetAlert = inject(SweetAlertService)
  formValidatorsEnum = FormValidatorEnum
  //Binding para o HTML
  modalTypes = ModalType;
  @Input() modalId !: string;
  @Input() modalTypeSelected !: ModalType;
  protected tagPesquisaLista : ITag[] = [];

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

  get FormGroupSelected(){
    const formGroups: Record<ModalType, FormGroup> | undefined = {
      [ModalType.None]: this.formCadastroTag,
      [ModalType.Adicao]:  this.formCadastroTag,
      [ModalType.PesquisaEdicao]:  this.formPesquisaTag,
      [ModalType.PesquisaExclusao]:  this.formPesquisaTag,
      [ModalType.Edicao]: this.formCadastroTag,
      [ModalType.Exclusao]:  this.formCadastroTag
    };
    
    return formGroups[this.modalTypeSelected] || formGroups[ModalType.None];
  }

  protected formCadastroTag = this.fb.group({
    'nomeNovaTag' : ['', [Validators.required, Validators.minLength(5)]]
  })

  protected formPesquisaTag = this.fb.group({
    'nomePesquisaTag' : ['',Validators.required]
  })

  onSubmit(){
    switch(this.modalTypeSelected){
      case ModalType.Adicao:
        if(this.formCadastroTag.valid){
          const newTag : ITag = {
            id : 0,
            nome : this.formCadastroTag.controls.nomeNovaTag.value
          }
          const push = this.tagService.createNewTag(newTag)
          if(!push.error)
            this.formCadastroTag.reset();
          this.sweetAlert.showMessage(push.message, push.error)
        }
        break
      case ModalType.PesquisaEdicao:
        break
      case ModalType.PesquisaExclusao:
        break
      case ModalType.Edicao:
        break
      case ModalType.Exclusao:
        break
    }
  }

  onSearchTag(){
    const tagPesquisa = this.formPesquisaTag.controls.nomePesquisaTag;
    if(tagPesquisa.valid){
      if(this.tagService.getTagByName(tagPesquisa.value)){
        this.tagPesquisaLista = []
        return
      }
      this.tagPesquisaLista = this.tagService.getTagsByName(this.formPesquisaTag.controls.nomePesquisaTag.value)
    }
    else{
      this.tagPesquisaLista = []
    }
  }

  selectTag(nomeSelecionado : string){
    this.formPesquisaTag.controls.nomePesquisaTag.setValue(nomeSelecionado);
    this.tagPesquisaLista = []
  }
}