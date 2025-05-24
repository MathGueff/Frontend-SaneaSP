import { Component, inject, Input} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SweetAlertService } from '../../Services/sweetAlert.service';
import { CommonModule } from '@angular/common';
import { IUser } from '../../models/interface/IUser.model';
import { IReclamacao } from '../../models/interface/IReclamacao.interface';

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
  private sweetAlert = inject(SweetAlertService);

  // Função para excluir Reclamacao. Função assincrona: precisa usar async e await
  protected async exclusaoReclamacao(id:number){
    const confirm = await this.sweetAlert.confirmExclusion(`Deseja mesmo exluir a Reclamação: ${id}?`);
    console.log(confirm)
    if(confirm){
      this.sweetAlert.showMessage("Reclamação Excluída com sucesso");
    }
  }
}


