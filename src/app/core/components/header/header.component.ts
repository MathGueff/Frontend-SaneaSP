import { Component } from "@angular/core";
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { HeaderLandingComponent } from "./header-landing/header-landing.component";
import { HeaderCidadaoComponent } from "./header-cidadao/header-cidadao.component";
import { Subject, filter, takeUntil } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, HeaderLandingComponent, HeaderCidadaoComponent, RouterLink],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  public currentContext: "principal" | "cidadao" | "organizacao" = "principal";
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        if (event.url.startsWith("/cidadao")) {
          this.currentContext = "cidadao";
        } else if (event.url.startsWith("/organizacao")) {
          this.currentContext = "organizacao";
        } else {
          this.currentContext = "principal";
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
