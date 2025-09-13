import { Component } from "@angular/core";
import { INavbarLink } from "@core/models/navbar-link.model";
import { HeaderBase } from "../header-base";

@Component({
  selector: "app-header-landing",
  standalone: true,
  imports: [],
  templateUrl: "./header-landing.component.html",
  styleUrls: ["./header-landing.component.css", "../header.component.css"],
})
export class HeaderLandingComponent extends HeaderBase{
  navbarLinks: INavbarLink[] = [
    { path: "cidadao", name: "Criar denúncia", type : "page"},
    { path: "cidadao", name: "Administrar minha organização", type : "page"}
  ];
}
