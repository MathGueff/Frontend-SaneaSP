import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-top-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-categories.component.html',
  styleUrls: ['./top-categories.component.css', '../../pages/citizen-home/citizen-home.component.css']
})
export class TopCategoriesComponent {
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
