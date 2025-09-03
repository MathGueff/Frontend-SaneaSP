// header-base.ts
import { Directive } from "@angular/core";
import { Router } from "@angular/router";
import { INavbarLink } from "@core/models/navbar-link.model";

@Directive() // <- faz o Angular reconhecer e poder injetar dependências
export abstract class HeaderBase {
  constructor(protected router: Router) {}

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
    this.router.navigate([`/${path}`]);
  }

  scrollTo(id: string) {
    const link = document.getElementById(id);
    if (link) link.scrollIntoView({ behavior: "smooth" });
  }
}
