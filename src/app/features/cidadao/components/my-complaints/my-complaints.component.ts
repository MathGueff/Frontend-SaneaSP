import { Component, inject, OnInit } from "@angular/core";
import { ComplaintsGridComponent } from "@features/denuncia/components/complaints-grid/complaints-grid.component";
import {
  IComplaint
} from "@features/denuncia/models/complaint.model";
import { CommonModule } from "@angular/common";
import { ComplaintService } from "@features/denuncia/services/complaint.service";

@Component({
    selector: "app-my-complaints",
    imports: [CommonModule, ComplaintsGridComponent],
    templateUrl: "./my-complaints.component.html",
    styleUrl: "./my-complaints.component.css"
})
export class MyComplaintsComponent implements OnInit {
  protected complaintService = inject(ComplaintService);
  complaints !: IComplaint[];

  ngOnInit(): void {
   this.loadComplaints();
  }

  protected loadComplaints() {
    this.complaintService.getUserComplaint()
      .subscribe({
        next: (complaints) => {
          this.complaints = complaints;
        },
      });
  }
}
