import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive, Router } from "@angular/router";
import { ILink } from '@shared/models/link.model';

interface MenuItem {
  category: string;
  links: ILink[];
}

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  protected router = inject(Router);

  menu: MenuItem[] = [
    // {
    //   category: 'Menu inicial',
    //   links: [
    //     { text: 'Favoritos', path: '/prefeitura/dashboard/notifications' },
    //     { text: 'Notificações', path: '/prefeitura/dashboard/notifications' }
    //   ]
    // },
    {
      category: 'Denúncias',
      links: [
        { text: 'Todas denúncias', path: '/dashboard/denuncias' },
        { text: 'Denúncias em acompanhamento', path: '/dashboard/denuncias-acompanhamento' },
        { text: 'Agendamento de visitas', path: '/dashboard/agendamentos' },
        { text: 'Feedbacks dos cidadãos', path: '/dashboard/feedbacks' }
      ]
    },
    {
      category: 'Relatórios',
      links: [
        { text: 'Métricas e KPI', path: '/dashboard/metricas' },
        { text: 'Análises', path: '/dashboard/analises' },
        { text: 'Exportação de relatórios', path: '/dashboard/exportacao' }
      ]
    },
    {
      category: 'Administrativo',
      links: [
        { text: 'Gerenciar funcionários', path: '/dashboard/funcionarios' },
        { text: 'Dados da prefeitura', path: '/dashboard/dados-prefeitura' },
        { text: 'Assinatura', path: '/dashboard/assinatura' },
      ]
    }
  ]

  isAnyLinkActive(links: ILink[]): boolean {
    return links.some(link => this.isLinkActive(link.path));
  }

  isLinkActive(path: string): boolean {
    return this.router.isActive(path, { paths: 'exact', queryParams: 'ignored', fragment: 'ignored', matrixParams: 'ignored' });
  }
}
