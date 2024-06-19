/* eslint-disable @next/next/no-img-element */
"use client";

import { Box,Typography } from "@mui/material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';


function ProductPrice({product}) {




  
    return  (
        <Box>
        
        <Typography sx={{ mb: '14px' }} variant="question">가격</Typography>

        {product.price ?
        <Box sx={{display:'flex'}}><LocalOfferIcon sx={{mr:'6px',color:'#FFFFFF'}} />
        <Typography variant='answer' sx={{mt:'3px'}}>{product.price.toLocaleString()}원</Typography></Box> 

        :  <Box sx={{display:'flex'}}><LocalOfferIcon sx={{mr:'6px',color:'#FFFFFF'}} />
        <Typography  variant='answer'>합의 가능</Typography></Box>}
      </Box>
    
  )}
  
  export default ProductPrice;
  