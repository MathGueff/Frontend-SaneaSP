import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IComplaint } from '@features/denuncia/models/complaint.model';
import { ComplaintService } from '@features/denuncia/services/complaint.service';

@Component({
    selector: 'app-complaint-card',
    imports: [RouterModule],
    templateUrl: './complaint-card.component.html',
    styleUrl: './complaint-card.component.css'
})
export class ComplaintCardComponent {
  @Input() complaint !: IComplaint;

  get complaintImage(){
    return (this.complaint?.imagens && this.complaint.imagens?.length > 0) ? this.complaint.imagens[0].url : "images/denuncia/imageNotFound.png"
  }
  complaintService = inject(ComplaintService)
}
