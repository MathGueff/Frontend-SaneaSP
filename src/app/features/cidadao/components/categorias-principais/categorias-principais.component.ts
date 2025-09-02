import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-categorias-principais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorias-principais.component.html',
  styleUrls: ['./categorias-principais.component.css', '../../pages/menu-cidadao/menu-cidadao.component.css']
})
export class CategoriasPrincipaisComponent {
  categories = [
    {name: 'Poluição'},
    {name: 'Saneamento básico'},
    {name: 'Poluição'},
    {name: 'Saneamento básico'},
    {name: 'Poluição'},
    {name: 'Saneamento básico'},
    {name: 'Poluição'},
    {name: 'Saneamento básico'},
    {name: 'Saneamento básico'}
  ]
}
