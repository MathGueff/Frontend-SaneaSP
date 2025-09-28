import { Component, Input } from '@angular/core';
import { IComplaint } from '@features/denuncia/models/complaint.model';

@Component({
  selector: 'app-complaint-card',
  standalone: true,
  imports: [],
  templateUrl: './complaint-card.component.html',
  styleUrl: './complaint-card.component.css'
})
export class ComplaintCardComponent {
  @Input() denuncia : IComplaint  | null = null;
}
