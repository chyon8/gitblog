
/* eslint-disable @next/next/no-img-element */

import { Box } from '@mui/material';
import { useState } from 'react';


const ProductThumbnail = ({product}) => {



  return (
    <Box className="productImg" sx={{
  
        width: '100%', height: '350px',
        background: 'linear-gradient(180.00deg, rgba(25, 25, 25, 0) 49.967%,rgba(25, 25, 25, 0.7) 100%)'
      }}>
        <img style={{ borderRadius: '20px', width: '100%', height: '100%' }}
          src={product?.thumbnail && product.thumbnail.length > 0 ? product.thumbnail : "https://i.ibb.co/Bc10XpB/sellup.jpg"}
          alt='product'
        />
      </Box>
  );
};

export default ProductThumbnail;


