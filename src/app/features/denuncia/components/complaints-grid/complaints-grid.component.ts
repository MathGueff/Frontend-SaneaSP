import { Component, Input } from '@angular/core';
import { IDenuncia } from '@features/denuncia/models/denuncia.model';
import { ComplaintCardComponent } from '../complaint-card/complaint-card.component';

@Component({
  selector: 'app-complaints-grid',
  standalone: true,
  imports: [ComplaintCardComponent],
  templateUrl: './complaints-grid.component.html',
  styleUrl: './complaints-grid.component.css'
})
export class ComplaintsGridComponent {
  @Input() denuncias : IDenuncia[] | null = null;
}
