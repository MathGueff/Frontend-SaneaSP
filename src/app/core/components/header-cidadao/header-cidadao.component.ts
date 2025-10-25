import { Component, inject } from '@angular/core';
import { HeaderButtonsType } from '@core/models/header.model';
import { AuthService } from '@core/services/auth.service';
import { RouterModule } from '@angular/router';
import { IProtectedLink } from '@shared/models/link.model';
import { Observable } from 'rxjs';
import { IUser } from '@features/usuario/models/user.model';

import { AuthorizationService } from '@core/services/authorization.service';
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
    selector: 'app-header-cidadao',
    imports: [RouterModule],
    templateUrl: './header-cidadao.component.html',
    styleUrls: ['./header-cidadao.component.css', '../header/header.component.css']
})

export class HeaderCidadaoComponent{
  Authorization = AuthorizationService
  protected HeaderButtonsType = HeaderButtonsType;
  protected authService = inject(AuthService);

  navbarLinks : IProtectedLink[] = [
    {path: '/cidadao/menu', text: 'Área dos cidadãos', access : {requiresAuth : false}},
    {path: '/cidadao/new-complaint', text: 'Criar denúncia', access : {requiresAuth : true}},
    {path: '/cidadao/complaints', text: 'Minhas denúncias', access : {requiresAuth : true}}
  ];

  canShowLink(link : IProtectedLink){
    return (link.access.requiresAuth && this.authService.currentUser()) || !link.access.requiresAuth;
  }

  dropdownOpen = false;

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation(); // Impede que clique feche imediatamente
    this.dropdownOpen = !this.dropdownOpen;
}

closeDropdown() {
  this.dropdownOpen = false;
}

logout() {
  this.dropdownOpen = false;
  this.authService.logout()
}

}
