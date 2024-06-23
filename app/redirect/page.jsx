"use client"

import { useEffect, useState } from 'react';

import { Box,CircularProgress,Typography,Container } from '@mui/material';
import BASE_URL from '../config';
export default function LoadingPage() {
  const [isProcessing, setIsProcessing] = useState(true);


  /*
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('/api/paypal-webhook');
        const data = await response.json();
        console.log(data)

        if (data.status === 'completed') {
          router.push('/profile');
        } else {
          setTimeout(checkStatus, 3000);
        }
      } catch (error) {
        console.error('Error checking subscription status:', error);
      }
    };

    checkStatus();
  }, [router]);
*/

useEffect(() => {
  // Set a timeout for 5 seconds to simulate processing and then redirect
  const timeout = setTimeout(() => {
    setIsProcessing(false);
    window.location.href=`${BASE_URL}/profile`
  }, 20000); // 5000 milliseconds = 5 seconds

  // Clean up the timeout if the component unmounts before the timeout completes
  return () => clearTimeout(timeout);
}, []);

  return (
    <Container>
      {isProcessing ? (
        <Box sx={{display:'grid',justifyItems:'center',height:'150px',mt:'50px'}}>
          <Typography textAlign='center' sx={{mb:'34px'}} variant='question'> Checking you out...hold tight!</Typography>
          <CircularProgress/>
         </Box>
      ) : (
        <Box>Redirecting...</Box>
      )}
    </Container>
  );
}
