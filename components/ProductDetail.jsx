
'use client'

/* eslint-disable @next/next/no-img-element */


import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BASE_URL from '@/app/config';
import { Typography, Box, Button,Avatar } from '@mui/material';
import ProductDescBody from './ProductDescBody';
import ProductImage from './ProductImage';
import ProductThumbnail from './ProductThumbnail';
import ProductPrice from './ProductPrice';
import ProductDetailLeft from './ProductDetailLeft';
import TimeSincePost from './TImeSincePost';
import SkeletonDetail from './SkeletonDetail';
import SkeletonDetailSocial from './SkeletonDetailSocial';
import CustomCarousel from './CustomCarousel';
import Carousel from 'react-material-ui-carousel';

const ProductDetail = (userId) => {
  const router = useParams();
  const productId = router.productId;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/Product/${productId}`);
        const result = await response.json();
        setProduct(result.product);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [productId]);



  if (loading) {
    return (
      <Box sx={{ display:{xs:'grid',sm:'grid',md:'grid',lg:'flex'}}}>
      
    
    <SkeletonDetail/>
   

    <SkeletonDetailSocial/>
    </Box>)
  }


  if (!product) {
    return <Typography variant='answer' fontweight="600">Product not found</Typography>;
  }

  return (

    <>
    
    <Box sx={{ display: 'grid' }}>



        <Box className="productDetail" sx={{ display: { xs: 'grid', sm: 'grid', md: 'grid', lg: 'flex' }, border: '1px solid #222222', borderRadius: '20px', padding: { xs: '0px', sm: '25px', md: '25px', lg: '25px' } }}>

          <Box className="productDetailLeft" sx={{ flex: 2 }}>
            <ProductThumbnail product={product} />
            {/*
          <Box className="index" sx={{
            zIndex: 1, position: 'sticky',
            //top: 0,
            mt: '15px',
            gap: { xs: 1, sm: 5, md: 5, lg: 5 }, padding: '15px',
            bgcolor: '#191919', borderRadius: '15px',
            display: { xs: 'grid', sm: 'flex', md: 'flex', lg: 'flex' }
          }}>
            <Button><Typography fontSize='14px' fontWeight='700'>프로젝트 설명</Typography></Button>
            <Button><Typography fontSize='14px' fontWeight='700'> 프로젝트 이미지</Typography></Button>
            <Button><Typography fontSize='14px' fontWeight='700'>가격</Typography></Button>
          </Box>
          */}

            <Box className="index" sx={{
              zIndex: 1, position: 'sticky',
              top: 0,
              mt: '15px',
              gap: { xs: 1, sm: 5, md: 5, lg: 5 }, padding: '15px',
              bgcolor: '#191919', borderRadius: '15px',
              display: { xs: 'grid', sm: 'flex', md: 'flex', lg: 'flex' }
            }}>

              <Box sx={{ display: 'flex' }}>
                <Avatar src={product.user.image} />
                <Typography sx={{ mt: '13px', ml: '13px' }} variant='answer'>{product.user.name}</Typography>
                <Typography fontSize='11px' fontWeight='600' sx={{ color: 'rgb(168, 168, 168)', ml: '6px', textAlign: 'left', mt: '16px' }}>
                  <TimeSincePost createdAt={product.createdAt} />
                </Typography>
              </Box>


            </Box>


            <Box className="price" sx={{ mt: '15px', borderRadius: '20px', bgcolor: '#252525', padding: '25px' }}>
              <ProductPrice product={product} />
            </Box>


            <Box className="projectDesc" sx={{ mt: '15px', borderRadius: '20px', bgcolor: '#252525', padding: '25px' }}>
              <ProductDescBody product={product} />
            </Box>

            <Box className="projectImg" sx={{ mt: '15px', borderRadius: '20px', bgcolor: '#252525', padding: '25px' }}>
           
       <Box sx={{ zIndex: 0 }} autoPlay={false}>
              <ProductImage product={product} />
              </Box> 



            </Box>
          </Box>



          <Box className="productRight" display="grid" sx={{
            flex: 1, borderRadius: '20px', mt: '25px', flex: 1, position: 'sticky', top: 0, zIndex: 1,
            mb: '15px', ml: { lg: '30px' }, height: 'fit-content'
          }}>
            <ProductDetailLeft userId={userId} />
          </Box>


        </Box>

      </Box></>


  );
};

export default ProductDetail;





