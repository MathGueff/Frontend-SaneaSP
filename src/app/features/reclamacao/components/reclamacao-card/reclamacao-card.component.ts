import { Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SweetAlertService } from '@shared/services/sweet-alert.service';
import { CommonModule } from '@angular/common';
import { IUser } from '@core/models/usuario.model';
import { IReclamacao } from '@core/models/reclamacao.model';
import { ReclamacaoService } from '@core/services/reclamacao.service';

@Component({
  selector: 'app-reclamacao-card',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './reclamacao-card.component.html',
  styleUrl: './reclamacao-card.component.css'
})
export class ReclamacaoCardComponent   {
  @Input () card !: IReclamacao;
  @Input () user ?: IUser;
  @Output() onDelete = new EventEmitter<number>();
  private sweetAlert = inject(SweetAlertService);
  private reclamacaoService = inject(ReclamacaoService);

  // Função para excluir Reclamacao. Função assincrona: precisa usar async e await
  protected async exclusaoReclamacao(id:number){
    const confirm = await this.sweetAlert.confirmExclusion(`Deseja mesmo exluir essa Dénuncia: ${this.card.titulo}?`);
    if(confirm){
      this.reclamacaoService.deleteReclamacao(id).subscribe({
        next: async()=>{
          await this.sweetAlert.showMessage("Denúncia excluída com sucesso");
          this.onDelete.emit(id)
        },
        error:()=>{
          this.sweetAlert.showMessage("Não foi possível excluir Denúncia");
        }
      })
    }
  }
}


