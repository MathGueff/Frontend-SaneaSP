import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    navbarLinks : {path : string, name : string}[] = [
    {path: '#banner', name: 'Início'},
    {path: '#main', name: 'Entrar como Cidadão'},
    {path: '#main', name: 'Entrar como Organização'},
    {path: '#about-us', name: 'Sobrenós'},
    {path: '#faq', name: 'Perguntas frequentes'}
  ]
}
