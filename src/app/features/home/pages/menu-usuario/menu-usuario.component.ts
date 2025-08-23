import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { HeaderComponent } from '@features/home/components/header/header.component';
import { BannerComponent } from "@features/home/components/banner/banner.component";
import { AboutUsComponent } from "@features/home/components/about-us/about-us.component";
import { MainComponent } from '@features/home/components/main/main.component';
import { FaqComponent } from '@features/home/components/faq/faq.component';

@Component({
  selector: 'app-menu-usuario',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerComponent, MainComponent, FaqComponent ,AboutUsComponent],
  templateUrl: './menu-usuario.component.html',
  styleUrl: './menu-usuario.component.css'
})
export class MenuUsuarioComponent{
}
