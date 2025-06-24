import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { TagService } from '../../Services/tag.service';
import { ModalType } from '../../models/enums/ModalType.enum';
import { TagModalComponent } from '../tag-modal/tag-modal.component';
import { ITag } from '../../models/interface/ITag.model';
import { Observable, of } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { SweetAlertService } from '../../Services/sweetAlert.service';

@Component({
  selector: 'app-update-tag',
  standalone: true,
  imports: [CommonModule, TagModalComponent, RouterModule],
  templateUrl: './tag-tabela.component.html',
  styleUrl: './tag-tabela.component.css'
})
export class TagTabelaComponent implements OnInit{

  private tagService = inject(TagService)
  private router = inject(Router)
  private sweetAlertService = inject(SweetAlertService)

  protected currentModalType : ModalType = ModalType.None;
  protected tagSelected: ITag | undefined = undefined;
  ModalTypeEnum = ModalType

  @ViewChild('botaoModal') botaoModalRef !: ElementRef;
  protected tags$ : Observable<ITag[]> = of();

  ngOnInit(): void {
    this.updateTable();
  }

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
    this.updateTable();
  }

  updateTable(){
    this.tagService.getTagsList().subscribe({
      next : tags => {
        // Atualiza o Observable tagList$ com as novas tags
        this.tags$ = of(tags.data || []);
      },
      error : err => {
        const errorMessage =
        err.status === 0
          ? 'Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.'
          : err.error?.message || 'Erro inesperado ao buscar as categorias.';

        this.sweetAlertService.showMessage(errorMessage, true).then(() => {
          this.router.navigate([''])
        })
      }
    });
  }

  trackById(index: number, tag: any): number {
  return tag.id; // Ou a propriedade única que identifica sua tag
}
}
