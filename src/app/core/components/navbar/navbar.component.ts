import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderButtonsType } from "@core/models/header.model";
import { AuthService } from "@core/services/auth.service";
import { AuthorizationService } from "@core/services/authorization.service";
import { IProtectedLink } from "@shared/models/link.model";

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
      access: { requiresAuth: false },
    },
    {
      path: "/cidadao/new-complaint",
      text: "Criar denúncia",
      access: { requiresAuth: true },
    },
    {
      path: "/cidadao/complaints",
      text: "Minhas denúncias",
      access: { requiresAuth: true },
    },
  ];

  canShowLink(link: IProtectedLink) {
    return (
      (link.access.requiresAuth && this.authService.currentUser()) ||
      !link.access.requiresAuth
    );
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
