import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css'],
})
export class DonateComponent {
  strikeCheckout: any = null;

  constructor() {}

  ngOnInit() {
    this.stripePaymentGateway();
  }

  checkout(amount) {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key:
        'pk_test_51HzfY0Lv1WEJ9BtvrLka1aIQdaHZ9pvnY9U8RTdLQHrHezUA1QqdpnfXi6wJPgZ4zFup7TGP54cu2n0RiE3YutMR00vO0Bp0Tp',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');
      },
    });

    strikeCheckout.open({
      name: 'Instagram',
      description: 'Premium payment',
      amount: amount * 100,
    });
  }

  stripePaymentGateway() {
    if (!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement('script');
      scr.id = 'stripe-script';
      scr.type = 'text/javascript';
      scr.src = 'https://checkout.stripe.com/checkout.js';

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key:
            'pk_test_51HzfY0Lv1WEJ9BtvrLka1aIQdaHZ9pvnY9U8RTdLQHrHezUA1QqdpnfXi6wJPgZ4zFup7TGP54cu2n0RiE3YutMR00vO0Bp0Tp',
          locale: 'auto',
          token: function (token: any) {
            console.log(token);
            alert('Payment via stripe successfull!');
          },
        });
      };

      window.document.body.appendChild(scr);
    }
  }
}
