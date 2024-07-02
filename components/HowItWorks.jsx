"use client"

import { Box, Button, Typography, Divider } from '@mui/material';



import AddIcon from '@mui/icons-material/Add';

function HowItWorks() 
{




  return (

    <Box>
      <Box
        sx={{
          display: 'grid',
          boxSizing: 'border-box',
          borderRadius: '16px',
         
            mb:'20px',
          outline: 'none',
        }}
      >
        <Box>

        
        </Box>
        <Box sx={{  justifyContent: 'center', display: 'grid' }}>
        
          <Box sx={{pl:1,pr:1}}>
          <Typography fontSize='28px' fontWeight={600} sx={{ mt: '15px', color:'#FFFFFF' }} textAlign="center">
         How It Works
          </Typography>

          <Typography fontWeight={700} fontSize='36px' sx={{ mt: '25px', color:'#00FF66',mb:'20px' }} textAlign="left">
          Step 1.
          </Typography>
          <Typography fontWeight={500} fontSize='20px' sx={{ mt: '25px', color:'#FFFFFF',mb:'20px' }} textAlign="left">
          Connect your Github Account
          </Typography>

          <Typography fontWeight={700} fontSize='36px' sx={{ mt: '25px', color:'#00FF66',mb:'20px' }} textAlign="left">
          Step 2.
          </Typography>
          <Typography fontWeight={500} fontSize='20px' sx={{ mt: '25px', color:'#FFFFFF',mb:'20px' }} textAlign="left">
          Select your repos and commits you want.
          </Typography>

          <Typography fontWeight={700} fontSize='36px' sx={{ mt: '25px', color:'#00FF66',mb:'20px' }} textAlign="left">
          Step 3.
          </Typography>
          <Typography fontWeight={500} fontSize='20px' sx={{ mt: '25px', color:'#FFFFFF',mb:'20px' }} textAlign="left">
          Start Creating.
          </Typography>

          <Typography fontWeight={700} fontSize='36px' sx={{ mt: '25px', color:'#00FF66',mb:'20px' }} textAlign="left">
          Step 4.
          </Typography>
          <Typography fontWeight={500} fontSize='20px' sx={{ mt: '25px', color:'#FFFFFF'}} textAlign="left">
          Customize and publish. It is that easy.
          </Typography>

   
     
          </Box>
      
          

        </Box>
        <Box sx={{ pl: '8px', pr: '8px', pb: '16px' }}>

        </Box>
      </Box>
      </Box>

  );
}

export default HowItWorks;
