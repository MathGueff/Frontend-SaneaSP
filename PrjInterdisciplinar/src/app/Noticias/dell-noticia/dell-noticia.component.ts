import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dell-noticia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dell-noticia.component.html',
  styleUrl: './dell-noticia.component.css'
})
export class DellNoticiaComponent {

  pesquisarNoticia() {
    
  }
}
