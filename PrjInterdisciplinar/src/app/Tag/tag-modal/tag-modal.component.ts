import { AfterViewInit, Component, ElementRef, HostListener, inject, Input, ViewChild, ViewChildren } from '@angular/core';
import { ModalType } from '../../models/enums/ModalType.enum';
import { IModalTagInfos } from '../../models/interface/IModalTagInfos';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../../Common/form-field/form-field.component';
import { FormValidatorEnum } from '../../models/enums/FormValidatorEnum.enum';
import { TagService } from '../../Services/tag.service';
import { ITag } from '../../models/interface/ITag.model';
import { SweetAlertService } from '../../Services/sweetAlert.service';
import { ISearchFeedback } from '../../models/interface/ISearchFeedback.model';
import { IResponse } from '../../models/interface/IResponse.model';

@Component({
  selector: 'app-tag-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormFieldComponent],
  templateUrl: './tag-modal.component.html',
  styleUrl: './tag-modal.component.css',
})
export class TagModalComponent {
  // === INPUTS ==============================
  @Input() modalId!: string;
  @Input() modalTypeSelected!: ModalType;

  // === INJECTIONS  ==============================
  private fb = inject(NonNullableFormBuilder);
  private tagService = inject(TagService);
  private sweetAlert = inject(SweetAlertService);

  //=== FORMS  ==============================
  protected formCadastroTag = this.fb.group({
    nomeNovaTag: ['', [Validators.required, Validators.minLength(2)]],
  });

  protected formPesquisaTag = this.fb.group({
    nomePesquisaTag: ['', Validators.required],
  });

  protected formEditTag = this.fb.group({
    nomeEditTag: ['', Validators.required],
  });

  // === ENUMS  ==============================
  formValidatorsEnum = FormValidatorEnum;
  modalTypes = ModalType;

  //=== STATE VARIABLES  ==============================
  protected searchFeedback: ISearchFeedback = {
    message: '',
    imagePath: '',
  };
  protected tagList: ITag[] = this.tagService.getTagsList();
  protected tagFound: ITag | undefined;

  // === GETTERS  ==============================
  get ModalInfo(): IModalTagInfos {
    const modalInfoMap: Record<ModalType, IModalTagInfos> = {
      [ModalType.None]: {
        title: 'Informe o tipo de modal',
        buttonText: 'Tipo faltando',
      },
      [ModalType.Adicao]: {
        title: 'Cadastre uma nova tag',
        buttonText: 'Salvar tag',
      },
      [ModalType.Edicao]: {
        title: 'Edite a tag',
        buttonText: 'Confirmar edição',
      },
      [ModalType.Exclusao]: {
        title: 'Excluir a tag',
        buttonText: 'Excluir',
      },
    };
    return modalInfoMap[this.modalTypeSelected] || modalInfoMap[ModalType.None];
  }

  get FormGroupSelected() {
    // Para Adição, usa formCadastroTag
    if (this.modalTypeSelected === ModalType.Adicao) {
      return this.formCadastroTag;
    }
    // Para Edição/Exclusão, usa formPesquisaTag (pois precisamos pesquisar primeiro)
    else if (this.modalTypeSelected === ModalType.Edicao || this.modalTypeSelected === ModalType.Exclusao) {
      return this.formPesquisaTag;
    }
    return this.formCadastroTag; // fallback
  }

  //=== VIEW CHILDREN  ==============================
  @ViewChild('botaoChamarModal')
  botaoChamarModalRef!: ElementRef;
  @ViewChild('botaoFecharModal')
  botaoFecharModalRef!: ElementRef;
  @ViewChild('modalTag') modalTagRef =
    {} as ElementRef;

  //=== MODAL ACTIONS  ==============================
  onSubmit() {
    switch (this.modalTypeSelected) {
      case ModalType.Adicao:
        this.handleTagCreation();
        break;
      case ModalType.Edicao:
        this.handleTagEdit();
        break;
      case ModalType.Exclusao:
        this.handleTagDelete();
        break;
    }
  }

