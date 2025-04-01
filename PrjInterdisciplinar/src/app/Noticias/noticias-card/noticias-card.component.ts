import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Noticia } from '../../models/class/noticia';
import { INoticia } from '../../models/interface/noticias.model';

@Component({
  selector: 'app-noticias-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './noticias-card.component.html',
  styleUrl: './noticias-card.component.css'
})
export class NoticiasCardComponent {
  @Input () cardNoticia !: INoticia;
}
