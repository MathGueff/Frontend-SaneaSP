import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-update-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag-tabela.component.html',
  styleUrl: './tag-tabela.component.css'
})
export class TagTabelaComponent {
  tags = [
    { id: 1, doenca: 'Cancer' },
    { id: 2, doenca: 'Leptospirose' },
    { id: 3, doenca: 'Sapinho' },
    { id: 4, doenca: 'Bicho do pé' },
  ];

  editar(tag: any) {
    console.log('Mudar tag:', tag);
    // Lógica aqui
  }

  deletar(tag: any) {
    console.log('Coisar tag:', tag);
    // Lógica aqui
  }
}
