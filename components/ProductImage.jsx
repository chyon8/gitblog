/* eslint-disable @next/next/no-img-element */
"use client";

import { Box, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import { useState } from 'react';

function ProductImage({ product }) {
  const fallbackImage = "nothing"; 

  return (
    <Box>
      {product.productImages && product.productImages.length > 0 ? (
        <Box>
          {product.productImages.map((image, index) => (
            <Box
              key={index}
              component="img"
              sx={{
                mt:'20px',
                borderRadius: '20px',
                width: '100%',
                height: '100%',
                //objectFit: 'cover'
                minHeight:'object-fit'
              }}
              src={image}
              alt={`productImage-${index}`}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop if fallback image also fails
                e.target.src = fallbackImage;
              }}
            />
          ))}
        </Box>
      ) : (
        <Typography variant='answer'>이미지가 없습니다</Typography>
      )}
    </Box>
  );
}

export default ProductImage;