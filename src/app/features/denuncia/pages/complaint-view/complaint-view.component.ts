import { Component, inject, OnInit } from '@angular/core';
import { ComplaintDetailComponent } from '../../components/complaint-detail/complaint-detail.component';
import { ComplaintService } from '@features/denuncia/services/complaint.service';
import { IComplaint } from '@features/denuncia/models/complaint.model';
import { ComplaintFeedbackComponent } from "@features/denuncia/components/complaint-feedback/complaint-feedback.component";
import { take } from 'rxjs';

@Component({
  selector: 'app-complaint-view',
  standalone: true,
  imports: [ComplaintDetailComponent, ComplaintFeedbackComponent],
  templateUrl: './complaint-view.component.html',
  styleUrl: './complaint-view.component.css'
})
export class ComplaintViewComponent implements OnInit {
  private complaintService = inject(ComplaintService);
  complaint !: IComplaint; // não precisa ser private se for usar no template

  ngOnInit(): void {
    this.complaintService.getComplaints()
    .pipe(take(1))
    .subscribe({
      next: (complaints) => {
        this.complaint = complaints?.[0];
        console.log(this.complaint)
      },
    });
  }
}

