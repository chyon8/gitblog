import User from "@/models/User";import { NextResponse } from "next/server";



export const dynamic = 'force-dynamic';

export async function POST(req) {

  try {
    //const session = await getServerSession();
  
    //const email = session.user.email

    const body = await req.json();
    const { event_type, resource } = body;

    switch (event_type) {
      case 'BILLING.SUBSCRIPTION.ACTIVATED':
        console.log('Subscription activated');
        await handleSubActivated(userId);
        break;

      case 'BILLING.SUBSCRIPTION.CANCELLED':
        console.log('Subscription cancelled');
        await handleCancel(userId);
        break;

      case 'PAYMENT.SALE.COMPLETED':
        console.log('Payment completed');
        // Handle payment completion logic here if needed
        break;

      case 'PAYMENT.SALE.DENIED':
      case 'BILLING.SUBSCRIPTION.SUSPENDED':
        console.log('Payment denied or subscription suspended');
        await handleCancel(userId);
        break;

      default:
        console.log(`Unhandled event type: ${event_type}`);
    }

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

async function handleSubActivated(userId) {
  try {
    const user = await User.findOne({ userId });

    if (user) {
      user.subscribed = true; // Assuming 'subscribed' is a boolean field
      await user.save();
      console.log(`subscription activated`);
    } else {
      console.log('User not found for subscription activation');
    }
  } catch (error) {
    console.log('Error handling subscription activation:', error);
    throw error; // Rethrow the error to be caught in the main error handler
  }
}

async function handleCancel(userId) {
  try {
    const user = await User.findOne({ userId });

    if (user) {
      user.subscribed = false; // Assuming 'subscribed' is a boolean field
      await user.save();
      console.log(`subscription cancelled`);
    } else {
      console.log('User not found for subscription cancellation');
    }
  } catch (error) {
    console.log('Error handling subscription cancellation:', error);
    throw error; // Rethrow the error to be caught in the main error handler
  }
}
