import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { INavbarLink } from '@core/models/navbar-link.model';
import { HeaderBase } from '../header-base';

@Component({
  selector: 'app-header-cidadao',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-cidadao.component.html',
  styleUrls: ['./header-cidadao.component.css','../header.component.css']
})
export class HeaderCidadaoComponent extends HeaderBase{
  navbarLinks : INavbarLink[] = [
    {path: '/', name: 'Faça sua denúncia', type:'page'},
    {path: 'denuncias', name: 'Todas as denuncias', type: 'section'}
  ]
}
