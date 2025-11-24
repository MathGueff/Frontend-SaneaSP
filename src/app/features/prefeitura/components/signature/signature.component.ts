import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { StripeService } from '@features/prefeitura/services/stripe.service';
import { ToastService } from '@shared/services/toast.service';
import { SweetAlertService } from '@shared/services/sweet-alert.service';

@Component({
  selector: 'app-signature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signature.component.html',
  styleUrl: './signature.component.css',
})
export class SignatureComponent {
  loading = false;
  isModalOpen = false;

  stripe: any;
  elements: any;
  cardElement: any;

  private sweetAlertService = inject(SweetAlertService);
  private toastService = inject(ToastService);

  constructor(
    private stripeService: StripeService,
    private cd: ChangeDetectorRef
  ) { }

  async ngAfterViewInit() {
    this.stripe = await this.stripeService.stripePromise;

    if (!this.stripe) {
      this.toastService.show({
        message: 'Stripe não foi carregado...',
        error: true
      });
    }
  }

  async abrirModalDePagamento() {
    this.isModalOpen = true;
    this.cd.detectChanges();

    await Promise.resolve(); // espera renderização
    await new Promise(r => setTimeout(r, 50)); // garante DOM pronto

    this.stripe = await this.stripeService.stripePromise;

    if (!this.stripe) {
      this.toastService.show({ message: 'Stripe não carregou', error: true });
      return;
    }

    if (!this.elements) this.elements = this.stripe.elements();

    const cardDiv = document.getElementById('card-element');

    if (cardDiv && !this.cardElement) {
      this.cardElement = this.elements.create('card', {
        style: {
          base: { fontSize: '16px', color: '#32325d' }
        }
      });
      this.cardElement.mount(cardDiv);
    }
  }

  fecharModal() {
    if (this.cardElement) {
      this.cardElement.destroy();
      this.cardElement = null;
    }
    this.isModalOpen = false;
  }

  pagar() {
    if (!this.cardElement) {
      this.toastService.show({ message: 'Erro ao carregar o campo de cartão.', error: true });
      return;
    }

    this.loading = true;

    this.stripeService.createPaymentIntent(5000, 123).subscribe(async (res) => {
      const result = await this.stripeService.pay(res.clientSecret, this.cardElement);

      this.loading = false;

      if (result.error) {
        this.toastService.show({
          message: "Erro no pagamento: " + result.error.message,
          error: true
        });
      } else if (result.paymentIntent?.status === 'succeeded') {
        this.sweetAlertService.confirmPayment();
        this.fecharModal();
      }
    });
  }
}
