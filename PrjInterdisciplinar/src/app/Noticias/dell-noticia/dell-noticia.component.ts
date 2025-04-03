import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dell-noticia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dell-noticia.component.html',
  styleUrl: './dell-noticia.component.css'
})

export class DellNoticiaComponent {
  @ViewChild('idNoticia') idNoticia: any;

  idEncontrado: boolean = false;
  idPesquisado: number = 0;
  listaNoticias: number[] = [1,2,3,4,5];

  pesquisarId() {
    this.idPesquisado = Number(this.idNoticia.nativeElement.value);
    this.idEncontrado = this.listaNoticias.includes(this.idPesquisado);
  }

  openModal() {
    
  }
}
