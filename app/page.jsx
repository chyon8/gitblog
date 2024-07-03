/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from 'next-auth/react';
import { Typography, Box, Container, Button, Checkbox } from '@mui/material';
import { redirect } from 'next/navigation';
import PricingLanding from '@/components/PricingLanding';
import { useRouter } from 'next/navigation';
import HowItWorks from '@/components/HowItWorks';
import screenshot5 from '../public/images/screenshot5.png'
import screenshot3 from '../public/images/screenshot3.png'
import Link from 'next/link';
import VideoDemo from '@/components/videoDemo';
export default function LandingPage() {
  const { data: session,status } = useSession();
  const router = useRouter()

  if(status === "authenticated"){
    redirect('/dashboard')
  }
  

  const handleTry = ()=>{
    router.push('/login')
    }

    
  return (
    <Container>
   
        <Box display='grid' sx={{gap:8}} >
        <Box  >
          <Typography sx={{mb:'14px'}} textAlign='center' variant="question" fontWeight={700} fontSize={28}>Turn  <span style={{ color: '#00FF66' }}>Code</span> Commits into </Typography>
          <Typography sx={{mb:'14px'}} textAlign='center' variant="question" fontWeight={700} fontSize={28}>Compelling  <span style={{ color: '#00FF66' }}>Blog Posts</span></Typography>
      
            <Box sx={{  mt: '30px', textAlign: 'center'}}>
              <Typography sx={{ textAlign: 'center', color: '#FFFFFF',lineHeight:'1.8rem' }} fontSize="22px" fontWeight={500}>
                Craft detailed tech blogs
              </Typography>
              <Typography sx={{ mb:'14px',textAlign: 'center', color: '#FFFFFF',lineHeight:'1.8rem' }} fontSize="22px" fontWeight={500}>
                 directly from your commits.
              </Typography>
              <Typography sx={{ textAlign: 'center', color: '#FFFFFF',lineHeight:'1.8rem' }} fontSize="22px" fontWeight={500}>
                Share your development journey seamlessly.
              </Typography>
      
              <Link href='/dashboard'>
              <Button sx={{mt:'24px', color:'#0A0A0A', backgroundColor: '#00FF66'}} >
           <Typography fontWeight={700} fontSize='16px' >Get Started For Free</Typography>      
            </Button>
            </Link>
            <Typography variant='answer' sx={{mt:'10px'}} fontWeight={700} fontSize='11px' >No Credit Card Required</Typography> 
        
            </Box>

          </Box>

       

          <VideoDemo/>

          <HowItWorks/>


            <Box>
            <Typography sx={{mb:'14px'}} textAlign='center' fontWeight={700} fontSize='16px' variant='question'>Turn this into</Typography>
          <Box>
            <img style={{borderRadius:'16px' ,width:'100%', height:'100%'}} src={screenshot5.src} alt="screenshot" />
            </Box>

          <Box sx={{mt:'24px'}}>
          <Typography sx={{mb:'14px'}} textAlign='center' fontWeight={700} fontSize='16px' variant='question'>This:</Typography>
            <img style={{borderRadius:'16px' ,width:'100%', height:'100%'}} src={screenshot3.src} alt="screenshot" />

            </Box>
            </Box> 
          
   {/* <PricingLanding/> */}


   <Box sx={{display:'flex',justifyContent:'center',mb:'24px'}}>
          <Link href='/login'>
              <Button sx={{ color:'#0A0A0A', backgroundColor: '#00FF66'}} >
           <Typography fontWeight={700} fontSize='16px' >Get Started For Free</Typography>      
            </Button>
            </Link>
            </Box>



        </Box>
   
    </Container>
  );
}
