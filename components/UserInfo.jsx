"use client";

import Image from "next/image";
import { Typography,Box,Button } from "@mui/material";
import { useSession,signOut } from "next-auth/react";
import BASE_URL from "@/app/config";
import Warning from "./Warning";
import { useState } from "react";
import PricingModal from "./PricingModal";

export default function UserInfo() {

  const { status, data: session } = useSession();
  const [open,setOpen]=useState(false)


const openModal = ()=>{
  setOpen(true)

}

  const cancelSub = async()=>{

try{
    //const response = await fetch(`${BASE_URL}/api/cancel-sub`, {
      const response = await fetch(`/api/cancel-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        reason: "Not satisfied with the service",
        subscriptionId:session.user.subscriptionId,
        customId:session.user.id
        
       
      })
    });



    window.location.reload();

    if (!response.ok) {
      throw new Error('Failed to cancel subscription');
    }


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
  <Box sx={{mt:'30px',display:'grid',gap:3}}><Typography variant="answer">You are on the <span style={{ color: '#00FF66' }}>Premium Plan</span> </Typography>

  <Button onClick={openModal}>
  <Typography variant="answer">Cancel Subscription</Typography>
  </Button>

  <Warning startTime={session?.user.startTime} open={open} setOpen={setOpen} handleCancel={() => cancelSub()} />

  </Box>
  
):
(<Box sx={{mt:'30px',display:'grid',gap:3}}><Typography variant="answer">You are on the <span style={{ color: '#00FF66' }}>Free Trial Plan</span></Typography>

<Button onClick={openModal}>
<Typography variant="answer">See what Premium Plan offers</Typography>
</Button>



<PricingModal open={open} setOpen={setOpen}  />



</Box>)
}

      </Box>
     
    );
  } else {
    return ;
  }
}






  
  