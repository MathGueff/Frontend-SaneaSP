import { CommonModule } from "@angular/common";
import { Component, HostListener, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderButtonsType } from "@core/models/header.model";
import { AuthService } from "@core/services/auth.service";
import { AuthorizationService } from "@core/services/authorization.service";
import { UserType } from "@features/usuario/enums/user-type";
import { IProtectedLink } from "@shared/models/protected-link";
import { SweetAlertService } from "@shared/services/sweet-alert.service";

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
  protected sweetAlertService = inject(SweetAlertService);

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

get user() {
  return this.authService.currentUser();
}

get userIsEmployee() {
  return this.authService.isAdmin;
}

canShowLink(link: IProtectedLink) {
  if (link.canView === 'unauth') return !this.user;
  if (link.canView === 'auth') return !!this.user && (
    !link.allowedRoles || link.allowedRoles.length === 0 || link.allowedRoles.includes(this.user.tipo)
  );
  // 'both'
  if (this.user && link.allowedRoles && link.allowedRoles.length > 0) {
    return link.allowedRoles.includes(this.user.tipo);
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
    this.sweetAlertService.logout();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.dropdownOpen) {
      this.closeDropdown();
    }
  }
}
