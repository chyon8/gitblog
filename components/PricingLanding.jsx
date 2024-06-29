"use client"

import { Box, Button, Typography, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';


function PricingLanding() 
{
    const router = useRouter()

const handleTry = ()=>{
router.push('/login')
}


  return (

    <Box>

      <Box
        sx={{
          display: 'grid',
          boxSizing: 'border-box',
          borderRadius: '16px',
          background: '#252525',
            mb:'20px',
          outline: 'none',
        }}
      >
        <Box>

        
        </Box>
        <Box sx={{ alignContent: 'center', justifyContent: 'center', display: 'grid' }}>
        
          <Box sx={{pl:1,pr:1}}>
          <Typography fontSize='28px' fontWeight={600} sx={{ mt: '45px', color:'#FFFFFF' }} textAlign="center">
         Monthly Subscription
          </Typography>
          <Typography fontWeight={700} fontSize='44px' sx={{ mt: '25px', color:'#00FF66',mb:'20px' }} textAlign="center">
          $9.99
          </Typography>
          <Divider  sx={{background:'#222222', height:'2px', mb:'20px'}}/>
        
        <Box className="features" sx={{display:'grid',gap:3}}>
          <Box sx={{display:'flex'}}>
          <AddIcon sx={{color:'#00FF66',mr:'5px'}}/>
            <Typography sx={{color:'#FFFFFF',mt:'3px'}} fontWeight={700} fontSize='16px'>Organization Repo Access</Typography>
            </Box>
            <Box sx={{display:'flex'}}>
            <AddIcon sx={{color:'#00FF66',mr:'5px'}}/>
            <Typography sx={{color:'#FFFFFF',mt:'3px'}} fontWeight={700} fontSize='16px'>Unlimited Blog Generation </Typography>
            </Box>  

        </Box>
        <Link href="/dashboard">
        <Button onClick={handleTry} sx={{mt:'24px', color:'#0A0A0A', backgroundColor: '#00FF66',}} fullWidth>
           <Typography fontWeight={700} fontSize='16px' >Get Started For Free</Typography>
            </Button>
            </Link>
          </Box>
      
          

        </Box>
        <Box sx={{mt:'34px', pl: '8px', pr: '8px', pb: '16px' }}>

        </Box>
      </Box>
      </Box>

  );
}

export default PricingLanding;
