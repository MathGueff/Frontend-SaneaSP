import { Component, Input } from '@angular/core';
import { IDenuncia } from '@features/denuncia/models/denuncia.model';

@Component({
  selector: 'app-denuncias-grid',
  standalone: true,
  imports: [],
  templateUrl: './denuncias-grid.component.html',
  styleUrl: './denuncias-grid.component.css'
})
export class DenunciasGridComponent {
  @Input() denuncias : IDenuncia[] | null = null;
}
