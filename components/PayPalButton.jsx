import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({userId}) => {
  return (
    <PayPalButtons
    style={{ shape: 'pill',
        color: 'blue',
        layout: 'vertical',
        label: 'subscribe'}}
      createSubscription={(data, actions) => {
        return actions.subscription.create({
         
          'plan_id': "P-4831881123204870WMZ2ZCRY",
          "custom_id": userId
        });
      }}
      onApprove={(data, actions) => {
        console.log('Subscription approved', data);
        // You can call your server here to save the subscription details
      }}
      onError={(err) => {
        console.error('Subscription error', err);
      }}
    />
  );
};

export default PayPalButton;