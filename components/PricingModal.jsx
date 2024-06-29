"use client"

import { Box, Modal, Typography, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalButton from "@/components/PayPalButton";
import { useSession } from 'next-auth/react';
import AddIcon from '@mui/icons-material/Add';
import StripeButton from './StripeButton';

function PricingModal({open,setOpen,handleCancel}) 
{
  const handleClose = () => setOpen(true);
  const [processing,setProcessing]=useState(false)
  const { status, data: session } = useSession();

  const initialOptions = {
    "client-id": "AcTZHsJO96QZcVXAqX-X9ClcqXlx0-iWAawelzeuzzHLD8a4hto4zfKzsvzdfecVZyWRmicCemVonYZx",
    "vault": true 
  };

const priceId="price_1PWbxJHKlhoYzMOlCDqa0UZ8"
//const priceId="price_1PWeRAHKlhoYzMOl3NMfLvYN"  live mode
  
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          display: 'grid',
          top: '50%',
          left: '50%',
          boxSizing: 'border-box',
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgb(52, 52, 52)',
          borderRadius: '16px',
          background: '#252525',
          width: '500px',
          //height: '178px',
          outline: 'none',
        }}
      >
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <CloseIcon
            onClick={() => setOpen(false)}
            style={{ position: 'absolute', top: 12, left: 450, width: '15', height: '15', color:'#FFFFFF' }}
          />
        </Box>
        <Box sx={{ alignContent: 'center', justifyContent: 'center', display: 'grid' }}>
        
          <Box sx={{pl:1,pr:1}}>
          <Typography fontSize='28px' fontWeight={600} sx={{ mt: '45px', color:'#FFFFFF' }} textAlign="center">
         Monthly Subscription
          </Typography>
          <Typography fontWeight={700} fontSize='44px' sx={{ mt: '25px', color:'#00FF66',mb:'20px' }} textAlign="center">
          $9.99
          </Typography>
          <Divider  sx={{background:'#222222',width:'450px', height:'2px', mb:'20px'}}/>
        
          <Box className="features" sx={{display:'grid',gap:3,justifyContent:'center'}}>
          <Box sx={{display:'flex'}}>
          <AddIcon sx={{color:'#00FF66',mr:'5px'}}/>
            <Typography sx={{color:'#FFFFFF',mt:'3px'}} fontWeight={700} fontSize='16px'>Organization Repo Access</Typography>
            </Box>
            <Box sx={{display:'flex'}}>
            <AddIcon sx={{color:'#00FF66',mr:'5px'}}/>
            <Typography sx={{color:'#FFFFFF',mt:'3px'}} fontWeight={700} fontSize='16px'>Unlimited Blog Generation </Typography>
            </Box>  

        </Box>

          </Box>
          {processing && (<Typography fontSize='11px' sx={{ color:'#00FF66', mt: '16px', mb: '24px' }} textAlign="center">
            Canceling the subscription...
          </Typography>)}
          

        </Box>
        <Box sx={{mt:'34px', pl: '8px', pr: '8px', pb: '16px' }}>
    <StripeButton priceId={priceId} userId={session.user.id}/>
{/*
          <PayPalScriptProvider options={initialOptions}>
  <PayPalButton userId={session.user.id}/>
</PayPalScriptProvider>

*/}

        </Box>
      </Box>
    </Modal>
  );
}

export default PricingModal;
