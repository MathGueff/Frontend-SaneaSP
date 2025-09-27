import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CategoryGroup } from '@features/categoria/models/categoria.model';
import { DenunciasGridComponent } from "@features/denuncia/components/denuncias-grid/denuncias-grid.component";
import { IDenuncia, StatusDenuncia } from '@features/denuncia/models/denuncia.model';
import { ComplaintService } from '@features/denuncia/services/complaint.service';

@Component({
  selector: 'app-recent-complaints',
  standalone: true,
  imports: [CommonModule, DenunciasGridComponent],
  templateUrl: './recent-complaints.component.html',
  styleUrls: [
    './recent-complaints.component.css',
    '../../pages/citizen-home/citizen-home.component.css',
  ]
})
export class RecentComplaintsComponent {
  private complaintService = inject(ComplaintService);
  denuncias: IDenuncia[] = this.complaintService.getTestComplaints();
}
