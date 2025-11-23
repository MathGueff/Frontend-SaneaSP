import { Component, inject } from '@angular/core';
import { TComplaintStatusFilter } from '@features/cidadao/models/complaint-status-filter.model';
import { ComplaintFilterByStatusComponent } from '@features/denuncia/components/complaint-filter-by-status/complaint-filter-by-status.component';
import { ComplaintsGridComponent } from '@features/denuncia/components/complaints-grid/complaints-grid.component';
import { IComplaint } from '@features/denuncia/models/complaint.model';
import { ComplaintService } from '@features/denuncia/services/complaint.service';

@Component({
  selector: 'app-follow-up-complaints',
  imports: [ComplaintsGridComponent, ComplaintFilterByStatusComponent],
  templateUrl: './follow-up-complaints.component.html',
  styleUrl: './follow-up-complaints.component.css',
})
export class FollowUpComplaintsComponent {
 protected complaintService = inject(ComplaintService);
  complaints !: IComplaint[];

  ngOnInit(): void {
   this.loadComplaints();
  }

  protected loadComplaints(filter ?: TComplaintStatusFilter) {
    if(!filter || filter === 'Todas') {
      this.complaintService.getUserComplaint()
        .subscribe({
          next: (complaints) => {
            this.complaints = complaints;
          },
        });
      return
    }
    this.complaintService.getUserComplaint({status : filter})
      .subscribe({
        next: (complaints) => {
          this.complaints = complaints;
        },
      });
  }
}
