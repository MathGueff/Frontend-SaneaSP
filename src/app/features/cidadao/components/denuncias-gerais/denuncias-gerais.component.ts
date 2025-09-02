import { Component } from '@angular/core';

@Component({
  selector: 'app-denuncias-gerais',
  standalone: true,
  imports: [],
  templateUrl: './denuncias-gerais.component.html',
  styleUrls: [
    './denuncias-gerais.component.css',
    '../../pages/menu-cidadao/menu-cidadao.component.css',
    '../../styles/denuncia.css'
  ]
})
export class DenunciasGeraisComponent {
  teste: { description: string }[] = [
    { description: "Na minha rua o esgoto corre a céu aberto há meses, o cheiro é insuportável e ninguém da prefeitura aparece para resolver." },
    { description: "Moro perto de um córrego que está cheio de lixo e esgoto, as crianças brincam por ali e vivem ficando doentes." },
    { description: "Aqui no bairro não temos coleta de lixo regular, o caminhão passa quando quer e o lixo fica acumulado na calçada atraindo ratos." },
    { description: "Toda vez que chove a água volta pelo ralo do banheiro porque a rede de esgoto está entupida. Já fizemos várias reclamações." }
  ];
}
