import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FeedbackService } from '@shared/services/feedback.service';

@Component({
  selector: 'app-denuncia-feedback',
  imports: [CommonModule],
  templateUrl: './denuncia-feedback.component.html',
  styleUrl: './denuncia-feedback.component.css',
})
export class DenunciaFeedbackComponent {
  private feedbackService = inject(FeedbackService);

  feedbacks$ = this.feedbackService.getAllDenunciaFeedbacks();

  expanded: boolean[] = [];
  toggleExpand(i: number) {
    this.expanded[i] = !this.expanded[i];
  }
}