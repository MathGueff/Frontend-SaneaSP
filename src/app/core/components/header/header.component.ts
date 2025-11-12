import { Component, inject } from "@angular/core";
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { Subject, filter, takeUntil } from "rxjs";
import { PathService } from "@shared/services/path.service";
import { AuthService } from "@core/services/auth.service";
import { HeaderType } from "@core/models/header.model";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: "app-header",
    imports: [NavbarComponent, RouterLink],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.css"
})
export class HeaderComponent {
  //Enums para utilização no HTML
  protected HeaderType = HeaderType;
  private authService = inject(AuthService);

  constructor(
    private router: Router,
    private path : PathService
  ) {}

  protected user = this.authService.currentUser();
  public currentContext: HeaderType = HeaderType.CIDADAO;
  private destroy$ = new Subject<void>();
  
  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentContext = this.path.getActualParent(event.url);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
