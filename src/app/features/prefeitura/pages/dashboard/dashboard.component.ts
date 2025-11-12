import { Component } from '@angular/core';
import { ILink } from '@shared/models/link.model';

interface MenuItem {
  category: string;
  links: string[];
}

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  menu : MenuItem[] = [
    {
      category: 'Menu inicial',
      links: ['Configurando o dashboard', 'Notificações']
    },
    {
      category: 'Denúncias',
      links: ['Todas denúncias', 'Agendamento de visitas', 'Feedbacks dos cidadãos']
    },
    {
      category: 'Relatórios',
      links: ['Métricas e KPI', 'Análises', 'Exportação']
    },
    {
      category: 'Administrativo',
      links: ['Gerenciar funcionários', 'Dados da prefeitura']
    }
  ]
}
