import { Component, inject } from '@angular/core';
import { INavbarLink } from '@core/models/navbar-link.model';
import { HeaderBase } from '../header-base';
import { HeaderButtonsType } from '@core/models/header.model';
import { AuthService } from '@core/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-cidadao',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header-cidadao.component.html',
  styleUrls: ['./header-cidadao.component.css','../header.component.css']
})
export class HeaderCidadaoComponent extends HeaderBase{
  protected HeaderButtonsType = HeaderButtonsType;
  private authService = inject(AuthService);
  protected user = this.authService.getCurrentUser();

  navbarLinks : INavbarLink[] = [
    {path: '/', name: 'Área dos cidadãos', type:'page'},
    {path: '/', name: 'Criar denúncia', type:'page'},
    {path: '/', name: 'Minhas denúncias', type:'page'}
  ]
}
