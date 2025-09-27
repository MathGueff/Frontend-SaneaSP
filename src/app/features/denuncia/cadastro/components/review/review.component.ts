import { Component, inject } from '@angular/core';
import { ComplaintDetailComponent } from "@features/denuncia/components/complaint-detail/complaint-detail.component";
import { ComplaintService } from '@features/denuncia/services/complaint.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [ComplaintDetailComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  private complaintService = inject(ComplaintService);
  protected complaint = this.complaintService.getTestComplaints()[0];
}
