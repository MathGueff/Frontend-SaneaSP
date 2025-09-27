import { Component, inject } from '@angular/core';
import { DenunciasGridComponent } from "@features/denuncia/components/denuncias-grid/denuncias-grid.component";
import { IDenuncia, StatusDenuncia } from '@features/denuncia/models/denuncia.model';
import { DenunciaPesquisaComponent } from "@features/denuncia/components/denuncia-pesquisa/denuncia-pesquisa.component";
import { ComplaintService } from '@features/denuncia/services/complaint.service';

@Component({
  selector: 'app-all-complaints',
  standalone: true,
  imports: [DenunciasGridComponent, DenunciaPesquisaComponent],
  templateUrl: './all-complaints.component.html',
  styleUrls: [
    './all-complaints.component.css',
    '../../pages/citizen-home/citizen-home.component.css',
  ]
})
export class AllComplaintsComponent {
  private complaintService = inject(ComplaintService);
  denuncias: IDenuncia[] = this.complaintService.getTestComplaints();
}
