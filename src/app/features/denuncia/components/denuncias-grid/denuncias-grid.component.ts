import { Component, Input } from '@angular/core';
import { IDenuncia } from '@features/denuncia/models/denuncia.model';
import { DenunciaCardComponent } from "../denuncia-card/denuncia-card.component";

@Component({
  selector: 'app-denuncias-grid',
  standalone: true,
  imports: [DenunciaCardComponent],
  templateUrl: './denuncias-grid.component.html',
  styleUrl: './denuncias-grid.component.css'
})
export class DenunciasGridComponent {
  @Input() denuncias : IDenuncia[] | null = null;
}
