import { Component, inject, Input } from "@angular/core";
import {
  IComplaint,
  ICreateComplaint,
} from "@features/denuncia/models/complaint.model";
import { ComplaintDetailComponent } from "@features/denuncia/components/complaint-detail/complaint-detail.component";
import { AuthService } from "@core/services/auth.service";
import { FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: "app-review",
  standalone: true,
  imports: [ComplaintDetailComponent,ReactiveFormsModule, ɵInternalFormsSharedModule],
  templateUrl: "./review.component.html",
  styleUrl: "./review.component.css",
})
export class ReviewComponent {
  protected authService = inject(AuthService);
  @Input() formGroup !: FormGroup;
  @Input() complaintCreated!: ICreateComplaint;
  
  protected oldTitle: string = '';

  ngOnInit() {
    const { categorias, rua } = this.complaintCreated;

    if (categorias && categorias.length > 0) {
      const suggestedTitle = `${categorias[0]} na ${rua}`;
      this.formGroup.get('titulo')?.setValue(suggestedTitle);
    }

    this.oldTitle = this.complaintCreated.titulo;
  }

  changeTitle(title: string) {
    if (title.trim() === "") {
      this.formGroup.get('titulo')?.setValue(this.oldTitle);
      return;
    }
    this.complaintCreated.titulo = title;
  }

  setTitle(){
    this.complaintCreated.titulo = this.oldTitle;
      this.formGroup.get('titulo')?.setValue(this.oldTitle);
  }
}
