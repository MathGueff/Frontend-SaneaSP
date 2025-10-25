
import { Component, inject } from '@angular/core';
import { ComplaintsGridComponent } from "@features/denuncia/components/complaints-grid/complaints-grid.component";
import { IComplaint } from '@features/denuncia/models/complaint.model';
import { ComplaintService } from '@features/denuncia/services/complaint.service';
import { map, take } from 'rxjs';

@Component({
    selector: 'app-recent-complaints',
    imports: [ComplaintsGridComponent],
    templateUrl: './recent-complaints.component.html',
    styleUrls: [
        './recent-complaints.component.css',
        '../../pages/citizen-home/citizen-home.component.css',
    ]
})
export class RecentComplaintsComponent {
  private complaintService = inject(ComplaintService);
  complaints !: IComplaint[];

  ngOnInit(): void {
    this.complaintService.getComplaints()
     .pipe(            
      map(complaints => complaints.slice(0, 4)) 
    )
    .subscribe({
      next: (complaints) => {
        this.complaints = complaints;
      },
    });
  }
}
