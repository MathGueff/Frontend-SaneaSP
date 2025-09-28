import { Component, inject } from '@angular/core';
import { ComplaintSearchComponent } from '@features/denuncia/components/complaint-search/complaint-search.component';
import { ComplaintsGridComponent } from "@features/denuncia/components/complaints-grid/complaints-grid.component";
import { IDenuncia } from '@features/denuncia/models/denuncia.model';
import { ComplaintService } from '@features/denuncia/services/complaint.service';

@Component({
  selector: 'app-all-complaints',
  standalone: true,
  imports: [ComplaintsGridComponent, ComplaintSearchComponent],
  templateUrl: './all-complaints.component.html',
  styleUrls: [
    './all-complaints.component.css',
    '../../pages/citizen-home/citizen-home.component.css',
  ]
})
export class AllComplaintsComponent {
  private complaintService = inject(ComplaintService);
  denuncias: IDenuncia[] = this.complaintService.getTestComplaints();
}
