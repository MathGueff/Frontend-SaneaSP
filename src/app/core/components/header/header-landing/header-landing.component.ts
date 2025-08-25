import { Component } from '@angular/core';

@Component({
  selector: 'app-header-landing',
  standalone: true,
  imports: [],
  templateUrl: './header-landing.component.html',
  styleUrls: ['./header-landing.component.css', '../header.component.css']
})
export class HeaderLandingComponent {
  navbarLinks : {path : string, name : string}[] = [
    {path: 'banner', name: 'Início'},
    {path: 'main', name: 'Escolha como entrar'},
    {path: 'about-us', name: 'Sobrenós'},
    {path: 'faq', name: 'Perguntas frequentes'}
  ]

  scrollTo(id: string) {
    const link = document.getElementById(id);
    if (link) link.scrollIntoView({ behavior: 'smooth' });
  }

}
