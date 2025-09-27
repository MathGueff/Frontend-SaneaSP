import { Component } from '@angular/core';
import { CitizenBannerComponent } from '@features/cidadao/components/citizen-banner/citizen-banner.component';
import { RecentComplaintsComponent } from '@features/cidadao/components/recent-complaints/recent-complaints.component';
import { AllComplaintsComponent } from "@features/cidadao/components/all-complaints/all-complaints.component";
import { TopCategoriesComponent } from '@features/cidadao/components/top-categories/top-categories.component';

@Component({
  selector: 'app-citizen-home',
  standalone: true,
  imports: [CitizenBannerComponent, RecentComplaintsComponent, AllComplaintsComponent, TopCategoriesComponent],
  templateUrl: './citizen-home.component.html',
  styleUrl: './citizen-home.component.css'
})
export class CitizenHomeComponent {

}
