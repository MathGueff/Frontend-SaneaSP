import { Component, inject, OnInit } from '@angular/core';
import { ComplaintService } from '@features/denuncia/services/complaint.service';
import { IComplaint } from '@features/denuncia/models/complaint.model';
import { ComplaintDetailComponent } from '@features/denuncia/components/complaint-detail/complaint-detail.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-review', 
  standalone: true,
  imports: [ComplaintDetailComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit{
  private complaintService = inject(ComplaintService);
   complaint !: IComplaint; 
  
    ngOnInit(): void {
      this.complaintService.getComplaints()
      .pipe(take(1))
      .subscribe({
        next: (complaints) => {
          this.complaint = complaints?.[0] ?? null;
        },
      });
    }
  protected oldTitle : string;

  constructor(){
    const {categorias: categories, rua} = this.complaint;
    if(categories){
      this.complaint.titulo = `${categories[0].nome} na ${rua}`;
    }
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
