import { Component, inject } from '@angular/core';
import { ComplaintDetailComponent } from '../../components/complaint-detail/complaint-detail.component';
import { ComplaintService } from '@features/denuncia/services/complaint.service';
import { IComplaint } from '@features/denuncia/models/complaint.model';
import { ComplaintFeedbackComponent } from "@features/denuncia/components/complaint-feedback/complaint-feedback.component";

@Component({
  selector: 'app-complaint-view',
  standalone: true,
  imports: [ComplaintDetailComponent, ComplaintFeedbackComponent],
  templateUrl: './complaint-view.component.html',
  styleUrl: './complaint-view.component.css'
})
export class ComplaintViewComponent {
  private complaintService = inject(ComplaintService)
  protected complaint : IComplaint = this.complaintService.getTestComplaints()[0];
}
