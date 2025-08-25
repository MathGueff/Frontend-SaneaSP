import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from "@features/home/components/banner/banner.component";
import { AboutUsComponent } from "@features/home/components/about-us/about-us.component";
import { MainComponent } from '@features/home/components/main/main.component';
import { FaqComponent } from '@features/home/components/faq/faq.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BannerComponent, MainComponent, FaqComponent ,AboutUsComponent],
  templateUrl: './home-page.component.html',
  styleUrl : './home-page.component.css'
})
export class HomePageComponent{
}
