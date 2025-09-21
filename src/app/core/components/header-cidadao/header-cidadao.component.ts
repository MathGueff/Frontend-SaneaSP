import { Component, inject } from '@angular/core';
import { HeaderButtonsType } from '@core/models/header.model';
import { AuthService } from '@core/services/auth.service';
import { RouterModule } from '@angular/router';
import { ILink } from '@shared/models/link.model';

@Component({
  selector: 'app-header-cidadao',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header-cidadao.component.html',
  styleUrls: ['./header-cidadao.component.css','../header/header.component.css']
})
export class HeaderCidadaoComponent{
  protected HeaderButtonsType = HeaderButtonsType;
  private authService = inject(AuthService);
  protected user = this.authService.getCurrentUser();

  navbarLinks : ILink[] = [
    {path: '/cidadao/menu', name: 'Área dos cidadãos'},
    {path: '/cidadao/login', name: 'Criar denúncia'},
    {path: '/cidadao/register', name: 'Minhas denúncias'}
  ]
}
