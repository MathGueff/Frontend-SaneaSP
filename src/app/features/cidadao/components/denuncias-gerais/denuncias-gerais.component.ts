import { Component } from '@angular/core';
import { DenunciasGridComponent } from "@features/denuncia/components/denuncias-grid/denuncias-grid.component";
import { IDenuncia, StatusDenuncia } from '@features/denuncia/models/denuncia.model';

@Component({
  selector: 'app-denuncias-gerais',
  standalone: true,
  imports: [DenunciasGridComponent],
  templateUrl: './denuncias-gerais.component.html',
  styleUrls: [
    './denuncias-gerais.component.css',
    '../../pages/menu-cidadao/menu-cidadao.component.css',
  ]
})
export class DenunciasGeraisComponent {
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
  },
  {
    id: 2,
    titulo: "Iluminação pública quebrada",
    descricao: "O poste da rua está sem luz há dias.",
    data: new Date("2025-09-10"),
    status: StatusDenuncia.Aberto,
    pontuacao: 5,
    Imagens: [],
    Categorias: []
  },
  {
    id: 3,
    titulo: "Lixo acumulado",
    descricao: "A coleta de lixo não passou essa semana.",
    data: new Date("2025-09-12"),
    status: StatusDenuncia.Aberto,
    pontuacao: 8,
    Imagens: [],
    Categorias: []
  },
  {
    id: 4,
    titulo: "Árvore caída na via",
    descricao: "Uma árvore caiu bloqueando a rua após a tempestade.",
    data: new Date("2025-09-14"),
    status: StatusDenuncia.Aberto,
    pontuacao: 12,
    cep: "12345-678",
    cidade: "São Paulo",
    bairro: "Centro",
    rua: "Rua das Flores",
    numero: "100",
    complemento: "Apto 202",
    Usuario: {
      id: 1,
      nome: "João da Silva",
      email: "joao@email.com",
      senha: "123"
    },
    Imagens: [
      { id: 1, nome: "https://exemplo.com/imagem1.jpg" },
      { id: 2, nome: "https://exemplo.com/imagem2.jpg" }
    ],
    Categorias: [
      { id: 1, nome: "Infraestrutura" },
      { id: 2, nome: "Meio Ambiente" }
    ]
  }
];
}
