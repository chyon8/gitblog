/* eslint-disable @next/next/no-img-element */
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BASE_URL from '@/app/config';
import { Typography, Box, Button } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import Link from 'next/link';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useSession, signIn } from "next-auth/react";
import EditProjectLink from './EditProjectLink';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import AddIcon from '@mui/icons-material/Add';

const ProductDetailLeft = ({userId}) => {
  const router = useParams();
  const productId = router.productId;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { status, data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [socialType, setSocialType] = useState(null);

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


  if (!product) {
    return <p>Product not found</p>;
  }

  const formatLink = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      return `https://${link}`;
    }
    return link;
  };

  const projectLink = formatLink(product.projectLink);
  const socialLink1 = formatLink(product.social1);
  const socialLink2 = formatLink(product.social2);
  const socialLink3 = formatLink(product.social3);

  const handleEditClick = (type) => {
    setSocialType(type);
    setOpen(true);
  };

  const handleContact = async () => {
    try {
    
      const response = await fetch(`${BASE_URL}/api/Product/analytics`, {
        method: 'POST',
        body: JSON.stringify({productId,userId:userId.userId}),
       
      });

      if (!response.ok) {
        throw new Error('Failed to add in db');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };




  return (
    <Box sx={{  bgcolor: '#252525', borderRadius: '20px', paddingTop: '20px', paddingBottom: '20px' }}>
      {status === "authenticated" ? (
        <Box sx={{ padding: '15px', display: 'grid' }}>
          <Box sx={{display: 'flex', gap: 2,overflow:'hidden',textOverflow: 'ellipsis' }}>
            <LinkIcon sx={{ color: '#FFFFFF' }} />
            <Typography variant='question'>프로젝트 링크</Typography>
          </Box>
          <Box sx={{ mt: '24px', ml: '38px', display: "flex", gap: 1 }}>
            <LanguageIcon sx={{color:'#FFFFFF'}}/>
            <Link style={{ textDecoration: 'none' }} href={projectLink}>
              <Typography sx={{overflow:'hidden',textOverflow: 'ellipsis',maxWidth:'200px',color: 'grey',mt:'2px' }} variant='answer'>
                {product.projectLink}
              </Typography>
            </Link>
            {session?.user.id === product?.user._id && (
              <Box onClick={() => handleEditClick('projectlink')}>
                <EditIcon fontSize='11px' sx={{ color: 'grey' }} />
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: '50px' }}>
            <PeopleOutlineIcon sx={{ color: '#FFFFFF' }} />
            <Typography variant='question'>소셜 프로필</Typography>
          </Box>
          <Box sx={{ mt: '24px', ml: '38px', display: 'grid', gap: 2 }}>
            <Box onClick={handleContact} sx={{ display: 'flex', gap: 1 }}>
              <EmailIcon sx={{color:'#FFFFFF'}}/>
              <Link style={{ textDecoration: 'none' }} href={`mailto:${product.contact}`}>
                <Typography sx={{ color: 'grey',mt:'2px' }} variant='answer'>{product.contact}</Typography>
              </Link>
              {session?.user.id === product?.user._id && (
                <Box onClick={() => handleEditClick('contact')}>
                  <EditIcon fontSize='11px' sx={{ color: 'grey' }} />
                </Box>
              )}
            </Box>
            {product.social1 ? (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <LanguageIcon sx={{color:'#FFFFFF'}}/>
                <Link style={{ textDecoration: 'none' }} href={socialLink1}>
                  <Typography sx={{overflow:'hidden',textOverflow: 'ellipsis',maxWidth:'200px', color: 'grey',mt:'2px'}} variant='answer'>{product.social1}</Typography>
                </Link>
                {session?.user.id === product?.user._id && (
                  <Box onClick={() => handleEditClick('social1')}>
                    <EditIcon fontSize='11px' sx={{ color: 'grey' }} />
                  </Box>
                )}
              </Box>
            ) : (
              session?.user.id === product?.user._id && (
                <Box onClick={() => handleEditClick('social1')}>
                  <AddIcon sx={{ color: '#FFFFFF' }} />
                </Box>
              )
            )}
            {product.social2 ? (
              <Box sx={{ overflow:'hidden',textOverflow: 'ellipsis',display: 'flex', gap: 1 }}>
                <LanguageIcon sx={{color:'#FFFFFF'}}/>
                <Link style={{ textDecoration: 'none' }} href={socialLink2}>
                  <Typography sx={{ overflow:'hidden',textOverflow: 'ellipsis',maxWidth:'200px',color: 'grey',mt:'2px' }} variant='answer'>{product.social2}</Typography>
                </Link>
                {session?.user.id === product?.user._id && (
                  <Box onClick={() => handleEditClick('social2')}>
                    <EditIcon fontSize='11px' sx={{ color: 'grey' }} />
                  </Box>
                )}
              </Box>
            ) : (
              session?.user.id === product?.user._id && (
                <Box onClick={() => handleEditClick('social2')}>
                  <AddIcon sx={{ color: '#FFFFFF' }} />
                </Box>
              )
            )}
            {product.social3 ? (
              <Box sx={{ overflow:'hidden',textOverflow: 'ellipsis',display: 'flex', gap: 1 }}>
                <LanguageIcon sx={{color:'#FFFFFF'}}/>
                <Link style={{ textDecoration: 'none' }} href={socialLink3}>
                  <Typography sx={{ overflow:'hidden',textOverflow: 'ellipsis',maxWidth:'200px',color: 'grey',mt:'2px' }} variant='answer'>{product.social3}</Typography>
                </Link>
                {session?.user.id === product?.user._id && (
                  <Box onClick={() => handleEditClick('social3')}>
                    <EditIcon fontSize='11px' sx={{ color: 'grey' }} />
                  </Box>
                )}
              </Box>
            ) : (
              session?.user.id === product?.user._id && (
                <Box onClick={() => handleEditClick('social3')}>
                  <AddIcon sx={{ color: '#FFFFFF' }} />
                </Box>
              )
            )}
          </Box>

          <Box sx={{mt:'30px'}}>
            <Link style={{textDecoration:'none'}} href={`mailto:${product.contact}`}
         
            >
              <Button onClick={handleContact} fullWidth sx={{ bgcolor:'#00FF66', color:'#0A0A0A' }}>
                <Typography>연락하기</Typography>
              </Button>
            </Link>
          </Box>

          {open && <EditProjectLink socialType={socialType} open={open} setOpen={setOpen} productId={product._id} />}
        </Box>
      ) : (
        <Box sx={{ padding: '20px', display: 'grid', gap: 2 }}>
          <Typography textAlign='center' variant='answer'>로그인 하고 자세한 판매자 정보를 확인해보세요!</Typography>
          <Button onClick={() => signIn("google")} sx={{ color: "#0A0A0A", bgcolor: '#00FF66' }}>
            <Typography fontWeight='600'>로그인</Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProductDetailLeft;
