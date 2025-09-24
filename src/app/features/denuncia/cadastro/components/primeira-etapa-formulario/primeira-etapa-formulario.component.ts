import { Component } from '@angular/core';

@Component({
  selector: 'app-primeira-etapa-formulario',
  standalone: true,
  imports: [],
  templateUrl: './primeira-etapa-formulario.component.html',
  styleUrls: [
    './primeira-etapa-formulario.component.css',
    '../../../../../shared/styles/form.style.css',
    '../../../cadastro/pages/denuncia-cadastro/denuncia-cadastro.component.css'
  ]
})
export class PrimeiraEtapaFormularioComponent {
  protected images : string[] = ["user1","user2","user3","user4","user5"]
}
