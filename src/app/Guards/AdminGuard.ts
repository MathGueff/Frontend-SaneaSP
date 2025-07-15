import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { SweetAlertService } from '../Services/sweetAlert.service';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(
    protected authService: AuthService,
    protected router: Router,
    protected sweetAlertService: SweetAlertService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      filter(user => user !== null || !this.authService.getAuthToken()),
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
