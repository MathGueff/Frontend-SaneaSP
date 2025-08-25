import { Component } from '@angular/core';

@Component({
  selector: 'app-header-cidadao',
  standalone: true,
  imports: [],
  templateUrl: './header-cidadao.component.html',
  styleUrls: ['./header-cidadao.component.css','../header.component.css']
})
export class HeaderCidadaoComponent {
  navbarLinks : {path : string, name : string}[] = [
    {path: '#banner', name: 'Denuncias'},
    {path: '#main', name: 'Organizacao'},
  ]
}
