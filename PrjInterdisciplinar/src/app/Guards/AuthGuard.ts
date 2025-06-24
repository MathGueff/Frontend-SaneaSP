import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { SweetAlertService } from '../Services/sweetAlert.service';
import { Observable, of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    protected authService: AuthService,
    protected router: Router,
    protected sweetAlertService: SweetAlertService
  ) {}

  canActivate(): Observable<boolean> {
  const token = this.authService.getAuthToken();

  if (!token) {
    this.authService.logout();
    this.router.navigate(['/login']);
    return of(false);
  }

  return this.authService.getAutenticateUser().pipe(
    take(1), // Importante para completar o Observable após 1 emissão
    map(user => {
      this.authService.setCurrentUser(user);
      return true;
    }),
    catchError(error => {
      this.showGuardMessage(error.error.message);
      this.authService.logout();
      this.router.navigate(['/login']);
      return of(false);
    })
    );
  }

  private showGuardMessage(message: string) {
    this.sweetAlertService.showMessage(message, true);
  }
}
