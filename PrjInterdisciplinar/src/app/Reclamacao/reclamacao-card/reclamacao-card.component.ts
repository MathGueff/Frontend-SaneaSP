import { Component, inject, Input, OnInit } from '@angular/core';
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
export class ReclamacaoCardComponent implements OnInit {
  @Input () card !: Reclamacao;
  private sweetAlert = inject(SweetAlertService);

  ngOnInit(): void {
      console.log(this.sweetAlert.confirmExclusion(`Deseja excluir esta reclamação?`));
  }
}

