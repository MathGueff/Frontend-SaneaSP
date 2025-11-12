import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { ILink } from '@shared/models/link.model';

interface MenuItem {
  category: string;
  links: ILink[];
}

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  menu: MenuItem[] = [
    {
      category: 'Menu inicial',
      links: [
        { text: 'Configurando o dashboard', path: '/prefeitura/dashboard/configs' },
        { text: 'Notificações', path: '/prefeitura/dashboard/notifications' }
      ]
    },
    {
      category: 'Denúncias',
      links: [
        { text: 'Todas denúncias', path: '/prefeitura/dashboard/all-complaint' },
        { text: 'Agendamento de visitas', path: '/prefeitura/dashboard/scheduling' },
        { text: 'Feedbacks dos cidadãos', path: '/prefeitura/dashboard/feedbacks' }
      ]
    },
    {
      category: 'Relatórios',
      links: [
        { text: 'Métricas e KPI', path: '/prefeitura/dashboard/kpi' },
        { text: 'Análises', path: '/prefeitura/dashboard/analysis' },
        { text: 'Exportação', path: '/prefeitura/dashboard/export' }
      ]
    },
    {
      category: 'Administrativo',
      links: [
        { text: 'Gerenciar funcionários', path: '/prefeitura/dashboard/employees' },
        { text: 'Dados da prefeitura', path: '/prefeitura/dashboard/me' }
      ]
    }
  ]
}