  //Quando o botão de Criar é pressionado
  handleTagCreation() {
    if (this.formCadastroTag.invalid) return;

    const newTag: ITag = {
      id: 0,
      nome: this.formCadastroTag.controls.nomeNovaTag.value,
    };

    const result = this.tagService.createNewTag(newTag);

    this.showMessageAlert({ 
      message: result.message, 
      error: result.error 
    });
    
    if(!result.error)
      this.formCadastroTag.reset();
  }

  //Quando o botão de Editar ou Excluir é pressionado
  handleTagEdit() {
    if (this.formPesquisaTag.invalid) return;
  
    if (this.tagFound) {
      if(this.formEditTag.invalid){
        this.showMessageAlert({
          message: 'Especifique o novo nome',
          error: true,
        });
        return
      }
      const updatedTag = {
        id: this.tagFound.id,
        nome : this.formEditTag.controls.nomeEditTag.value
      }
      const result : IResponse = this.tagService.editTag(this.tagFound.id, updatedTag)
      if(!result.error){
        this.formEditTag.reset()
        this.formPesquisaTag.reset()
        this.tagFound = undefined
        this.tagList = this.tagService.getTagsList() || []
      }
      this.showMessageAlert(result)
    } else {
      this.showMessageAlert({
        message: 'Nenhuma tag foi encontrada com esse nome',
        error: true,
      });
    }
  }

  handleTagDelete(){
  }

  //Quando uma tag é digitada em um campo nos modais de
  onInputTag() {
    const searchInput = this.formPesquisaTag.controls.nomePesquisaTag;

    if (searchInput.value.length == 0) {
      this.resetSearch();
      return;
    }
    
    this.tagList = this.tagService.getTagsByName(searchInput.value).data || [];
    this.updateTagFoundTagByInput();

    if (
      this.tagList.length == 0 &&
      this.tagFound == undefined &&
      searchInput.value.length != 0
    ) {
      this.setSearchFeedback(false);
    }
  }

  //=== SEARCH METHODS  ==============================
  selectTagFromList(nomeSelecionado: string) {
    this.formPesquisaTag.controls.nomePesquisaTag.setValue(nomeSelecionado);
    const tagName = this.formPesquisaTag.controls.nomePesquisaTag.value
    this.updateTagFoundBySelect(tagName);
    this.tagList = [];
  }

  resetSearch() {
    this.tagList = this.tagService.getTagsList();
    this.tagFound = undefined;
  }

  updateTagFoundTagByInput() {
    const tagSearch = this.tagService.getTagByName(this.formPesquisaTag.controls.nomePesquisaTag.value) 

    console.log(tagSearch.data)
    tagSearch.data 
      ? this.tagFound = tagSearch.data 
      : this.tagFound = undefined
    
    this.setSearchFeedback(!tagSearch.error);
  }

  updateTagFoundBySelect(tagName : string) {
    const tagSearch = this.tagService.getTagByName(tagName)
    tagSearch.data 
      ? this.tagFound = tagSearch.data 
      : this.tagFound = undefined
    this.setSearchFeedback(!tagSearch.error);
  }

  setSearchFeedback(found: boolean) {
    this.searchFeedback = {
      message: found ? 'Tag encontrada!' : 'Nenhuma tag encontrada!',
      imagePath: found 
        ? 'assets/icones/operacoes/icon_black_success.svg' 
        : 'assets/icones/operacoes/icon_black_error.svg'
    };
  }

  //=== SWEETALERT  ==============================
  showMessageAlert(response: IResponse) {
    this.closeModal();
    this.sweetAlert
      .showMessage(response.message, response.error)
      .then((result) => {
        if (result.dismiss || result.isConfirmed) {
          this.OpenModal();
        }
      });
  }

  //=== MODAL  ==============================
  closeModal() {
    //Chamada para botão de fechar modal (usado para interação entre modal e sweetAlert)
    this.botaoFecharModalRef.nativeElement.click();
  }

  OpenModal() {
    //Chamada para botão de chamar modal (usado para interação entre modal e sweetAlert)
    this.botaoChamarModalRef.nativeElement.click();
  }
}
