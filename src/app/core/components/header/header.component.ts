import { Component, inject } from "@angular/core";
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { HeaderCidadaoComponent } from "./header-cidadao/header-cidadao.component";
import { Subject, filter, takeUntil } from "rxjs";
import { CommonModule } from "@angular/common";
import { PathService } from "@shared/services/path.service";
import { AuthService } from "@core/services/auth.service";
import { HeaderButtonsType, HeaderType } from "@core/models/header.model";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, HeaderCidadaoComponent, RouterLink],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  //Enums para utilização no HTML
  protected HeaderType = HeaderType;
  
  private authService = inject(AuthService);

  constructor(
    private router: Router,
    private path : PathService
  ) {}

  protected user = this.authService.getCurrentUser();
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
