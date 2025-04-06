import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { ModalType } from '../../models/enums/ModalType.enum';
import { IModalTagInfos } from '../../models/interface/IModalTagInfos';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from "../../Common/form-field/form-field.component";
import { FormValidatorEnum } from '../../models/enums/FormValidatorEnum.enum';
import { TagService } from '../../Services/tag.service';
import { ITag } from '../../models/interface/ITag.model';
import { SweetAlertService } from '../../Services/sweetAlert.service';
import { ISearchFeedback } from '../../models/interface/ISearchFeedback.model';

@Component({
  selector: 'app-tag-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormFieldComponent],
  templateUrl: './tag-modal.component.html',
  styleUrl: './tag-modal.component.css'
})
export class TagModalComponent{
  //INPUTS
  @Input() modalId !: string;
  @Input() modalTypeSelected !: ModalType;

  //INJECTIONS
  private fb = inject(NonNullableFormBuilder)
  private tagService = inject(TagService)
  private sweetAlert = inject(SweetAlertService)

  //ENUMS
  formValidatorsEnum = FormValidatorEnum
  modalTypes = ModalType;

  //VAR
  protected searchFeedback : ISearchFeedback = {
    message : '',
    imagePath : ''
  };
  protected tagPesquisaLista : ITag[] = this.tagService.getTagsList();
  protected tagPesquisaEncontrada : ITag | undefined;

  get ModalInfo(): IModalTagInfos{
    const titles: Record<ModalType, IModalTagInfos> = {
      [ModalType.None]: {title:'Informe o tipo de modal', buttonText:'Tipo faltando'},
      [ModalType.Adicao]:  {title:'Cadastre uma nova tag', buttonText:'Salvar tag'},
      [ModalType.PesquisaEdicao]:  {title:'Pesquise por uma tag para editar', buttonText:'Editar'},
      [ModalType.PesquisaExclusao]:  {title:'Pesquise por uma tag para excluir', buttonText:'Excluir'},
      [ModalType.Edicao]:  {title:'Edite a tag', buttonText:'Confirmar edição'},
      [ModalType.Exclusao]:  {title:'Confirmar exclusão', buttonText:'Confirmar exclusão'}
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

  //HTML ELEMENTS
  @ViewChild('botaoModal2') botaoModal2Ref !: ElementRef
  @ViewChild('modalTagEdicaoExclusao') modalTagEdicaoExclusaoRef = {} as ElementRef 
  @ViewChild('modalTagAdicaoPesquisa') modalTagAdicaoPesquisaRef = {} as ElementRef 

  //FORMS
  protected formCadastroTag = this.fb.group({
    'nomeNovaTag' : ['', [Validators.required, Validators.minLength(2)]]
  })

  protected formPesquisaTag = this.fb.group({
    'nomePesquisaTag' : ['',Validators.required]
  })

  //METHODS
  onSubmit(){
    switch(this.modalTypeSelected){
      case ModalType.Adicao:
        this.onSubmitCreateNewTag()
        break;
      case ModalType.PesquisaEdicao:
        this.onSubmitSearchTag(ModalType.Edicao)
        break;
      case ModalType.PesquisaExclusao:
        this.onSubmitSearchTag(ModalType.Exclusao)
        break;
      case ModalType.Edicao:
        break;
      case ModalType.Exclusao:
        break;
    }
  }

  //Quando o botão de Criar é pressionado
  onSubmitCreateNewTag(){
    if(this.formCadastroTag.valid){
      const newTag : ITag = {
        id : 0,
        nome : this.formCadastroTag.controls.nomeNovaTag.value
      }
      const push = this.tagService.createNewTag(newTag)
      if(!push.error)
        this.formCadastroTag.reset();
      this.sweetAlert.showMessage(push.message, push.error, this.modalTagAdicaoPesquisaRef.nativeElement)
    }
  }

  //Quando o botão de Editar ou Excluir é pressionado
  onSubmitSearchTag(modalType : ModalType){
    if(this.formPesquisaTag.valid){
      if(this.tagPesquisaEncontrada != undefined){
        this.botaoModal2Ref.nativeElement.click()
        this.modalTypeSelected = modalType
        return;
      }
      this.sweetAlert.showMessage('Nenhuma tag foi encontrada com esse nome', true, this.modalTagAdicaoPesquisaRef.nativeElement)
    }
  }

  redefineSearch(){
    this.tagPesquisaLista = this.tagService.getTagsList();
    this.tagPesquisaEncontrada = undefined;
  }
  //Quando uma tag é digitada em um campo nos modais de
  onInputTag(){
    const tagPesquisaInput = this.formPesquisaTag.controls.nomePesquisaTag;
    if(tagPesquisaInput.value.length == 0){
      this.redefineSearch();
      return
    }
    this.tagPesquisaLista = this.tagService.getTagsByName(tagPesquisaInput.value)
    this.findSelectedTag()

    if(this.tagPesquisaLista.length == 0 && this.tagPesquisaEncontrada == undefined && tagPesquisaInput.value.length != 0){
      this.setSearchFeedback(false);
    }
  }

  selectTag(nomeSelecionado : string){
    this.formPesquisaTag.controls.nomePesquisaTag.setValue(nomeSelecionado);
    this.setSelectedTag()
    this.tagPesquisaLista = []
  }

  findSelectedTag(){
    if(this.tagPesquisaLista.length === 1){
      this.setSelectedTag()
    }
    else{
      this.tagPesquisaEncontrada = undefined;
    }
  }

  setSelectedTag(){
    this.tagPesquisaEncontrada = this.tagService.getTagByName(this.formPesquisaTag.controls.nomePesquisaTag.value);
    this.setSearchFeedback(true)
  }

  setSearchFeedback(encontrada : boolean){
    let messageFeedback : string = '';
    let imageFeedback : string = '';
    if(encontrada){
      messageFeedback = 'Tag encontrada!'
      imageFeedback = 'assets/icones/operacoes/icon_black_success.svg'
    }
    else{
      messageFeedback = 'Nenhuma tag encontrada!'
      imageFeedback = 'assets/icones/operacoes/icon_black_error.svg'
    }
    this.searchFeedback = {
      message : messageFeedback,
      imagePath: imageFeedback
    }
  }
}