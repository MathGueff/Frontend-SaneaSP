import { UserService } from './../../Services/user.service';
import { Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import { Reclamacao } from '../../models/class/reclamacao';
import { RouterLink } from '@angular/router';
import { SweetAlertService } from '../../Services/sweetAlert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reclamacao-card',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './reclamacao-card.component.html',
  styleUrl: './reclamacao-card.component.css'
})
export class ReclamacaoCardComponent   {
  @Input () card !: Reclamacao;
  @ViewChild('dropdownLinks') linksDropdown !: ElementRef;
  @ViewChild('dropdown') dropdown !: ElementRef;
  private sweetAlert = inject(SweetAlertService);
  private userService = inject(UserService);
  user$ = this.userService.getObservableCurrentUser();

  // Função para excluir Reclamacao. Função assincrona: precisa usar async e await
  protected async exclusaoReclamacao(id:number){
    const confirm = await this.sweetAlert.confirmExclusion(`Deseja mesmo exluir a Reclamação: ${id}?`);
    console.log(confirm)
    if(confirm){
      this.sweetAlert.showMessage("Reclamação Excluída com sucesso");
    }
  }

  protected toggleOptionsDropdown() {
    const dropdown = this.linksDropdown.nativeElement as HTMLElement;
    if(dropdown.classList.contains("show"))
      dropdown.classList.remove('show');
    else
      dropdown.classList.add('show')
  }
}


