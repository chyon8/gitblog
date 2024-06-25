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
         How It Works
          </Typography>
          <Typography fontWeight={700} fontSize='36px' sx={{ mt: '25px', color:'#00FF66',mb:'20px' }} textAlign="center">
          Connect Your Repos
          </Typography>
          <Typography fontWeight={500} fontSize='20px' sx={{ mt: '25px', color:'#FFFFFF',mb:'20px' }} textAlign="center">
          Sign in with your GitHub or GitLab account and select the repositories and commits you want to use.
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
            <Box sx={{display:'flex'}}>
            <AddIcon sx={{color:'#00FF66',mr:'5px'}}/>
            <Typography sx={{color:'#FFFFFF',mt:'3px'}} fontWeight={700} fontSize='16px'>Give Detailed Instruction To Model</Typography>
            </Box>
            <Box sx={{display:'flex'}}>
            <AddIcon sx={{color:'#00FF66',mr:'5px'}}/>
            <Typography sx={{color:'#FFFFFF',mt:'3px'}} fontWeight={700} fontSize='16px'>Give Examples To Model</Typography>
            </Box>
            <Box sx={{display:'flex'}}>
            <AddIcon sx={{color:'#00FF66',mr:'5px'}}/>
            <Typography sx={{color:'#FFFFFF',mt:'3px'}} fontWeight={700} fontSize='16px'>...And More</Typography>
            </Box>

        </Box>
        
     
          </Box>
      
          

        </Box>
        <Box sx={{mt:'34px', pl: '8px', pr: '8px', pb: '16px' }}>

        </Box>
      </Box>
      </Box>

  );
}

export default HowItWorks;
