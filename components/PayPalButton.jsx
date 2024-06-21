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
         
          'plan_id': "P-47922282H07186007MZ2RY4I",
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
