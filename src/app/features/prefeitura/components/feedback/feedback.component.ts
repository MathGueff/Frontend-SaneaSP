import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from '@shared/services/feedback.service';

@Component({
  selector: 'app-feedback',
  imports: [CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent implements OnInit{
  private feedbackService = inject(FeedbackService);
  private router = inject(Router);
  protected feedbacks : any[] = []
  // Armazena se o texto é longo o suficiente para mostrar o botão "Ver mais"
  protected showSeeMore: boolean[] = [];
  ngOnInit(): void {
    this.feedbackService.getAllDenunciaFeedbacks().subscribe({
      next: (feedbacks) => {
        this.feedbacks = feedbacks;
        setTimeout(() => {
          this.feedbacks.forEach((fb, i) => {
            const el = document.getElementById('feedback-msg-' + i);
            if (el) {
              this.showSeeMore[i] = el.scrollHeight > 80; // 80px = altura do texto colapsado
            } else {
              this.showSeeMore[i] = false;
            }
          });
        }, 0);
        console.log(feedbacks)
      }
    })
  }

  expanded: boolean[] = [];
  toggleExpand(i: number) {
    this.expanded[i] = !this.expanded[i];
  }

  goToDenuncia(id: number) {
    this.router.navigate(['/complaint', id]);
  }
}