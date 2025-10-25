import { Component, Input } from '@angular/core';
import { IComplaint } from '@features/denuncia/models/complaint.model';
import { ComplaintCardComponent } from '../complaint-card/complaint-card.component';

@Component({
    selector: 'app-complaints-grid',
    imports: [ComplaintCardComponent],
    templateUrl: './complaints-grid.component.html',
    styleUrl: './complaints-grid.component.css'
})
export class ComplaintsGridComponent {
  @Input() complaints !: IComplaint[];
}
