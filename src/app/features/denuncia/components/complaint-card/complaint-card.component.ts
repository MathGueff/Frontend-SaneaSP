import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IComplaint } from '@features/denuncia/models/complaint.model';

@Component({
  selector: 'app-complaint-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './complaint-card.component.html',
  styleUrl: './complaint-card.component.css'
})
export class ComplaintCardComponent {
  @Input() complaint !: IComplaint;

  calculateDate(date: Date): string {
    const now = new Date();
    // Convert both dates to Brasília time (UTC-3)
    const toBrasilia = (d: Date) => {
      // Get UTC time and subtract 3 hours
      return new Date(d.getTime() - (d.getTimezoneOffset() * 60000) - (3 * 60 * 60 * 1000));
    };
    const dateBR = toBrasilia(new Date(date));
    const nowBR = toBrasilia(now);

    const diffMs = nowBR.getTime() - dateBR.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 24) {
      return `${diffHours} hora${diffHours === 1 ? '' : 's'}`;
    }
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      return `${diffDays} dia${diffDays === 1 ? '' : 's'}`;
    }
    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 4) {
      return `${diffWeeks} semana${diffWeeks === 1 ? '' : 's'}`;
    }
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) {
      return `${diffMonths} mês${diffMonths === 1 ? '' : 'es'}`;
    }
    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears} ano${diffYears === 1 ? '' : 's'}`;
  }
}
