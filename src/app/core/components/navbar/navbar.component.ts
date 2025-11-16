import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderButtonsType } from "@core/models/header.model";
import { AuthService } from "@core/services/auth.service";
import { AuthorizationService } from "@core/services/authorization.service";
import { UserType } from "@features/usuario/enums/user-type";
import { IProtectedLink } from "@shared/models/protected-link";

@Component({
  selector: "app-navbar",
  imports: [CommonModule, RouterModule],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
  Authorization = AuthorizationService;
  protected HeaderButtonsType = HeaderButtonsType;
  protected authService = inject(AuthService);

  navbarLinks: IProtectedLink[] = [
    {
      path: "/inicio",
      text: "Área dos cidadãos",
      canView : 'both'
    },
    {
      path: "/login",
      text: "Para prefeituras",
      canView : 'unauth'
    },
     {
      path: "/dashboard",
      text: "Painel administrativo",
      canView : 'auth',
      allowedRoles: [UserType.Funcionario]
    },
    {
      path: "/cidadao/new-complaint",
      text: "Criar denúncia",
      canView : 'auth',
      allowedRoles : [UserType.Cidadao]
    },
    {
      path: "/cidadao/complaints",
      text: "Minhas denúncias",
      canView : 'auth',
      allowedRoles : [UserType.Cidadao]
    },
  ];

canShowLink(link: IProtectedLink) {
  const user = this.authService.currentUser();

  if (link.canView === 'unauth') return !user;
  if (link.canView === 'auth') return !!user && (
    !link.allowedRoles || link.allowedRoles.length === 0 || link.allowedRoles.includes(user.tipo)
  );
  // 'both'
  if (user && link.allowedRoles && link.allowedRoles.length > 0) {
    return link.allowedRoles.includes(user.tipo);
  }
  return true;
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
    this.authService.logout();
  }
}
