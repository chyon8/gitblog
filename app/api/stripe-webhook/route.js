import User from "@/models/User"
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const dynamic = 'force-dynamic';

export async function POST(req) {
  

  try {


    const body = await req.json();
    const custom_id =body.data.object.metadata.customId
    const sub_id = body.data.object.subscription



    switch (body.type) {
      

        case 'customer.subscription.updated':
            const subscription = body.data.object;
            await handleSubscriptionUpdated(subscription,custom_id);
            break;

        case 'checkout.session.completed':   
          await handlePaid(custom_id,sub_id);
          break;

        case 'customer.subscription.deleted':
            await handleSubscriptionDeleted(body.data.object, custom_id);
            break;


      default:
        console.log(`Unhandled event type: ${body}`);
    }

    return NextResponse.json({status: 'processing'}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

async function handlePaid(userId,subId) {
  try {




    const userObjectId = new mongoose.Types.ObjectId(userId);
    const user = await User.findOne({ _id:userObjectId });
  

      if (user && !user.subscribed) {
        user.subscribed = true;
        user.subscriptionId = subId;
        user.credits=10
        await user.save();
        console.log('Subscription activated');
    
      } else {
        console.log('User not found for subscription activation');
      }

   
  
      return NextResponse.json({ status: 'completed' });


  
  } catch (error) {
    console.log('Error handling subscription activation:', error);
    throw error; // Rethrow the error to be caught in the main error handler
  }
}


async function handleSubscriptionUpdated(subscription,userId) {
    if (subscription.cancel_at_period_end) {
        try {
            const userObjectId = new mongoose.Types.ObjectId(userId);
            const user = await User.findOne({ _id:userObjectId });
        
            if (user && user.subscribed) {
              user.subscribed = false; 
              user.credits=50
              await user.save();
              console.log(`subscription cancelled`);
            } else {
              console.log('User not found for subscription cancellation');
            }
          } catch (error) {
            console.log('Error handling subscription cancellation:', error);
            throw error; // Rethrow the error to be caught in the main error handler
          }


    } else if (subscription.status === 'active') {
      // Subscription is active (could be a reactivation)
      await updateDatabase(subscription.customer, subscription.id, 'active');
    }
    // Handle other status changes as needed
  }




/*
async function handleSubscriptionDeleted(subscription,userId) {
  try {
    const user = await User.findOne({ userId });

    if (user) {
      user.subscribed = false; // Assuming 'subscribed' is a boolean field
      user.subscriptionId = null;
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
*/