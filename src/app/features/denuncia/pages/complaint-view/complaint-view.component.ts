import { Component, inject, OnInit } from '@angular/core';
import { ComplaintDetailComponent } from '../../components/complaint-detail/complaint-detail.component';
import { ComplaintService } from '@features/denuncia/services/complaint.service';
import { IComplaint } from '@features/denuncia/models/complaint.model';
import { ComplaintFeedbackComponent } from "@features/denuncia/components/complaint-feedback/complaint-feedback.component";
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@features/usuario/services/user.service';

@Component({
  selector: 'app-complaint-view',
  standalone: true,
  imports: [ComplaintDetailComponent, ComplaintFeedbackComponent],
  templateUrl: './complaint-view.component.html',
  styleUrl: './complaint-view.component.css'
})
export class ComplaintViewComponent implements OnInit {
  private complaintService = inject(ComplaintService);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);

  complaint!: IComplaint;
  userName!: string;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.complaintService.getComplaintById(Number(id)) 
        .pipe(take(1))
        .subscribe({
          next: (complaint) => {
            this.complaint = complaint;
            this.userService.getUserNameById(Number(complaint.idUsuario)).subscribe({
              next : (res) => {
                this.userName = res.toString();
              }
            })
          },
        });
    }
  }
}
