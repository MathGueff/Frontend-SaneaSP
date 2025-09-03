import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { INavbarLink } from "@core/models/navbar-link.model";

@Component({
  selector: "app-header-landing",
  standalone: true,
  imports: [],
  templateUrl: "./header-landing.component.html",
  styleUrls: ["./header-landing.component.css", "../header.component.css"],
})
export class HeaderLandingComponent {
  private router = inject(Router);

  navbarLinks: INavbarLink[] = [
    { path: "cidadao", name: "Criar denúncia", type : "page"},
    { path: "", name: "Administrar minha região", type : "page"},
    { path: "about-us", name: "Sobrenós", type : "section" },
    { path: "faq", name: "Perguntas frequentes", type : "section" },
  ];

  linkAction(link: INavbarLink) {
    switch (link.type) {
      case "page":
        this.navigateTo(link.path);
        break;
      case "section":
        this.scrollTo(link.path);
        break;
    }
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`])
  }

  scrollTo(id: string) {
    const link = document.getElementById(id);
    if (link) link.scrollIntoView({ behavior: "smooth" });
  }
}
