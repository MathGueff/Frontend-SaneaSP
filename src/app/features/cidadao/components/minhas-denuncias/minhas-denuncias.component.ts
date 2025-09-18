import { Component } from '@angular/core';
import { DenunciasGridComponent } from "@features/denuncia/components/denuncias-grid/denuncias-grid.component";
import { DenunciaPesquisaComponent } from "@features/denuncia/components/denuncia-pesquisa/denuncia-pesquisa.component";
import { IDenuncia, StatusDenuncia } from '@features/denuncia/models/denuncia.model';

@Component({
  selector: 'app-minhas-denuncias',
  standalone: true,
  imports: [DenunciasGridComponent, DenunciaPesquisaComponent],
  templateUrl: './minhas-denuncias.component.html',
  styleUrl: './minhas-denuncias.component.css'
})
export class MinhasDenunciasComponent {
  denuncias: IDenuncia[] = [
    {
      id: 1,
      titulo: "Vazamento de esgoto",
      descricao: "Há um vazamento de esgoto em frente à minha casa.",
      data: new Date("2025-09-15"),
      status: StatusDenuncia.Aberto,
      pontuacao: 10,
      Imagens: [],
      Categorias: []
    }
  ];
}
