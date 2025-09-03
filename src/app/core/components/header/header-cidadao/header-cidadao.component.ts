import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header-cidadao',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-cidadao.component.html',
  styleUrls: ['./header-cidadao.component.css','../header.component.css']
})
export class HeaderCidadaoComponent {
  navbarLinks : {path : string, name : string}[] = [
    {path: '#banner', name: 'Faça sua denúncia'},
    {path: '#banner', name: 'Denuncias'},
    {path: '#main', name: 'Entrar como organização'},
  ]
}
