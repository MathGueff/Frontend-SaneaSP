import { Component } from '@angular/core';
import { BannerCidadaoComponent } from '@features/cidadao/components/banner-cidadao/banner-cidadao.component';
import { DenunciasRecentesComponent } from '@features/cidadao/components/denuncias-recentes/denuncias-recentes.component';
import { DenunciasGeraisComponent } from "@features/cidadao/components/denuncias-gerais/denuncias-gerais.component";
import { CategoriasPrincipaisComponent } from '@features/cidadao/components/categorias-principais/categorias-principais.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [BannerCidadaoComponent, DenunciasRecentesComponent, DenunciasGeraisComponent, CategoriasPrincipaisComponent],
  templateUrl: './menu-cidadao.component.html',
  styleUrl: './menu-cidadao.component.css'
})
export class MenuCidadaoComponent {

}
