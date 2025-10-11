import { CommonModule } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { IComplaint } from "@features/denuncia/models/complaint.model";
import { ComplaintService } from "@features/denuncia/services/complaint.service";

@Component({
  selector: "app-complaint-detail",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./complaint-detail.component.html",
  styleUrl: "./complaint-detail.component.css",
})
export class ComplaintDetailComponent {
  @Input() complaint!: IComplaint;
  @Input() userName!: string;

  complaintService = inject(ComplaintService);
  protected MAX_CATEGORIES = 5;
}
