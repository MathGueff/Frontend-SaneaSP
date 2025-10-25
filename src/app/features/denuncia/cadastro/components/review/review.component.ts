import { Component, inject, Input } from "@angular/core";
import {
  IComplaintPreview,
  ICreateComplaint,
} from "@features/denuncia/models/complaint.model";
import { ComplaintDetailComponent } from "@features/denuncia/components/complaint-detail/complaint-detail.component";
import { AuthService } from "@core/services/auth.service";
import { FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
    selector: "app-review",
    imports: [ComplaintDetailComponent, ReactiveFormsModule, ɵInternalFormsSharedModule],
    templateUrl: "./review.component.html",
    styleUrl: "./review.component.css"
})
export class ReviewComponent {
  protected authService = inject(AuthService);
  @Input() formGroup !: FormGroup;
  @Input() complaintPreview!: IComplaintPreview;
  
  protected oldTitle: string = '';

  ngOnInit() {
    console.log(this.complaintPreview)
    const { categorias, rua } = this.complaintPreview;

    if (categorias && categorias.length > 0) {
      const suggestedTitle = `${categorias.at(0)?.nome} na ${rua}`;
      this.formGroup.get('titulo')?.setValue(suggestedTitle);
    }

    this.oldTitle = this.complaintPreview.titulo;
  }

  changeTitle(title: string) {
    if (title.trim() === "") {
      this.formGroup.get('titulo')?.setValue(this.oldTitle);
      return;
    }
    this.complaintPreview.titulo = title;
  }

  setTitle(){
    this.complaintPreview.titulo = this.oldTitle;
      this.formGroup.get('titulo')?.setValue(this.oldTitle);
  }
}
