import { CommonModule } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { IComplaint, ICreateComplaint } from "@features/denuncia/models/complaint.model";
import { ComplaintService } from "@features/denuncia/services/complaint.service";

@Component({
  selector: "app-complaint-detail",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./complaint-detail.component.html",
  styleUrl: "./complaint-detail.component.css",
})
export class ComplaintDetailComponent {
  @Input() complaint!: IComplaint | ICreateComplaint;
  @Input() userName!: string;

  complaintService = inject(ComplaintService);
  protected MAX_CATEGORIES = 5;

  isIComplaint(complaint: any): complaint is IComplaint {
    return 'dataPublicacao' in complaint && 'status' in complaint;
  }

  isICreateComplaint(complaint: any): complaint is ICreateComplaint {
    return !this.isIComplaint(complaint);
  }

  getCategories(): any[] {
    return this.complaint.categorias || [];
  }

  getImages(): any[] {
    return this.complaint.imagens || [];
  }

  getFormattedDate(): string {
    if (this.isIComplaint(this.complaint)) {
      return this.complaintService.getFormattedDate(this.complaint.dataPublicacao);
    }
    return this.complaintService.getFormattedDate(null);
  }

  getFullAddress(): string {
    return this.complaintService.getFullAddress(this.complaint as IComplaint);
  }
}
