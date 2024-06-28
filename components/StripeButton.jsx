'use client';

import { Box } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function SubscribeButton({ priceId,userId }) {
  const handleSubscribe = async () => {
    try {
      const stripe = await stripePromise;
      const response = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceId,
          customId: userId
        }),
      });
      const { sessionId } = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
  <Box sx={{display:'flex',justifyContent:'center'}}>
  <button onClick={handleSubscribe}
  style={{
    justifyContent:'center',
    backgroundColor: '#635BFF',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  }}>
    Subscribe</button>;
    </Box>
  )
}