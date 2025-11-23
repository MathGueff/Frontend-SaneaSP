import { Component, inject, OnInit } from '@angular/core';
import { ComplaintsGridComponent } from '@features/denuncia/components/complaints-grid/complaints-grid.component';
import { IComplaint } from '@features/denuncia/models/complaint.model';
import { ComplaintService } from '@features/denuncia/services/complaint.service';

@Component({
  selector: 'app-all-complaint',
  imports: [ComplaintsGridComponent],
  templateUrl: './all-complaint.component.html',
  styleUrl: './all-complaint.component.css',
})
export class AllComplaintComponent implements OnInit{
  private complaintService = inject(ComplaintService)
  protected complaints : IComplaint[] = []
  ngOnInit(): void {
    this.complaintService.getComplaints().subscribe({
      next : (complaints) => {
        this.complaints = complaints
      }
    })
  }
}
