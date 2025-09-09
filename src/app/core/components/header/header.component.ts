import { Component } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from "@angular/router";
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

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentContext = this.getActualParent(event.url);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buttonOnClick(method : 'login' | 'register'){
    const currentUrl = this.router.url;
    const parent = this.getActualParent(currentUrl);
    if(parent != 'principal')
      this.router.navigate([`${parent}/${method}`]);
  }

  getActualParent(url : string){
    if (url.startsWith("/cidadao")) {
      return "cidadao";
    } else if (url.startsWith("/organizacao")) {
      return "organizacao";
    } else {
      return "principal";
    }
  }
}
