"use client";

import Image from "next/image";
import { Typography,Box,Button } from "@mui/material";
import { useSession,signOut } from "next-auth/react";
import Link from "next/link";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalButton from "@/components/PayPalButton";
import BASE_URL from "@/app/config";
import Warning from "./Warning";
import { useState } from "react";

export default function UserInfo() {

  const { status, data: session } = useSession();
  const [open,setOpen]=useState(false)

  const initialOptions = {
    "client-id": "Acm6azZmwAjeR8KI4Cb-6pKVS-EScAQHGFYsIQd8-GqyZIQu7TblKWQS95fh_QtrvGXLNw6i7CFMlsM4",
    "vault": true 
  };

const openModal = ()=>{
  setOpen(true)
}

  const cancelSub = async()=>{

try{
    const response = await fetch(`${BASE_URL}/api/cancel-sub`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        reason: "Not satisfied with the service",
       
      })
    });

    window.location.reload();

    if (!response.ok) {
      throw new Error('Failed to cancel subscription');
    }

    //const data = await response.json();
    //console.log('Subscription cancelled successfully:', data);

  } catch (error) {
    console.error('Error cancelling subscription:', error.message);
  }

  }



  if (status === "authenticated") {
    return (
      <Box>


        <Box display='flex'>
        <Image
          className="rounded-full"
          src={session?.user?.image}
          width={60}
          height={60}
          alt="user"
        />
        <Box sx={{disaply:'grid',gap:3,ml:'15px',mt:'8px'}}>
        <Typography sx={{ml:'8px',mb:'5px'}} variant="answer" > {session?.user?.name}</Typography>
        <Button sx={{  color:'#FFFFFF',
            backgroundColor: '#252525',}} onClick={() => signOut()} 
      ><Typography >Sign out</Typography>
    </Button>
   
        </Box>

    
    
        </Box>


{session?.user.subscribed ? (
  <Box sx={{mt:'30px',display:'grid',gap:3}}><Typography variant="answer">You are on the Premium Plan</Typography>

  <Button onClick={openModal}>
  <Typography variant="answer">Cancel Subscription</Typography>
  </Button>

  <Warning open={open} setOpen={setOpen} handleCancel={() => cancelSub()} />

  </Box>
  
):
(<Box sx={{mt:'30px',display:'grid',gap:3}}><Typography variant="answer">You are on the Free Trial Plan</Typography>
<Link  href={`/payment/${session.user.id}`}>
<Button>
<Typography variant="answer">See what Premium Plan offers</Typography>
</Button>
</Link>

<PayPalScriptProvider options={initialOptions}>
  <PayPalButton userId={session.user.id}/>
</PayPalScriptProvider>

</Box>)
}

  

  

      


      </Box>
     
    );
  } else {
    return ;
  }
}






  
  