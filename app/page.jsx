"use client";

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Box, Container, Button, Checkbox } from '@mui/material';
import { redirect } from 'next/navigation';
import PricingLanding from '@/components/PricingLanding';


export default function Dashboard() {
  const { data: session } = useSession();


  if(session){
    redirect('/dashboard')
  }
  

  return (
    <Container>
   
        <Box display='grid' sx={{gap:8}} >

        <Box >
          <Typography textAlign='center' variant="question">Landing Page</Typography>
      
            <Box sx={{  mt: '20px', justifyContent: 'center' }}>
              <Typography sx={{ textAlign: 'center', color: '#FFFFFF' }} fontSize="18px">Select a commit and click continue</Typography>
          
            </Box>
          </Box>

    <Box>
    <Typography sx={{mb:'20px'}} textAlign='center' variant="question">Pricing</Typography>
    <PricingLanding/>
    </Box>
         

        </Box>
   
    </Container>
  );
}
