import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { TagService } from '../../Services/tag.service';
import { ModalType } from '../../models/enums/ModalType.enum';
import { TagModalComponent } from '../tag-modal/tag-modal.component';
import { ITag } from '../../models/interface/ITag.model';

@Component({
  selector: 'app-update-tag',
  standalone: true,
  imports: [CommonModule, TagModalComponent],
  templateUrl: './tag-tabela.component.html',
  styleUrl: './tag-tabela.component.css'
})
export class TagTabelaComponent {
  private tagService = inject(TagService)
  protected currentModalType : ModalType = ModalType.None;
  protected tagSelected: ITag | undefined = undefined;
  ModalTypeEnum = ModalType

  @ViewChild('botaoModal') botaoModalRef !: ElementRef;
  tags$ = this.tagService.getTagsList()

  openTagModal(modalType : ModalType, tag ?: ITag){
    if(tag)
      this.tagSelected = tag
    else
      this.tagSelected = undefined;
    this.currentModalType = modalType
    
    setTimeout(() => {
      this.botaoModalRef.nativeElement.click();
    })
  }

  resetTable(){
    this.tagSelected = undefined;
    this.tags$ = this.tagService.getTagsList()
  }
}
