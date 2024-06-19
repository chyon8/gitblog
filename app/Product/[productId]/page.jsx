"use client"

import {Container } from '@mui/material';
import ProductDetail from '@/components/ProductDetail';
import { useSession } from 'next-auth/react';

const ProductPage = () => {

const {data:session}=useSession()

const userId = session?.user?.id

  return (
    <Container>
   
   {/*<Box sx={{display:{xs:'grid',sm:'grid',md:'grid',lg:'flex'} }}>  </Box>*/}


   <ProductDetail userId={userId}/>

  
 
     </Container>
  );
};

export default ProductPage;
