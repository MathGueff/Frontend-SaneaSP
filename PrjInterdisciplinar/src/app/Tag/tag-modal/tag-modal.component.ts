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
      [ModalType.PesquisaEdicao]: {
        title: 'Pesquise por uma tag para editar',
        buttonText: 'Editar',
      },
      [ModalType.PesquisaExclusao]: {
        title: 'Pesquise por uma tag para excluir',
        buttonText: 'Excluir',
      },
      [ModalType.Edicao]: {
        title: 'Edite a tag',
        buttonText: 'Confirmar edição',
      },
      [ModalType.Exclusao]: {
        title: 'Confirmar exclusão',
        buttonText: 'Confirmar exclusão',
      },
    };

    return modalInfoMap[this.modalTypeSelected] || modalInfoMap[ModalType.None];
  }

  get FormGroupSelected() {
    const fromGroupsMap: Record<ModalType, FormGroup> | undefined = {
      [ModalType.None]: this.formCadastroTag,
      [ModalType.Adicao]: this.formCadastroTag,
      [ModalType.PesquisaEdicao]: this.formPesquisaTag,
      [ModalType.PesquisaExclusao]: this.formPesquisaTag,
      [ModalType.Edicao]: this.formCadastroTag,
      [ModalType.Exclusao]: this.formCadastroTag,
    };

    return fromGroupsMap[this.modalTypeSelected] || fromGroupsMap[ModalType.None];
  }

  //=== VIEW CHILDREN  ==============================
  @ViewChild('botaoChamarModalEdicaoExclusao')
  botaoChamarModalEdicaoExclusao!: ElementRef;
  @ViewChild('botaoChamarModalAdicaoPesquisa')
  botaoChamarModalAdicaoPesquisa!: ElementRef;
  @ViewChild('botaoFecharModal')
  botaoFecharModal!: ElementRef;
  @ViewChild('modalTagEdicaoExclusao') modalTagEdicaoExclusaoRef =
    {} as ElementRef;
  @ViewChild('modalTagAdicaoPesquisa') modalTagAdicaoPesquisaRef =
    {} as ElementRef;

  //=== FORMS  ==============================
  protected formCadastroTag = this.fb.group({
    nomeNovaTag: ['', [Validators.required, Validators.minLength(2)]],
  });

  protected formPesquisaTag = this.fb.group({
    nomePesquisaTag: ['', Validators.required],
  });

  //=== MODAL ACTIONS  ==============================
  onSubmit() {
    switch (this.modalTypeSelected) {
      case ModalType.Adicao:
        this.handleTagCreation();
        break;
      case ModalType.PesquisaEdicao:
        this.handleTagSearch(ModalType.Edicao);
        break;
      case ModalType.PesquisaExclusao:
        this.handleTagSearch(ModalType.Exclusao);
        break;
      case ModalType.Edicao:
        //this.handleTagEdit();
        break;
      case ModalType.Exclusao:
        //this.handleTagDeletion();
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
  handleTagSearch(nextModalType: ModalType) {
    if (this.formPesquisaTag.invalid) return;

    if (this.tagFound != undefined) {
      this.botaoChamarModalEdicaoExclusao.nativeElement.click();
      this.modalTypeSelected = nextModalType;
      return;
    }

    this.showMessageAlert({
      message: 'Nenhuma tag foi encontrada com esse nome',
      error: true,
    });
  }

  //Quando uma tag é digitada em um campo nos modais de
  onInputTag() {
    const searchInput = this.formPesquisaTag.controls.nomePesquisaTag;

    if (searchInput.value.length == 0) {
      this.resetSearch();
      return;
    }
    
    this.tagList = this.tagService.getTagsByName(searchInput.value).data || [];
    this.updateFoundTag();

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
    this.setFoundTag(tagName);
    this.tagList = [];
  }

  resetSearch() {
    this.tagList = this.tagService.getTagsList();
    this.tagFound = undefined;
  }

  updateFoundTag() {
    const tagSearch = this.tagService.getTagByName(this.formPesquisaTag.controls.nomePesquisaTag.value) 

    console.log(tagSearch.data)
    tagSearch.data 
      ? this.tagFound = tagSearch.data 
      : this.tagFound = undefined
    
    if (this.tagFound) {
      this.setSearchFeedback(true);
    }
  }

  setFoundTag(tagName : string) {
    this.tagFound = this.tagService.getTagByName(tagName)?.data
    this.setSearchFeedback(true);
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
    //Chamada para botão de fechar modal
    this.botaoFecharModal.nativeElement.click();
  }

  OpenModal() {
    //Chamada para botão de chamar modal
    this.botaoChamarModalAdicaoPesquisa.nativeElement.click();
  }
}
