/* eslint-disable @next/next/no-img-element */

import { Typography, Box,Container } from '@mui/material';
import Link from 'next/link';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {


  return (
  
<Container>

<Box className="Footer" sx={{ mt: '15px', borderRadius: '15px', bgcolor: '#191919', paddingTop:'20px',paddingRight:'30px',paddingBottom:'20px',paddingLeft:'30px',
boxShadow: '5px 5px 10px 0px #000000',mb:'28px'
 }}>
    



<Box sx={{display:'flex',justifyContent:'center'}}>
<img src="https://i.ibb.co/XW9nnjg/gitblog-logo-custom.png" alt="logo" style={{width:'30px',height:'30px'}} />
<Typography fontSize='15px' sx={{ml:'5px', mb: '14px',color:'#FFFFFF',mr:"25px",mt:'7px' }}>GitBlog</Typography>
</Box>

<Box sx={{display:'flex',justifyContent:'center'}}>

<EmailIcon sx={{color:'#FFFFFF', mt:'3px',mr:'5px'}}/>
  <Link style={{textDecoration:'none'}} href="mailto:sellup.projects@outlook.com">
<Typography fontSize='15px' sx={{ mb: '14px',color:'#FFFFFF',mt:'7px',color:"#AAAAAA" }}>contact</Typography>
</Link>
</Box>


        <Box sx={{display:'flex',justifyContent:'center'}}>
        <Typography fontSize='14px' fontWeight='700px' sx={{mt:'3px',color:'#CCCCCC'}}>Copyright 2024 - All Right Reserved
    </Typography></Box> 

     
      </Box>


</Container>


  );
};

export default Footer;




