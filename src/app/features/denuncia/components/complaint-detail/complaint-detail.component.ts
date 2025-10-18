import { CommonModule } from "@angular/common";
import { Component, inject, Input, OnInit } from "@angular/core";
import {
  IComplaint,
  ICreateComplaint,
} from "@features/denuncia/models/complaint.model";
import { ComplaintService } from "@features/denuncia/services/complaint.service";

@Component({
  selector: "app-complaint-detail",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./complaint-detail.component.html",
  styleUrl: "./complaint-detail.component.css",
})
export class ComplaintDetailComponent implements OnInit {
  @Input() complaint!: IComplaint | ICreateComplaint;
  @Input() userName!: string;
  protected filePreviews: string[] = [];

  complaintService = inject(ComplaintService);
  protected MAX_CATEGORIES = 5;

  ngOnInit() {
    this.processImages();
  }

  isIComplaint(complaint: any): complaint is IComplaint {
    return "dataPublicacao" in complaint && "status" in complaint;
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
      return this.complaintService.getFormattedDate(
        this.complaint.dataPublicacao
      );
    }
    return this.complaintService.getFormattedDate(null);
  }

  getFullAddress(): string {
    return this.complaintService.getFullAddress(this.complaint as IComplaint);
  }

  private processImages(): void {
    const images = this.getImages();
    this.filePreviews = [];

    images.forEach((imagem) => {
      if (imagem instanceof File) {
        this.getFilePreview(imagem);
      }
    });
  }

  getFilePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.filePreviews.push(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  getImageSource(imagem: any, index: number): string {
    if (imagem.url) {
      return imagem.url;
    }
    if (imagem instanceof File && this.filePreviews[index]) {
      return this.filePreviews[index];
    }
    return "";
  }
}
