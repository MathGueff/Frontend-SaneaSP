import { Component, inject, OnInit } from "@angular/core";
import { ComplaintSearchComponent } from "@features/denuncia/components/complaint-search/complaint-search.component";
import { ComplaintsGridComponent } from "@features/denuncia/components/complaints-grid/complaints-grid.component";
import { IComplaint } from "@features/denuncia/models/complaint.model";
import { ComplaintService } from "@features/denuncia/services/complaint.service";

@Component({
  selector: "app-all-complaints",
  imports: [ComplaintsGridComponent, ComplaintSearchComponent],
  templateUrl: "./all-complaints.component.html",
  styleUrls: [
    "./all-complaints.component.css",
    "../../pages/citizen-home/citizen-home.component.css",
  ],
})
export class AllComplaintsComponent implements OnInit {
  private complaintService = inject(ComplaintService);
  complaints!: IComplaint[];

  ngOnInit(): void {
    this.complaintService.getComplaints().subscribe({
      next: (complaints) => {
        this.complaints = complaints;
      },
    });
  }
}
