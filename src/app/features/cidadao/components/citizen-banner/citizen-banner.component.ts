import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "@core/services/auth.service";

@Component({
  selector: "app-citizen-banner",
  imports: [RouterLink],
  templateUrl: "./citizen-banner.component.html",
  styleUrl: "./citizen-banner.component.css",
})
export class CitizenBannerComponent {
  citizenButtonHovered: boolean = false;
  organizationButtonHovered: boolean = false;
  private authService = inject(AuthService);

  getButtonIcon(entity: "citizen" | "organization") {
    const hovered =
      entity == "citizen"
        ? this.citizenButtonHovered
        : this.organizationButtonHovered;
    return `icons/entities/${hovered ? "black" : "white"}/${entity}.svg`;
  }

  get isAuth() {
    return this.authService.currentUser();
  }
}
