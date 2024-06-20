"use client"

import UserInfo from "@/components/UserInfo";

import { useSession  } from "next-auth/react";
import { Container } from "@mui/material";
import { redirect } from "next/navigation";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalButton from "@/components/PayPalButton";

const Payment = () => {
  
  const { status } = useSession();

  const initialOptions = {
    "client-id": "Acm6azZmwAjeR8KI4Cb-6pKVS-EScAQHGFYsIQd8-GqyZIQu7TblKWQS95fh_QtrvGXLNw6i7CFMlsM4",
    "vault": true 
  };


  if(status === "unauthenticated"){
    redirect('/login')
  }

  return (

    <Container >


<PayPalScriptProvider options={initialOptions}>
  <PayPalButton/>
</PayPalScriptProvider>

     </Container>


          )
 
 
};

export default Payment;



