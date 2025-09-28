import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CategoryGroup } from '@features/categoria/models/category.model';
import { ComplaintsGridComponent } from "@features/denuncia/components/complaints-grid/complaints-grid.component";
import { IComplaint, ComplaintStatus } from '@features/denuncia/models/complaint.model';
import { ComplaintService } from '@features/denuncia/services/complaint.service';

@Component({
  selector: 'app-recent-complaints',
  standalone: true,
  imports: [CommonModule, ComplaintsGridComponent],
  templateUrl: './recent-complaints.component.html',
  styleUrls: [
    './recent-complaints.component.css',
    '../../pages/citizen-home/citizen-home.component.css',
  ]
})
export class RecentComplaintsComponent {
  private complaintService = inject(ComplaintService);
  denuncias: IComplaint[] = this.complaintService.getTestComplaints();
}
