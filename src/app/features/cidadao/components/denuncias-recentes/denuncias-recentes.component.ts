import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-denuncias-recentes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './denuncias-recentes.component.html',
  styleUrl: './denuncias-recentes.component.css'
})
export class DenunciasRecentesComponent {
  teste : {description : string}[] = [
    {description : "ver since the 1 remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sh"},
    {description : "ver since the 1 remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sh"},
    {description : "ver since the 1 remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sh"},
    {description : "ver since the 1 remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sh"},
    {description : "ver since the 1 remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sh"}
  ]
}
