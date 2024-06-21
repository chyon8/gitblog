import User from "@/models/User"
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const dynamic = 'force-dynamic';

export async function POST(req) {

  try {


    const body = await req.json();
    const { event_type,resource, billing_info } = body;
    



    switch (event_type) {
      case 'BILLING.SUBSCRIPTION.ACTIVATED':
        console.log('Subscription activated');
        //await handleSubActivated(body.custom_id);
        break;

      case 'BILLING.SUBSCRIPTION.CANCELLED':
        console.log('Subscription cancelled');
        //console.log(body)
        await handleCancel();
        break;

      case 'PAYMENT.SALE.COMPLETED':
        console.log('Payment completed');
        await handleSubActivated(resource.custom,resource.billing_agreement_id, billing_info.next_billing_time);

        break;

        case 'BILLING.SUBSCRIPTION.CREATED':
          console.log("created");
          
  
          break;

      case 'PAYMENT.SALE.DENIED':
      case 'BILLING.SUBSCRIPTION.SUSPENDED':
        console.log('Payment denied or subscription suspended');
        await handleCancel();
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

async function handleSubActivated(userId,subId,nextBill) {
  try {
   
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const user = await User.findOne({ _id:userObjectId });

    if (user) {
      user.subscribed = true;
      user.subscriptionId= subId
      user.nextBilling=nextBill
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
