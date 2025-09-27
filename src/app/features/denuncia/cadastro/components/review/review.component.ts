import { Component } from '@angular/core';
import { ComplaintDetailComponent } from "@features/denuncia/components/complaint-detail/complaint-detail.component";

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [ComplaintDetailComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {

}
