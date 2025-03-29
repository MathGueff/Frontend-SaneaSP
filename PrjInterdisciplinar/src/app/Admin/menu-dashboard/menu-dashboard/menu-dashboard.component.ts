import { Component, Input } from '@angular/core';
import { OpcoesMenuAdmin } from '../../OpcoesSidebarMenuAdmin.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-dashboard.component.html',
  styleUrl: './menu-dashboard.component.css'
})
export class MenuDashboardComponent {
  @Input() teste : OpcoesMenuAdmin = OpcoesMenuAdmin.Doenca;
}
