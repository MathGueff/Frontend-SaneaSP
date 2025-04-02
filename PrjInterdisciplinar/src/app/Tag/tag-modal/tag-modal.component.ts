import { Component, Input } from '@angular/core';
import { ModalType } from '../../models/enums/ModalType.enum';
import { IModalTagInfos } from '../../models/interface/IModalTagInfos';

@Component({
  selector: 'app-tag-modal',
  standalone: true,
  imports: [],
  templateUrl: './tag-modal.component.html',
  styleUrl: './tag-modal.component.css'
})
export class TagModalComponent {
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
}