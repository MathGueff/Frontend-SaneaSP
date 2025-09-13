import { Component, inject } from '@angular/core';
import { INavbarLink } from '@core/models/navbar-link.model';
import { HeaderBase } from '../header-base';
import { PathService } from '@shared/services/path.service';

@Component({
  selector: 'app-header-cidadao',
  standalone: true,
  imports: [],
  templateUrl: './header-cidadao.component.html',
  styleUrls: ['./header-cidadao.component.css','../header.component.css']
})
export class HeaderCidadaoComponent extends HeaderBase{
  private path = inject(PathService);
  navbarLinks : INavbarLink[] = [
    {path: '/', name: 'Todas denuncias', type:'page'},
    {path: '/', name: 'Criar denuncia', type:'page'},
    {path: '/', name: 'Ver minhas denuncias', type:'page'}
  ]

  
}
