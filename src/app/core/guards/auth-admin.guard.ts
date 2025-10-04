import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthTokenStorageService } from '@core/auth/services/auth-token-storage.service';
import { AuthService } from '@core/services/auth.service';
import { SweetAlertService } from '@shared/services/sweet-alert.service';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(
    protected authService: AuthService,
    protected authTokenStorageService : AuthTokenStorageService,
    protected router: Router,
    protected sweetAlertService: SweetAlertService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      filter(user => user !== null || !this.authTokenStorageService.get()),
      take(1),
      map(user => {
        if (user && user.nivel == 1) return true;

        this.router.navigate([user && user.nivel == 0
          ? '/'
          : '/login'
        ]);
        return false;
      })
    );
  }
}
