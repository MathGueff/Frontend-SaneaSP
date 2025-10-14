import { Component, inject, Input } from '@angular/core';
import { ComplaintService } from '@features/denuncia/services/complaint.service';
import { IComplaint } from '@features/denuncia/models/complaint.model';
import { ComplaintDetailComponent } from '@features/denuncia/components/complaint-detail/complaint-detail.component';

@Component({
  selector: 'app-review', 
  standalone: true,
  imports: [ComplaintDetailComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent{
  private complaintService = inject(ComplaintService);
  @Input() complaint !: IComplaint
  
  // protected oldTitle : string;

  constructor(){
    // const {categorias: categories, rua} = this.complaint;
    // if(categories){
    //   this.complaint.titulo = `${categories[0].nome} na ${rua}`;
    // }
    // this.oldTitle = this.complaint.titulo;
  }

  changeTitle(title : string){
    // if(title.trim() == ""){
    //   this.complaint.titulo = this.oldTitle
    //   return;
    // }
    // this.complaint.titulo = title;
  }
}
