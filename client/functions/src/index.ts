import * as functions from 'firebase-functions';

// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_51HzfY0Lv1WEJ9BtvvAr8OEkCdxmZd4ZS3MoJCpkHLt56SFnEryiVEIDOOwT8iLQ87XpmTYiRkYYPJ9Hxaxb9fSar00VEeheDni');

export const createCheckoutSession = functions.https.onCall(async (data, context) => {
  const { product_name, unit_amount, quantity } = data;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product_name // this name will show up in your client side checkout session as the item the user is buying
          },
          unit_amount: unit_amount * 100 // the amount for the product multiplied by 100 ($5.34 is represented as 534)
        },
        quantity // a number representing the amount of the product_name your user is buying. This will be multiplied by the price to get the total cost for the user.
      }
    ],
    mode: 'payment',
    success_url: 'http://localhost:4200/premium?' +
                 'session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:4200/premium'
  });
  return session.id;
});