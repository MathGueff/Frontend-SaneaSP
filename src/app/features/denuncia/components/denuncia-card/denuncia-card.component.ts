import { Component, Input } from '@angular/core';
import { IDenuncia } from '@features/denuncia/models/denuncia.model';

@Component({
  selector: 'app-denuncia-card',
  standalone: true,
  imports: [],
  templateUrl: './denuncia-card.component.html',
  styleUrl: './denuncia-card.component.css'
})
export class DenunciaCardComponent {
  @Input() denuncia : IDenuncia  | null = null;
}
