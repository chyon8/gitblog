import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { priceId,customId } = body;  // Get the price ID from the request

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,  // Use the price ID from Stripe
          quantity: 1,
        },
      ],
      mode: 'subscription',  // Change mode to subscription
      success_url: `${request.headers.get('origin')}/profile`,
      cancel_url: `${request.headers.get('origin')}/profile`,
      metadata: {
        customId: customId,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
  }
}