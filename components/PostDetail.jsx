
'use client'

/* eslint-disable @next/next/no-img-element */


import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BASE_URL from '@/app/config';
import { Typography, Box } from '@mui/material';
import ReactMarkdown from 'react-markdown'

const PostDetail = (userId) => {
  const router = useParams();
  const postId = router.postid;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/post/${postId}`);
        const result = await response.json();
        setPost(result.post);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [postId]);




  if (!post) {
    return <Typography variant='answer' fontweight="600">Post not found</Typography>;
  }

  const formatResponse = (text) => {
    return <ReactMarkdown>{text}</ReactMarkdown>;
  };

  return (

    
    <Box sx={{ display: 'grid' }}>



        <Box className="productDetail" sx={{bgcolor:'#252525', display: { xs: 'grid', sm: 'grid', md: 'grid', lg: 'flex' }, border: '1px solid #222222', borderRadius: '20px', padding: { xs: '0px', sm: '25px', md: '25px', lg: '25px' } }}>

<Typography variant='answer'>{formatResponse(post.post)}</Typography>
          </Box>





        </Box>



  );
};

export default PostDetail;





