import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    protected authService: AuthService,
    protected router: Router,
  ) {}

  canActivate(): boolean {
    // Não precisa ser assíncrono pois APP_INITIALIZER já garantiu que auth está ready
    if (this.authService.isLoggedIn()) {
      return true;
    }
    
    this.router.navigate(['/inicio']); 
    return false;
  }
}
