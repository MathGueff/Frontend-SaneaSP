import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { loadStripe } from "@stripe/stripe-js";

@Injectable({ providedIn: 'root' })
export class StripeService {
  public stripePromise = loadStripe('pk_test_51SUb5gBhdWqY9ebtDmcXONWCmcsUP484s3dEqoqZSMp9LDBWPS3c0MSKG2i84rO086wwy0lLEMIOY8Bw8Sl85mfX00C8LI35yo'); 

  constructor(private http: HttpClient) {}

  createPaymentIntent(amount: number, recordId: number) {
    return this.http.post<any>('/api/stripe/create-payment-intent', {
      amount,
      recordId
    });
  }

 async pay(clientSecret: string, cardElement: any) {
  const stripe = await this.stripePromise;
  return stripe!.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
    },
  });
}
}
