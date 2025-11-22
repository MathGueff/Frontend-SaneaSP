
import { Component, inject, Input, OnInit } from "@angular/core";
import { AuthService } from "@core/services/auth.service";
import { FileExportService } from '@core/services/file-export.service';
import { ICategory } from "@features/categoria/models/category.model";
import {
  IComplaint,
  IComplaintPreview,
  ICreateComplaint,
} from "@features/denuncia/models/complaint.model";
import { IImage } from "@features/denuncia/models/image.model";
import { ComplaintService } from "@features/denuncia/services/complaint.service";

@Component({
    selector: "app-complaint-detail",
    imports: [],
    templateUrl: "./complaint-detail.component.html",
    styleUrl: "./complaint-detail.component.css"
})
export class ComplaintDetailComponent implements OnInit {
  @Input() complaint!: IComplaint | IComplaintPreview;
  @Input() userName!: string;
  protected filePreviews: string[] = [];

  complaintService = inject(ComplaintService);
  authService = inject(AuthService);
  fileExportService = inject(FileExportService);
  protected MAX_CATEGORIES = 5;
  exportarComentariosPDF() {
      const el = document.getElementById('complaint-view');
    if (!el) {
        alert('Não foi possível localizar a página para exportação.');
      return;
    }
      this.fileExportService.exportPDF({
        element: el,
        pdfName: `denuncia-${(this.complaint as any)?.id || ''}.pdf`
      });
  }

  ngOnInit() {
    this.processImages();
  }

  isIComplaint(complaint: any): complaint is IComplaint {
    return "dataPublicacao" in complaint && "status" in complaint;
  }

  isICreateComplaint(complaint: any): complaint is ICreateComplaint {
    return !this.isIComplaint(complaint);
  }

  get complaintCategories(): ICategory[] {
    return this.complaint.categorias || [];
  }

  get images(): any[] {
    return this.complaint.imagens || [];
  }

  get formattedDate(): string {
    if (this.isIComplaint(this.complaint)) {
      return this.complaintService.getFormattedDate(
        this.complaint.dataPublicacao
      );
    }
    return this.complaintService.getFormattedDate(null);
  }

  get fullAddress(): string {
    return this.complaintService.getFullAddress(this.complaint as IComplaint);
  }

  get isCurrentUserEmployee(){
    return this.authService.isAdmin
  }

  private processImages(): void {
    const images = this.images;
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
