import { Component, inject } from '@angular/core';
import { ComplaintService } from '@features/denuncia/services/complaint.service';
import { ThirdStepComponent } from '../third-step/third-step.component';
import { IComplaint } from '@features/denuncia/models/complaint.model';
import { ComplaintDetailComponent } from '@features/denuncia/components/complaint-detail/complaint-detail.component';

@Component({
  selector: 'app-review', 
  standalone: true,
  imports: [ComplaintDetailComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  private complaintService = inject(ComplaintService);
  protected complaint : IComplaint = this.complaintService.getTestComplaints()[0];
  protected oldTitle : string;

  constructor(){
    const {categories, address} = this.complaint;
    if(categories){
      this.complaint.title = `${categories[0].name} na ${address.logradouro}`;
    }
    this.oldTitle = this.complaint.title;
  }

  changeTitle(title : string){
    if(title.trim() == ""){
      this.complaint.title = this.oldTitle
      return;
    }
    this.complaint.title = title;
  }
}
