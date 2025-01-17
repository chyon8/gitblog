import { PayPalButtons } from "@paypal/react-paypal-js";
import BASE_URL from "@/app/config";
const PayPalButton = ({userId}) => {
  return (
    <PayPalButtons
    style={{ shape: 'pill',
        color: 'blue',
        layout: 'vertical',
        label: 'subscribe'}}
      createSubscription={(data, actions) => {
        return actions.subscription.create({
         
          'plan_id': "P-1W7918522X3270506MZ7F5SQ",
          "custom_id": userId
        });
      }}
      onApprove={(data, actions) => {
        console.log('Subscription approved', data);
        window.location.href = `${BASE_URL}/redirect`;
      }}
      onError={(err) => {
        console.error('Subscription error', err);
      }}
     
    />
  );
};

export default PayPalButton;
