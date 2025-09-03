import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { INavbarLink } from "@core/models/navbar-link.model";
import { HeaderComponent } from "../header.component";
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
    { path: "cidadao", name: "Administrar minha região", type : "page"},
    { path: "about-us", name: "Sobrenós", type : "section" },
    { path: "faq", name: "Perguntas frequentes", type : "section" },
  ];
}
