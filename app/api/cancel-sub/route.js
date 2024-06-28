import User from "@/models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";


export const dynamic = 'force-dynamic';

async function getAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const tokenEndpoint = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';
  try {

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(clientId + ':' + clientSecret)}`
      },
      body: `grant_type=client_credentials`,
     
    });

    if (!response.ok) {
        const errorData = await response.json(); // Read error response from PayPal
        throw new Error(`Failed to obtain PayPal access token: ${response.status} - ${errorData.error_description}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error obtaining PayPal access token:', error.message);
    throw error;
  }
}

export async function POST(req) {
  try {
    // Obtain PayPal access token
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("PayPal access token not found");
    }

    // Get user session and email
    const session = await getServerSession(req);
    const email = session.user.email;

    // Find user by email and retrieve subscriptionId
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const subId = user.subscriptionId;
    if (!subId) {
      throw new Error("Subscription ID not found for the user");
    }

    // Cancel subscription request to PayPal API
    const response = await fetch(`https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subId}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "reason": "Not satisfied with the service"
      })
    });


        user.subscribed = false;
        user.credits=100
        await user.save();
   
    

    // Update your database to reflect subscription cancellation
    // Example: user.subscribed = false; await user.save();

    const data = await response.json();

    // Return success response
    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.error('Error in cancel subscription request:', err);
    return NextResponse.json({ message: "Error", error: err.message }, { status: 500 });
  }
}
