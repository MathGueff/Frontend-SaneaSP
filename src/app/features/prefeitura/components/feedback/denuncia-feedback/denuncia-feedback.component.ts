import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-denuncia-feedback',
  imports: [CommonModule],
  templateUrl: './denuncia-feedback.component.html',
  styleUrl: './denuncia-feedback.component.css',
})
export class DenunciaFeedbackComponent {
  feedbacks = [
    {
      titulo: 'Feedback 1',
      conteudo: 'Conteúdo do feedback 1',
      data: new Date()
    },
    {
      titulo: 'Feedback 2',
      conteudo: 'Conteúdo do feedback 2',
      data: new Date()
    },
    {
      titulo: 'Feedback 3',
      conteudo: 'Conteúdo do feedback 3',
      data: new Date()
    },
    {
      titulo: 'Feedback 4',
      conteudo: 'Será que este botão realmente irá funcionar corretamente quando clicado? Estou curioso para ver se a funcionalidade de expandir e recolher o conteúdo do feedback está implementada de forma eficaz e intuitiva para o usuário final.',
      data: new Date()
    },
    { 
      titulo: 'Feedback 5',
      conteudo: 'Apenas para testar a responsividade',
      data: new Date()
    },
    {
      titulo: 'Feedback 6',
      conteudo: 'Apenas para testar a responsividade',
      data: new Date()
    },
    {
      titulo: 'Feedback 7',
      conteudo: 'Apenas para testar a responsividade',
      data: new Date()
    }
  ];

  expanded: boolean[] = [];
  toggleExpand(i: number) {
    this.expanded[i] = !this.expanded[i];
  }
}