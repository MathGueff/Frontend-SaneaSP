import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { SweetAlertService } from '@shared/services/sweet-alert.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
    selector: 'app-confirmation-page',
    imports: [],
    templateUrl: './confirmation-page.component.html',
    styleUrl: './confirmation-page.component.css'
})
export class ConfirmationPageComponent {
private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private sweetAlertService = inject(SweetAlertService);
  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.handleRegistrationConfirmation();
  }

  private handleRegistrationConfirmation(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      this.authService.confirmRegistration(token).subscribe({
        next: () => {
          this.sweetAlertService.confirmLogin('Cadastro confirmado com sucesso! ✅');
          this.router.navigate(['/inicio'], { 
            state: { confirmed: true },
            queryParams: { token: null }, 
            queryParamsHandling: 'merge' 
          });
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Falha ao confirmar o cadastro. O link pode ter expirado.';
          this.toastService.show({message : errorMessage, error})
          this.router.navigate(['/cidadao/register'], { 
            state: { confirmed: false },
            queryParams: { token: null },
            queryParamsHandling: 'merge'
          });
        }
      });
    }
  }

}
