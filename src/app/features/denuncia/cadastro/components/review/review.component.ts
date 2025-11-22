import { Component, inject, Input } from "@angular/core";
import {
  IComplaintPreview,
} from "@features/denuncia/models/complaint.model";
import { ComplaintDetailComponent } from "@features/denuncia/components/complaint-detail/complaint-detail.component";
import { AuthService } from "@core/services/auth.service";
import { FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { ICategory } from "@features/categoria/models/category.model";

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
    const { categorias, rua, bairro } = this.complaintPreview;

    if (categorias && categorias.length > 0) {
      const suggestedTitle = this.generateCommonTitle(bairro, rua, categorias)
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

  generateCommonTitle(bairro?: string, rua?: string, categorias?: ICategory[]): string {
    const user = this.authService.currentUser();
    const firstName = user?.nome?.split(' ')[0] || '';
    const hasCategoria = Array.isArray(categorias) && categorias.length > 0 && categorias[0]?.nome;
    const categoriaNome = hasCategoria ? categorias[0].nome : '';

    // Se houver categoria e rua
    if (hasCategoria && rua) {
      return `${categoriaNome} na ${rua}`;
    }
    // Se houver categoria e bairro
    if (hasCategoria && bairro) {
      return `${categoriaNome} ${bairro} de ${firstName}`.trim();
    }

    if (rua && !hasCategoria) {
      return `Relato em ${rua}`;
    }
    // fallback
    return 'Relato por ' + firstName;
  }
}
