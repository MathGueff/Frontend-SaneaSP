import { Component, inject, Input} from '@angular/core';
import { Reclamacao } from '../../models/class/reclamacao';
import { RouterLink } from '@angular/router';
import { SweetAlertService } from '../../Services/sweetAlert.service';

@Component({
  selector: 'app-reclamacao-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reclamacao-card.component.html',
  styleUrl: './reclamacao-card.component.css'
})
export class ReclamacaoCardComponent   {
  @Input () card !: Reclamacao;
  private sweetAlert = inject(SweetAlertService);
  protected async exclusaoReclamacao(id:number){
    const confirm = this.sweetAlert.confirmExclusion(`Deseja mesmo exluir esta reclamação?`);
    console.log(confirm)
    if(confirm){
      this.sweetAlert.showMessage("Reclamação Excluída com sucesso");
    }
  }
}

