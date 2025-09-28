import { Component, inject } from '@angular/core';
import { ComplaintDetailComponent } from "@features/denuncia/components/complaint-detail/complaint-detail.component";
import { ComplaintService } from '@features/denuncia/services/complaint.service';
import { ThirdStepComponent } from '../third-step/third-step.component';
import { IDenuncia } from '@features/denuncia/models/denuncia.model';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [ComplaintDetailComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  private complaintService = inject(ComplaintService);
  protected complaint : IDenuncia = this.complaintService.getTestComplaints()[0];
  protected oldTitle : string;

  constructor(){
    this.complaint.titulo = `${this.complaint.Categorias[0].nome} na ${this.complaint.Address.logradouro}`;
    this.oldTitle = this.complaint.titulo;
  }

  changeTitle(title : string){
    if(title.trim() == ""){
      this.complaint.titulo = this.oldTitle
      return;
    }
    this.complaint.titulo = title;
  }
}
