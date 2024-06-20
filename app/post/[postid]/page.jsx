"use client"

import {Container } from '@mui/material';
import { useSession } from 'next-auth/react';
import PostDetail from '@/components/PostDetail';

const ProductPage = () => {

const {data:session}=useSession()

const userId = session?.user?.id

  return (
    <Container>
   



   <PostDetail userId={userId}/>

  
 
     </Container>
  );
};

export default ProductPage;
