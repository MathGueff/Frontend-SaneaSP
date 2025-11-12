import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderButtonsType } from "@core/models/header.model";
import { AuthService } from "@core/services/auth.service";
import { AuthorizationService } from "@core/services/authorization.service";
import { IProtectedLink } from "@shared/models/link.model";
import { UserType } from "@features/usuario/enums/user-type";

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
      accessRules: { requiresAuth: false, allowedRoles: [UserType.CIDADAO] },
    },
    {
      path: "/login",
      text: "Para prefeituras",
      accessRules: { requiresAuth: false, allowedRoles: [UserType.FUNCIONARIO] },
    },
    {
      path: "/cidadao/new-complaint",
      text: "Criar denúncia",
      accessRules: { requiresAuth: true, allowedRoles: [UserType.CIDADAO] },
    },
    {
      path: "/cidadao/complaints",
      text: "Minhas denúncias",
      accessRules: { requiresAuth: true, allowedRoles: [UserType.CIDADAO] },
    },
  ];

  canShowLink(link: IProtectedLink) {
  const { requiresAuth, allowedRoles } = link.accessRules;
  const user = this.authService.currentUser();

  // 1. Se não precisa de autenticação e usuário está deslogado, mostra para todos
  if (!requiresAuth && !user) return true;

  // 2. Se não precisa de autenticação, mas tem allowedRoles e usuário está logado, mostra só para quem pode
  if (!requiresAuth && user) {
    if (!allowedRoles || allowedRoles.length === 0) return true;
    return allowedRoles.includes(user.tipo);
  }

  // 3. Se precisa de autenticação e usuário não está logado, não mostra
  if (requiresAuth && !user) return false;

  // 4. Se precisa de autenticação e usuário está logado, mostra só para quem pode
  return !!user && allowedRoles.includes(user.tipo);
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
